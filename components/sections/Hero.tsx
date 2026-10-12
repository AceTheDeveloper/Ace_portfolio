import { ArrowDown } from "lucide-react";
import { HeroDots } from "@/components/motion/HeroDots";
import { HeroName } from "@/components/motion/HeroName";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { LinkButton } from "@/components/ui/LinkButton";
import { HeroFigure } from "./HeroFigure";
import { site } from "@/data/site";

export function Hero() {
  const name = `${site.firstName} “${site.nickname}” ${site.lastName}`;

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-line"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <HeroDots />

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1200px] flex-col justify-center px-5 py-20 md:px-8 md:py-28">
        <HeroFigure className="absolute right-8 top-1/2 hidden w-[340px] -translate-y-1/2 xl:block" />

        <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-cobalt sm:text-sm">
          <span>{site.role}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{site.focus}</span>
        </p>

        <div className="mt-6">
          <HeroName
            text={name}
            className="pb-[0.08em] pt-[0.04em] font-display text-[clamp(3rem,11.5vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.05em]"
          >
            {site.firstName}{" "}
            <span className="text-cobalt">
              &ldquo;{site.nickname}&rdquo;
            </span>{" "}
            {site.lastName}
          </HeroName>
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted text-pretty md:text-xl">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
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
