"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export interface NavItem {
  id: string;
  label: string;
}

/** Horizontal padding of a desktop nav link (`px-3`), so the marker hugs the text. */
const LINK_INSET = 12;

/** Highlights whichever section currently crosses the middle of the viewport. */
function useActiveSection(items: NavItem[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of items) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [items]);

  return active;
}

/** Scales the progress line with how far the page is scrolled. One write per frame. */
function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const line = ref.current;
    if (!line) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      line.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
}

/** Slides one underline to the active link using a transform only. */
function useSlidingMarker(
  navRef: RefObject<HTMLElement | null>,
  markerRef: RefObject<HTMLElement | null>,
  active: string | null,
) {
  const visible = useRef(false);

  useEffect(() => {
    const place = () => {
      const marker = markerRef.current;
      const link = navRef.current?.querySelector<HTMLElement>(
        '[aria-current="location"]',
      );
      if (!marker) return;
      if (!link) {
        marker.style.opacity = "0";
        visible.current = false;
        return;
      }
      const transform = `translateX(${link.offsetLeft + LINK_INSET}px) scaleX(${link.offsetWidth - LINK_INSET * 2})`;
      if (!visible.current) {
        // First appearance: jump into place instead of sliding in from the edge.
        marker.style.transition = "none";
        marker.style.transform = transform;
        void marker.offsetWidth;
        marker.style.transition = "";
      } else {
        marker.style.transform = transform;
      }
      marker.style.opacity = "1";
      visible.current = true;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [navRef, markerRef, active]);
}

export function Nav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(items);
  const progressRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  useScrollProgress(progressRef);
  useSlidingMarker(navRef, markerRef, active);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-[-0.04em]"
          aria-label={`${site.nickname} Simondac, back to top`}
        >
          {site.nickname}
          <span className="text-cobalt">.</span>
        </a>

        <nav ref={navRef} aria-label="Primary" className="relative hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`block px-3 py-2 text-sm hover:text-cobalt ${
                      isActive ? "text-cobalt" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <span
            ref={markerRef}
            aria-hidden="true"
            className="nav-marker pointer-events-none absolute bottom-0 left-0 h-0.5 w-px origin-left bg-cobalt opacity-0"
          />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LinkButton href={site.githubUrl} external size="sm">
            <GitHubIcon className="size-4" />
            GitHub
          </LinkButton>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center border border-line text-ink hover:border-cobalt hover:text-cobalt md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <span
        ref={progressRef}
        aria-hidden="true"
        className="nav-progress pointer-events-none absolute inset-x-0 -bottom-px block h-0.5 bg-cobalt"
      />

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="menu-enter absolute inset-x-0 top-full border-b border-line bg-paper md:hidden"
      >
        <ul className="mx-auto max-w-[1200px] px-5 py-2">
          {items.map((item, index) => (
            <li key={item.id} className="border-b border-line last:border-b-0">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={`flex items-baseline gap-4 py-4 font-display text-2xl font-bold tracking-[-0.02em] ${
                  active === item.id ? "text-cobalt" : "text-ink"
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="font-mono text-xs font-normal tracking-normal text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
