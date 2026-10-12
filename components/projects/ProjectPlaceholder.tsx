import type { LucideIcon } from "lucide-react";

function monogram(title: string) {
  const words = title
    .replace(/['’]/g, "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
  const letters =
    words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? "").slice(0, 2);
  return letters.toUpperCase();
}

interface ProjectPlaceholderProps {
  title: string;
  slug: string;
  icon: LucideIcon;
}

/** Stand-in artwork for projects without a screenshot. */
export function ProjectPlaceholder({
  title,
  slug,
  icon: Icon,
}: ProjectPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className="bg-grid-fine absolute inset-0 flex items-center justify-center bg-tint"
    >
      <span className="absolute inset-x-0 top-1/2 h-px bg-cobalt/15" />
      <span className="absolute inset-y-0 left-1/2 w-px bg-cobalt/15" />
      <span className="absolute left-3 top-3 flex size-7 items-center justify-center border border-cobalt/30 bg-paper text-cobalt">
        <Icon className="size-3.5" />
      </span>
      <span className="relative bg-tint px-3 font-display text-5xl font-bold tracking-[-0.04em] text-cobalt md:text-6xl">
        {monogram(title)}
      </span>
      <span className="absolute bottom-3 left-3 right-3 truncate font-mono text-[10px] uppercase tracking-[0.15em] text-cobalt">
        {slug}
      </span>
    </div>
  );
}
