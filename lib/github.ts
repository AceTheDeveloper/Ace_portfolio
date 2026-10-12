import { cacheLife } from "next/cache";
import { visibleProjects } from "@/data/projects";
import { site } from "@/data/site";

const API = "https://api.github.com";
/** Commits shown in the log. */
const COMMIT_COUNT = 6;
/** How many of the most recently pushed repos are asked for commits. */
const REPO_COUNT = 6;

export interface ActivityCommit {
  repo: string;
  /** First line of the commit message. */
  message: string;
  url: string;
  /** ISO timestamp. */
  date: string;
  /** e.g. "3 days ago", relative to when the data was fetched. */
  when: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Activity {
  commits: ActivityCommit[];
  repoCount: number;
  /** Primary languages, most used first. */
  languages: string[];
  /** Only present when GITHUB_TOKEN is set. */
  contributions: { total: number; weeks: ContributionDay[][] } | null;
}

interface RepoResponse {
  name: string;
  full_name: string;
  private: boolean;
  language: string | null;
  pushed_at: string;
}

interface CommitResponse {
  html_url: string;
  commit: { message: string; author: { date: string } | null };
  parents: unknown[];
}

/**
 * The only repos this site may mention: the visible entries of
 * data/projects.ts. Hidden and excluded repos never reach the page.
 */
const allowedRepos = new Set(
  visibleProjects.map((project) =>
    new URL(project.repoUrl).pathname.slice(1).toLowerCase(),
  ),
);

/** The token, when present, is only ever read here on the server. */
function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "ace-portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, { headers: headers() });
  if (!response.ok) {
    throw new Error(`GitHub answered ${response.status} for ${path}`);
  }
  return response.json() as Promise<T>;
}

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

function timeAgo(iso: string, now: number): string {
  const seconds = (new Date(iso).getTime() - now) / 1000;
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) {
      return relative.format(Math.round(seconds / size), unit);
    }
  }
  return "just now";
}

async function getRepos(): Promise<RepoResponse[]> {
  const owners = new Set([...allowedRepos].map((name) => name.split("/")[0]));
  const lists = await Promise.all(
    [...owners].map((owner) =>
      owner === site.githubUser.toLowerCase()
        ? get<RepoResponse[]>(`/users/${owner}/repos?per_page=100&type=owner`)
        : get<RepoResponse[]>(`/orgs/${owner}/repos?per_page=100&type=public`),
    ),
  );
  return lists
    .flat()
    .filter(
      (repo) => !repo.private && allowedRepos.has(repo.full_name.toLowerCase()),
    )
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
}

async function getCommits(
  repos: RepoResponse[],
  now: number,
): Promise<ActivityCommit[]> {
  const perRepo = await Promise.allSettled(
    repos.slice(0, REPO_COUNT).map(async (repo) => {
      const commits = await get<CommitResponse[]>(
        `/repos/${repo.full_name}/commits?author=${site.githubUser}&per_page=${COMMIT_COUNT}`,
      );
      return commits
        .filter((commit) => commit.parents.length < 2 && commit.commit.author)
        .map((commit) => {
          const date = commit.commit.author!.date;
          return {
            repo: repo.name,
            message: commit.commit.message.split("\n")[0],
            url: commit.html_url,
            date,
            when: timeAgo(date, now),
          };
        });
    }),
  );
  return perRepo
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, COMMIT_COUNT);
}

const levels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

interface ContributionsResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: keyof typeof levels;
            }[];
          }[];
        };
      };
    };
  };
}

/** The contribution calendar needs GraphQL, which needs a token. No token, no heatmap. */
async function getContributions(): Promise<Activity["contributions"]> {
  if (!process.env.GITHUB_TOKEN) return null;
  try {
    const response = await fetch(`${API}/graphql`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        query: `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }`,
        variables: { login: site.githubUser },
      }),
    });
    if (!response.ok) return null;
    const body = (await response.json()) as ContributionsResponse;
    const calendar =
      body.data?.user?.contributionsCollection.contributionCalendar;
    if (!calendar) return null;
    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: levels[day.contributionLevel] ?? 0,
        })),
      ),
    };
  } catch {
    return null;
  }
}

/**
 * Everything the Activity section shows, fetched on the server and cached for
 * an hour (the Cache Components equivalent of `revalidate: 3600`). Returns
 * null when GitHub is unreachable or rate-limits, so the section hides and the
 * build never fails.
 */
export async function getActivity(): Promise<Activity | null> {
  "use cache";
  cacheLife("hours");

  try {
    const now = Date.now();
    const repos = await getRepos();
    const [commits, contributions] = await Promise.all([
      getCommits(repos, now),
      getContributions(),
    ]);
    if (commits.length === 0) return null;

    const languageCounts = new Map<string, number>();
    for (const repo of repos) {
      if (repo.language) {
        languageCounts.set(
          repo.language,
          (languageCounts.get(repo.language) ?? 0) + 1,
        );
      }
    }

    return {
      commits,
      repoCount: repos.length,
      languages: [...languageCounts]
        .sort((a, b) => b[1] - a[1])
        .map(([language]) => language),
      contributions,
    };
  } catch {
    return null;
  }
}
