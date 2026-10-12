import { Reveal } from "@/components/motion/Reveal";
import { Crosshairs } from "@/components/ui/Crosshairs";
import { Section } from "@/components/ui/Section";
import { quickFacts, site } from "@/data/site";

export function About({ index }: { index: string }) {
  return (
    <Section
      id="about"
      index={index}
      label="About"
      title="Building across the stack."
    >
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <p className="text-xl leading-relaxed text-pretty md:text-2xl md:leading-relaxed">
            {site.bio}
          </p>

          <div className="relative self-start border border-line">
            <Crosshairs />
            <p className="border-b border-line bg-wash px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Quick facts
            </p>
            <dl>
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line px-5 py-4 last:border-b-0"
                >
                  <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                    {fact.label}
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
