import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface SectionProps {
  id: string;
  /** Two-digit section number, e.g. "02". */
  index: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/** A numbered page section: `02 / PROJECTS`, a heading, then the content. */
export function Section({
  id,
  index,
  label,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt">
            {index} / {label}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-balance md:text-5xl"
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
