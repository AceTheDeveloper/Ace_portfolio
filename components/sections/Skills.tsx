import {
  AppWindow,
  Database,
  type LucideIcon,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Crosshairs } from "@/components/ui/Crosshairs";
import { Section } from "@/components/ui/Section";
import { type SkillGroupId, skillGroups } from "@/data/skills";

const groupIcons: Record<SkillGroupId, LucideIcon> = {
  frontend: AppWindow,
  backend: Server,
  mobile: Smartphone,
  data: Database,
  tooling: Wrench,
};

export function Skills({ index }: { index: string }) {
  return (
    <Section
      id="skills"
      index={index}
      label="Skills"
      title="Tools I work with."
      className="bg-wash"
    >
      <Reveal>
        <div className="relative border border-line bg-paper">
          <Crosshairs />
          {skillGroups.map((group, groupIndex) => {
            const Icon = groupIcons[group.id];
            return (
              <div
                key={group.id}
                className="grid gap-4 border-b border-line p-5 last:border-b-0 md:grid-cols-[15rem_1fr] md:gap-8 md:p-6"
              >
                <div className="flex items-center gap-3 md:items-start">
                  <span className="flex size-9 shrink-0 items-center justify-center border border-line text-cobalt">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                      {group.title}
                    </h3>
                    <p className="font-mono text-[11px] text-muted" aria-hidden="true">
                      {String(groupIndex + 1).padStart(2, "0")} /{" "}
                      {String(group.skills.length).padStart(2, "0")} items
                    </p>
                  </div>
                </div>
                <ul
                  className="flex flex-wrap content-start gap-2"
                  aria-label={`${group.title} skills`}
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-line px-3 py-1.5 font-mono text-xs text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
