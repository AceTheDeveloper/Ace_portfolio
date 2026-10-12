"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const pad = (value: number) => String(value).padStart(2, "0");

const buttonClass =
  "inline-flex size-11 items-center justify-center border border-line bg-paper text-ink hover:border-cobalt hover:text-cobalt disabled:border-line disabled:text-line";

/**
 * Featured projects as a native scroll-snap row, so swipe, trackpad and
 * touch all work without any gesture code. On top of that: prev/next buttons,
 * arrow keys, a tick ruler and a counter. Slides shrink and fade a little the
 * further they are from the centre (transform and opacity only, one pass per
 * frame). The fade stops at 0.9 because anything lower drops the small grey
 * text below WCAG AA contrast. There is no autoplay, and under reduced motion
 * it is a plain list.
 */
export function FeaturedCarousel({ slides }: { slides: ReactNode[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = [...track.children] as HTMLElement[];
    // Slide centres only change on resize, so they are measured there, not per frame.
    let centres: number[] = [];
    let slideWidth = 1;
    let frame = 0;

    const measure = () => {
      centres = items.map((item) => item.offsetLeft + item.offsetWidth / 2);
      slideWidth = items[0]?.offsetWidth || 1;
    };
    const update = () => {
      frame = 0;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      centres.forEach((position, index) => {
        const distance = Math.abs(position - centre);
        if (distance < Math.abs(centres[nearest] - centre)) nearest = index;
        if (reduceMotion.matches) return;
        const away = Math.min(1, distance / slideWidth);
        const card = items[index].firstElementChild as HTMLElement;
        card.style.transform = `scale(${(1 - 0.06 * away).toFixed(4)})`;
        card.style.opacity = (1 - 0.1 * away).toFixed(3);
      });
      setCurrent(nearest);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[
      Math.max(0, Math.min(count - 1, index))
    ] as HTMLElement | undefined;
    if (!track || !slide) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const target =
      event.key === "ArrowRight"
        ? current + 1
        : event.key === "ArrowLeft"
          ? current - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : null;
    if (target === null) return;
    event.preventDefault();
    goTo(target);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      className="@container"
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Featured projects, use the arrow keys to move between them"
        onKeyDown={onKeyDown}
        className="carousel-track flex snap-x snap-mandatory gap-5 overflow-x-auto py-2 md:gap-8"
      >
        {slides.map((slide, index) => (
          <li
            key={index}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            className="carousel-slide shrink-0 snap-center"
          >
            <div className="h-full">{slide}</div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            className={buttonClass}
            aria-label="Previous project"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={buttonClass}
            aria-label="Next project"
            disabled={current === count - 1}
            onClick={() => goTo(current + 1)}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Ruler: one tick per project, filled up to the current one. */}
        <div aria-hidden="true" className="relative h-4 flex-1">
          <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
          <span
            className="carousel-fill absolute inset-x-0 top-1/2 h-px origin-left bg-cobalt"
            style={{
              transform: `scaleX(${count > 1 ? current / (count - 1) : 1})`,
            }}
          />
          <span className="absolute inset-0 flex justify-between">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`h-full w-px ${index <= current ? "bg-cobalt" : "bg-line"}`}
              />
            ))}
          </span>
        </div>

        <p className="font-mono text-xs tabular-nums text-muted">
          <span className="sr-only">Project </span>
          <span className="text-ink">{pad(current + 1)}</span> / {pad(count)}
        </p>
      </div>
    </div>
  );
}
