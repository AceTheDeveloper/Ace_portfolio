"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type ProjectCategory, projectCategories } from "@/data/projects";

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", ...projectCategories];
const INITIAL_COUNT = 9;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOVE_MS = 360;
const STAGGER_MS = 40;
/** Later cards share the last delay so a long list never drags on. */
const MAX_STAGGER_STEPS = 6;

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
  const listRef = useRef<HTMLUListElement>(null);
  /** Where each card was just before the list changed (the "First" of FLIP). */
  const previous = useRef<Map<string, DOMRect> | null>(null);

  const matching =
    filter === "All"
      ? items
      : items.filter((item) => item.category === filter);
  const shown = expanded ? matching : matching.slice(0, INITIAL_COUNT);
  const hiddenCount = matching.length - INITIAL_COUNT;
  const Chevron = expanded ? ChevronUp : ChevronDown;

  const rememberPositions = () => {
    const list = listRef.current;
    if (!list) return;
    previous.current = new Map(
      ([...list.children] as HTMLElement[]).map((card) => [
        card.dataset.slug ?? "",
        card.getBoundingClientRect(),
      ]),
    );
  };

  /*
   * FLIP: after React has moved the cards, start each one from where it used
   * to be and let it glide to its new place; cards that were not there before
   * fade up 8px, 40ms apart. Web Animations API, transform and opacity only.
   */
  useLayoutEffect(() => {
    const before = previous.current;
    previous.current = null;
    const list = listRef.current;
    if (!before || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = [...list.children] as HTMLElement[];
    const after = cards.map((card) => card.getBoundingClientRect());
    let entering = 0;
    cards.forEach((card, index) => {
      const from = before.get(card.dataset.slug ?? "");
      if (!from) {
        card.animate(
          [
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: MOVE_MS,
            delay: Math.min(entering, MAX_STAGGER_STEPS) * STAGGER_MS,
            easing: EASE,
            fill: "backwards",
          },
        );
        entering += 1;
        return;
      }
      const dx = from.left - after[index].left;
      const dy = from.top - after[index].top;
      if (dx === 0 && dy === 0) return;
      card.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
        { duration: MOVE_MS, easing: EASE },
      );
    });
  }, [filter, expanded]);

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
                rememberPositions();
                setFilter(name);
                setExpanded(false);
              }}
              className={`inline-flex h-10 items-center gap-2 border px-4 text-sm ${
                selected
                  ? "border-brand bg-brand text-on-brand"
                  : "border-line bg-paper text-ink hover:border-cobalt hover:text-cobalt"
              }`}
            >
              {name}
              <span
                className={`font-mono text-[11px] ${selected ? "text-on-brand" : "text-muted"}`}
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

      <ul
        ref={listRef}
        id="project-grid"
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {shown.map((item) => (
          <li
            key={item.slug}
            data-slug={item.slug}
            className={item.featured ? "sm:col-span-2" : undefined}
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
              rememberPositions();
              setExpanded((value) => !value);
            }}
            className="inline-flex h-12 items-center gap-2 border border-ink px-6 hover:border-cobalt hover:text-cobalt"
          >
            {expanded ? "Show fewer" : `Show ${hiddenCount} more`}
            <Chevron aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
    </>
  );
}
