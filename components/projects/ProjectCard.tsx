import Image from "next/image";
import {
  AppWindow,
  ArrowUpRight,
  Box,
  Gamepad2,
  Layers,
  type LucideIcon,
  Smartphone,
  Star,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Chip } from "@/components/ui/Chip";
import { Crosshairs } from "@/components/ui/Crosshairs";
import type { Project, ProjectCategory } from "@/data/projects";
import { CardSpotlight } from "./CardSpotlight";
import { ProjectPlaceholder } from "./ProjectPlaceholder";

const categoryIcons: Record<ProjectCategory, LucideIcon> = {
  "Full-stack": Layers,
  Frontend: AppWindow,
  Mobile: Smartphone,
  Game: Gamepad2,
  Other: Box,
};

const MAX_CHIPS = 4;

const linkClass =
  "inline-flex items-center gap-1.5 font-mono text-xs text-ink transition-colors hover:text-cobalt";

export function ProjectCard({ project }: { project: Project }) {
  const Icon = categoryIcons[project.category];
  const chips = project.stack.slice(0, MAX_CHIPS);
  const extraChips = project.stack.length - chips.length;

  return (
    <article className="group relative h-full transition-transform duration-200 hover:-translate-y-0.5 focus-within:-translate-y-0.5">
      <Crosshairs />
      <div className="relative isolate flex h-full flex-col border border-line bg-paper transition-colors duration-200 group-focus-within:border-cobalt group-hover:border-cobalt">
        <CardSpotlight />
        <div className="relative z-10 aspect-[16/10] shrink-0 overflow-hidden border-b border-line">
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

        <div className="relative z-10 flex flex-1 flex-col p-5">
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
                <Chip>{item}</Chip>
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
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
