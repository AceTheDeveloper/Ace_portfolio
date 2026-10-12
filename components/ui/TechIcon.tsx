import {
  Boxes,
  ChartLine,
  Code,
  Database,
  type LucideIcon,
  Mail,
  Navigation,
  Server,
  ShieldCheck,
  Wind,
} from "lucide-react";
import { techLogo } from "@/data/tech-icons";

/** Techs with no logo in the sprite get a plain symbol instead. */
const generic: Record<string, LucideIcon> = {
  IndexedDB: Database,
  NativeWind: Wind,
  Nodemailer: Mail,
  "React Navigation": Navigation,
  Recharts: ChartLine,
  "Row Level Security": ShieldCheck,
  "Server Actions": Server,
  Zustand: Boxes,
};

interface TechIconProps {
  /** Tech name exactly as written in the data files. */
  name: string;
  className?: string;
}

/**
 * Logo for a tech-stack chip, drawn in the current text colour. Logos are
 * referenced from the public/tech-icons.svg sprite, so each one is downloaded
 * once and adds almost nothing to the page HTML.
 */
export function TechIcon({ name, className = "size-3.5" }: TechIconProps) {
  const slug = techLogo[name];

  if (slug) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={`shrink-0 ${className}`}
      >
        <use href={`/tech-icons.svg#${slug}`} />
      </svg>
    );
  }

  const Icon = generic[name] ?? Code;
  return <Icon aria-hidden="true" className={`shrink-0 ${className}`} />;
}
