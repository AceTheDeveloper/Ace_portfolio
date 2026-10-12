import type { ReactNode } from "react";
import { TechIcon } from "./TechIcon";

interface ChipProps {
  children: ReactNode;
  /** Tech name; when given, its logo is shown before the label. */
  tech?: string;
}

export function Chip({ children, tech }: ChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-line bg-paper px-2 py-1 font-mono text-[11px] leading-none text-muted">
      {tech && <TechIcon name={tech} className="size-3 text-ink" />}
      {children}
    </span>
  );
}
