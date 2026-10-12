import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Chip } from "@/components/ui/Chip";
import { Crosshairs } from "@/components/ui/Crosshairs";
import type { Project } from "@/data/projects";
import { categoryIcons } from "./category-icons";
import { ProjectPlaceholder } from "./ProjectPlaceholder";

interface FeaturedCardProps {
  project: Project;
  /** 1-based position in the featured row. */
  sheet: number;
  total: number;
}

const pad = (value: number) => String(value).padStart(2, "0");

const linkClass =
  "inline-flex items-center gap-1.5 font-mono text-xs text-ink hover:text-cobalt";

/**
 * A large "drawing sheet" card for the featured carousel: preview on one
 * side, details on the other, and a small title block along the bottom with
 * the sheet number and the date of the last push.
 */
export function FeaturedCard({ project, sheet, total }: FeaturedCardProps) {
  const Icon = categoryIcons[project.category];

  return (
    <article className="relative h-full">
      <Crosshairs />
      <div className="flex h-full flex-col border border-line bg-paper md:flex-row">
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-line md:aspect-auto md:w-[54%] md:border-b-0 md:border-r">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(min-width: 768px) 420px, 86vw"
              className="object-cover object-left-top"
            />
          ) : (
            <ProjectPlaceholder
              title={project.title}
              slug={project.slug}
              icon={Icon}
            />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-cobalt">
              <Icon className="size-3.5" aria-hidden="true" />
              {project.category}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em] md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
            {project.note && (
              <p className="mt-2 font-mono text-[11px] text-muted">
                {project.note}
              </p>
            )}

            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.stack.map((item) => (
                <li key={item} className="flex">
                  <Chip tech={item}>{item}</Chip>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label={`${project.title} source on GitHub`}
              >
                <GitHubIcon className="size-3.5" />
                GitHub
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  aria-label={`${project.title} live site`}
                >
                  Live
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Title block: the sheet number is this card's place in the row; the date is the last push. */}
          <p className="grid grid-cols-[auto_1fr] whitespace-nowrap border-t border-line font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            <span className="px-5 py-2.5 md:px-6">
              Sheet {pad(sheet)} / {pad(total)}
            </span>
            <span className="border-l border-line px-5 py-2.5 md:px-6">
              Updated{" "}
              <time dateTime={project.pushedAt}>
                {project.pushedAt.slice(0, 10)}
              </time>
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
