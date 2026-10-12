import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Chip } from "@/components/ui/Chip";
import { Crosshairs } from "@/components/ui/Crosshairs";
import type { Project } from "@/data/projects";
import { categoryIcons } from "./category-icons";
import { ProjectPlaceholder } from "./ProjectPlaceholder";

const MAX_CHIPS = 4;

const linkClass =
  "inline-flex items-center gap-1.5 font-mono text-xs text-ink hover:text-cobalt";

/**
 * A project in the grid. On hover devices the card lifts 3px, its corner marks
 * extend and the Live arrow nudges (`.card` in globals.css); the border colour
 * change is instant.
 */
export function ProjectCard({ project }: { project: Project }) {
  const Icon = categoryIcons[project.category];
  const chips = project.stack.slice(0, MAX_CHIPS);
  const extraChips = project.stack.length - chips.length;

  return (
    <article className="card group relative h-full">
      <Crosshairs />
      <div className="flex h-full flex-col border border-line bg-paper group-focus-within:border-cobalt group-hover:border-cobalt">
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-line">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes={
                project.featured
                  ? "(min-width: 640px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover object-top"
            />
          ) : (
            <ProjectPlaceholder
              title={project.title}
              slug={project.slug}
              icon={Icon}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-cobalt">
              <Icon className="size-3.5" aria-hidden="true" />
              {project.category}
            </span>
            {project.stars > 0 && (
              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted">
                <Star className="size-3.5" aria-hidden="true" />
                {project.stars}
                <span className="sr-only">
                  {project.stars === 1 ? "star" : "stars"} on GitHub
                </span>
              </span>
            )}
          </div>

          <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.02em]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>
          {project.note && (
            <p className="mt-2 font-mono text-[11px] text-muted">
              {project.note}
            </p>
          )}

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {chips.map((item) => (
              <li key={item} className="flex">
                <Chip tech={item}>{item}</Chip>
              </li>
            ))}
            {extraChips > 0 && (
              <li className="flex">
                <Chip>
                  +{extraChips}
                  <span className="sr-only"> more</span>
                </Chip>
              </li>
            )}
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
                <ArrowUpRight className="nudge size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
