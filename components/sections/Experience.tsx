import { Section } from "@/components/ui/Section";
import { experience } from "@/data/experience";

/** Renders nothing until data/experience.ts has entries. */
export function Experience({ index }: { index: string }) {
  if (experience.length === 0) return null;

  return (
    <Section
      id="experience"
      index={index}
      label="Experience"
      title="Where I've worked."
    >
      <ol className="relative ml-1.5 border-l border-line">
        {experience.map((entry) => (
          <li
            key={`${entry.organization}-${entry.title}-${entry.start}`}
            className="relative pb-12 pl-8 last:pb-0 md:pl-12"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-1.5 size-[9px] border border-cobalt bg-paper"
            />
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-cobalt">
                {entry.start} to {entry.end ?? "Present"}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
                {entry.title}
              </h3>
              <p className="mt-1 text-muted">
                {entry.organization}
                {entry.location ? `, ${entry.location}` : ""}
              </p>
              {entry.summary && (
                <p className="mt-4 max-w-2xl leading-relaxed">{entry.summary}</p>
              )}
              {entry.points && entry.points.length > 0 && (
                <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-muted marker:text-cobalt">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
