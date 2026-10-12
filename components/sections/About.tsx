import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { TitleBlock } from "./TitleBlock";

export function About({ index }: { index: string }) {
  const words = site.bio.split(" ");

  return (
    <Section
      id="about"
      index={index}
      label="About"
      title="Building across the stack."
    >
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        {/*
          Each word is its own inline box so the paragraph can reveal line by
          line; RevealObserver works out which line a word is on.
        */}
        <p
          data-reveal="lines"
          className="text-xl leading-relaxed md:text-2xl md:leading-relaxed"
        >
          {words.map((word, position) => (
            <span key={position}>
              <span data-word="">{word}</span>
              {position < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <TitleBlock />
      </div>
    </Section>
  );
}
