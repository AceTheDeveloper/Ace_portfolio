"use client";

import { type CSSProperties, type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { type ProjectCategory, projectCategories } from "@/data/projects";

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", ...projectCategories];
const INITIAL_COUNT = 9;

export interface ProjectGridItem {
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  /** The card, already rendered on the server. */
  card: ReactNode;
}

/** Filter chips, the grid and "Show more". Cards arrive pre-rendered, so only this shell hydrates. */
export function ProjectsGrid({ items }: { items: ProjectGridItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);
  // Index of the first card that should play its entrance; null until the first interaction.
  const [animateFrom, setAnimateFrom] = useState<number | null>(null);

  const matching =
    filter === "All"
      ? items
      : items.filter((item) => item.category === filter);
  const shown = expanded ? matching : matching.slice(0, INITIAL_COUNT);
  const hiddenCount = matching.length - INITIAL_COUNT;

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((name) => {
          const count =
            name === "All"
              ? items.length
              : items.filter((item) => item.category === name).length;
          const selected = filter === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setFilter(name);
                setExpanded(false);
                setAnimateFrom(0);
              }}
              className={`inline-flex h-10 items-center gap-2 border px-4 text-sm transition-colors duration-200 ${
                selected
                  ? "border-cobalt bg-cobalt text-paper"
                  : "border-line bg-paper text-ink hover:border-cobalt hover:text-cobalt"
              }`}
            >
              {name}
              <span
                className={`font-mono text-[11px] ${selected ? "text-paper" : "text-muted"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status">
        Showing {shown.length} of {matching.length}{" "}
        {filter === "All" ? "" : `${filter} `}projects
      </p>

      {/* Keyed by filter so a new selection remounts the cards and replays the entrance. */}
      <ul
        key={filter}
        id="project-grid"
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {shown.map((item, index) => (
          <li
            key={item.slug}
            style={
              {
                "--card-delay": `${(index % INITIAL_COUNT) * 40}ms`,
              } as CSSProperties
            }
            className={`${animateFrom !== null && index >= animateFrom ? "card-enter" : ""} ${item.featured ? "sm:col-span-2" : ""}`}
          >
            {item.card}
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="project-grid"
            onClick={() => {
              setExpanded((value) => !value);
              setAnimateFrom(INITIAL_COUNT);
            }}
            className="inline-flex h-12 items-center gap-2 border border-ink px-6 transition-colors duration-200 hover:border-cobalt hover:text-cobalt"
          >
            {expanded ? "Show fewer" : `Show ${hiddenCount} more`}
            <ChevronDown
              aria-hidden="true"
              className={`size-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </>
  );
}
