import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { GitHubIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { Crosshairs } from "@/components/ui/Crosshairs";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/data/site";

export function Contact({ index }: { index: string }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="on-cobalt relative overflow-hidden bg-cobalt text-paper"
    >
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em]">
              {index} / Contact
            </p>
            <p className="inline-flex items-center gap-3 border border-paper/40 px-3 py-2 font-mono text-xs uppercase tracking-[0.15em]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-paper opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-paper" />
              </span>
              {site.status}
            </p>
          </div>

          <h2
            id="contact-title"
            className="mt-10 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-balance md:text-8xl"
          >
            Let&rsquo;s build something.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl">
            Have a project or a role in mind? Reach me on GitHub or Instagram.
          </p>

          <div className="relative mt-12 inline-flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Crosshairs className="text-paper" />
            <LinkButton
              href={site.githubUrl}
              external
              variant="inverse"
              size="lg"
            >
              <GitHubIcon className="size-5" />
              GitHub
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={site.instagramUrl}
              external
              variant="inverse-outline"
              size="lg"
            >
              <InstagramIcon className="size-5" />
              Instagram
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
