import type { CSSProperties, ReactNode } from "react";

interface SectionProps {
  id: string;
  /** Two-digit section number, e.g. "02". */
  index: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * A numbered page section: `02 / PROJECTS`, a hairline, a heading, then the
 * content. On first view the label types in and the hairline draws
 * (`data-reveal="header"` in globals.css).
 */
export function Section({
  id,
  index,
  label,
  title,
  children,
  className = "",
}: SectionProps) {
  const text = `${index} / ${label}`;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div data-reveal="header">
          <div className="flex items-center gap-4">
            <p
              className="section-label shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-cobalt"
              style={{ "--chars": text.length } as CSSProperties}
            >
              {text}
            </p>
            <span
              aria-hidden="true"
              className="section-rule h-px flex-1 origin-left bg-line"
            />
          </div>
          <h2
            id={`${id}-title`}
            className="section-title mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-balance md:text-5xl"
          >
            {title}
          </h2>
        </div>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
