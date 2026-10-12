import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { LinkButton } from "@/components/ui/LinkButton";
import { HeroFigure } from "./HeroFigure";
import { site } from "@/data/site";

/** Position in the load sequence; globals.css spaces the steps 80ms apart. */
const step = (index: number) => ({ "--i": index }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-line"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0" />

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1200px] flex-col justify-center px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-y-0 right-8 hidden items-center xl:flex">
          <HeroFigure className="w-[340px]" />
        </div>

        <p
          className="load-rise inline-flex items-center gap-2.5 self-start border border-line bg-paper px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink"
          style={step(0)}
        >
          <span aria-hidden="true" className="status-dot text-cobalt" />
          {site.status}
        </p>

        <p
          className="load-rise mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-cobalt sm:text-sm"
          style={step(1)}
        >
          <span>{site.role}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{site.focus}</span>
          {/* Only shown once LOCATION is set in data/site.ts. */}
          {site.location && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{site.location}</span>
            </>
          )}
        </p>

        {/*
          Two fixed lines, each rising from behind its own mask. The text is in
          the server HTML and moves by transform only, so it is never held back
          waiting for JavaScript.
        */}
        <h1 className="mt-6 font-display text-[clamp(3rem,11.5vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          <span className="mask load-mask" style={step(2)}>
            <span>
              {site.firstName}{" "}
              <span className="ace-underline load-underline text-cobalt">
                &ldquo;{site.nickname}&rdquo;
              </span>
            </span>
          </span>{" "}
          <span className="mask load-mask" style={step(3)}>
            <span>{site.lastName}</span>
          </span>
        </h1>

        <p
          className="load-rise mt-8 max-w-2xl text-lg leading-relaxed text-muted text-pretty md:text-xl"
          style={step(4)}
        >
          {site.tagline}
        </p>

        <div className="load-rise mt-10 flex flex-wrap gap-3" style={step(5)}>
          <LinkButton href="#projects">
            View projects
            <ArrowDown className="size-4" aria-hidden="true" />
          </LinkButton>
          <LinkButton href={site.githubUrl} variant="outline" external>
            <GitHubIcon className="size-4" />
            GitHub
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
