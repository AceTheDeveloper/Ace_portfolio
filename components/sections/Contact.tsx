import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
} from "@/components/ui/BrandIcons";
import { Crosshairs } from "@/components/ui/Crosshairs";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/data/site";

const step = (index: number) => ({ "--i": index }) as CSSProperties;

const headline = ["Let’s", "build", "something."];

/** Every place to reach Ace. A link with no URL in data/site.ts is left out. */
const channels = [
  { name: "GitHub", url: site.githubUrl, Icon: GitHubIcon },
  { name: "Instagram", url: site.instagramUrl, Icon: InstagramIcon },
  { name: "Facebook", url: site.facebookUrl, Icon: FacebookIcon },
].filter((channel): channel is typeof channel & { url: string } =>
  Boolean(channel.url),
);

/** "GitHub", "GitHub or Instagram", "GitHub, Instagram or Facebook". */
function listNames(names: string[]) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
}

/**
 * The one full-bleed cobalt band. On first view it wipes in from the left
 * (clip-path), the headline words rise out of their masks, then the rest
 * follows (`data-reveal="wipe"` in globals.css).
 */
export function Contact({ index }: { index: string }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-reveal="wipe"
      className="on-cobalt relative overflow-hidden bg-cobalt text-paper"
    >
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 md:px-8 md:py-36">
        <div
          className="wipe-rise flex flex-wrap items-center justify-between gap-4"
          style={step(0)}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em]">
            {index} / Contact
          </p>
          <p className="inline-flex items-center gap-3 border border-paper/40 px-3 py-2 font-mono text-xs uppercase tracking-[0.15em]">
            <span aria-hidden="true" className="status-dot" />
            {site.status}
          </p>
        </div>

        <h2
          id="contact-title"
          className="mt-10 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-8xl"
        >
          {headline.map((word, position) => (
            <span key={word}>
              <span className="mask mask-inline wipe-mask" style={step(position)}>
                <span>{word}</span>
              </span>
              {position < headline.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
        <p
          className="wipe-rise mt-6 max-w-xl text-lg leading-relaxed md:text-xl"
          style={step(4)}
        >
          Have a project or a role in mind? Reach me on{" "}
          {listNames(channels.map((channel) => channel.name))}.
        </p>

        <div
          className="wipe-rise relative mt-12 inline-flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          style={step(5)}
        >
          <Crosshairs className="text-paper" />
          {channels.map(({ name, url, Icon }, position) => (
            <Magnetic key={name} className="w-full sm:w-auto">
              <LinkButton
                href={url}
                external
                variant={position === 0 ? "inverse" : "inverse-outline"}
                size="lg"
                className="w-full"
              >
                <Icon className="size-5" />
                {name}
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </LinkButton>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}
