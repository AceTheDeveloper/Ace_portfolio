import type { CSSProperties } from "react";
import { GitCommitHorizontal } from "lucide-react";
import { Crosshairs } from "@/components/ui/Crosshairs";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import type { Activity as ActivityData, ContributionDay } from "@/lib/github";

const step = (index: number) => ({ "--i": index }) as CSSProperties;

const CELL = 10;
const GAP = 3;
const PITCH = CELL + GAP;
/** One cobalt, five strengths. Level 0 uses the hairline colour instead. */
const levelOpacity = [0, 0.25, 0.5, 0.75, 1];

function Heatmap({ weeks, total }: { weeks: ContributionDay[][]; total: number }) {
  const width = weeks.length * PITCH - GAP;
  const height = 7 * PITCH - GAP;

  return (
    <div className="border-t border-line p-5 md:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
        {total.toLocaleString("en")} contributions in the last year
      </p>
      {/* Columns fade in left to right, 8ms apart. */}
      <svg
        data-reveal="heatmap"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Contribution calendar: ${total} contributions in the last year`}
        className="mt-4 block w-full"
      >
        {weeks.map((week, column) => (
          <g key={week[0]?.date ?? column} style={step(column)}>
            {week.map((day) => (
              <rect
                key={day.date}
                x={column * PITCH}
                y={new Date(day.date).getUTCDay() * PITCH}
                width={CELL}
                height={CELL}
                fill={day.level === 0 ? "var(--color-line)" : "var(--color-cobalt)"}
                fillOpacity={day.level === 0 ? 1 : levelOpacity[day.level]}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

interface ActivityProps {
  index: string;
  /** Null when GitHub could not be reached; the section then renders nothing. */
  activity: ActivityData | null;
}

/** Proof of work, straight from the GitHub API. Nothing here is typed in by hand. */
export function Activity({ index, activity }: ActivityProps) {
  if (!activity) return null;

  // A stat with nothing to show (an empty list or a zero) is left out.
  const stats = [
    { label: "Public repos listed here", value: String(activity.repoCount) },
    { label: "Languages", value: activity.languages.join(", ") },
  ].filter((stat) => stat.value && stat.value !== "0");

  return (
    <Section
      id="activity"
      index={index}
      label="Activity"
      title="Recent work, straight from GitHub."
    >
      <div className="relative border border-line bg-paper">
        <Crosshairs />
        <div className="grid lg:grid-cols-[1.6fr_1fr]">
          <div className="p-5 md:p-6">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              <GitCommitHorizontal className="size-4 text-cobalt" aria-hidden="true" />
              Latest commits
            </p>
            {/* Log lines appear one at a time, each over 400ms at most. */}
            <ol
              data-reveal="stagger"
              style={{ "--step": "90ms", "--dur": "400ms" } as CSSProperties}
              className="mt-4 font-mono text-xs"
            >
              {activity.commits.map((commit, position) => (
                <li
                  key={commit.url}
                  style={step(position)}
                  className="border-t border-line first:border-t-0"
                >
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-3 sm:grid-cols-[9rem_1fr_auto]"
                  >
                    <span className="truncate text-cobalt">{commit.repo}</span>
                    <span className="order-last col-span-2 truncate text-ink group-hover:text-cobalt sm:order-none sm:col-span-1">
                      {commit.message}
                    </span>
                    <time dateTime={commit.date} className="text-muted">
                      {commit.when}
                    </time>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-t border-line p-5 md:p-6 lg:border-l lg:border-t-0">
            <dl>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-b border-line py-4 first:pt-0"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 leading-snug">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-xs text-cobalt underline underline-offset-4"
            >
              github.com/{site.githubUser}
            </a>
          </div>
        </div>

        {activity.contributions && (
          <Heatmap
            weeks={activity.contributions.weeks}
            total={activity.contributions.total}
          />
        )}
      </div>
    </Section>
  );
}
