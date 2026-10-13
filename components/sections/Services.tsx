import type { CSSProperties } from "react";
import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
  Smartphone,
  Sparkles,
  Store,
} from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { Crosshairs } from "@/components/ui/Crosshairs";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { visibleProjects } from "@/data/projects";
import { type ServiceId, services } from "@/data/services";

const icons: Record<ServiceId, LucideIcon> = {
  websites: AppWindow,
  pos: Store,
  mobile: Smartphone,
  ai: Sparkles,
};

const MAX_CHIPS = 4;
const visibleBySlug = new Map(
  visibleProjects.map((project) => [project.slug, project]),
);

/** Only projects that exist and are visible count; anything else is dropped. */
const resolve = (slugs: string[]) =>
  slugs.flatMap((slug) => visibleBySlug.get(slug) ?? []);

const label = "font-mono text-[11px] uppercase tracking-[0.15em] text-muted";

/**
 * What Ace offers, each backed by work already on this page. The stack chips
 * come from the real projects' data, and there are no prices or promises.
 */
export function Services({ index }: { index: string }) {
  return (
    <Section
      id="services"
      index={index}
      label="Services"
      title="What I can build for you."
    >
      <ul
        data-reveal="stagger"
        style={{ "--step": "80ms" } as CSSProperties}
        className="grid gap-6 md:grid-cols-2"
      >
        {services.map((service, position) => {
          const Icon = icons[service.id];
          const realWork = resolve(service.projectSlugs);
          const stack = [
            ...new Set(
              resolve(service.stackFrom ?? service.projectSlugs).flatMap(
                (project) => project.stack,
              ),
            ),
          ].slice(0, MAX_CHIPS);

          return (
            <li
              key={service.id}
              style={{ "--i": position } as CSSProperties}
              className="relative"
            >
              <Crosshairs />
              <article className="flex h-full flex-col border border-line bg-paper p-6 hover:border-cobalt md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-sm tracking-[0.15em] text-cobalt">
                    {service.number}
                  </p>
                  <span className="flex size-12 shrink-0 items-center justify-center border border-line text-cobalt">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {service.summary}
                </p>

                <div className="mt-auto pt-6">
                  {(realWork.length > 0 || service.features) && (
                    <div className="border-t border-line pt-5">
                      <p className={label}>Real work</p>
                      {realWork.length > 0 ? (
                        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                          {realWork.map((project) => (
                            <li key={project.slug}>
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} on GitHub`}
                                className="inline-flex items-center gap-1.5 text-ink underline decoration-line underline-offset-4 hover:text-cobalt hover:decoration-cobalt"
                              >
                                {project.title}
                                <ArrowUpRight
                                  className="size-4"
                                  aria-hidden="true"
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3">{service.features?.join(", ")}</p>
                      )}
                    </div>
                  )}

                  {stack.length > 0 && (
                    <ul
                      className="mt-5 flex flex-wrap gap-1.5"
                      aria-label={`${service.title} tech stack`}
                    >
                      {stack.map((item) => (
                        <li key={item} className="flex">
                          <Chip tech={item}>{item}</Chip>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex justify-center md:mt-14">
        <LinkButton href="#contact" size="lg">
          Start a project
          <ArrowRight className="size-5" aria-hidden="true" />
        </LinkButton>
      </div>
    </Section>
  );
}
