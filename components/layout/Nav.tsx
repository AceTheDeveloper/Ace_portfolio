"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/data/site";

export interface NavItem {
  id: string;
  label: string;
}

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

export function Nav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(items);

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

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block px-3 py-2 text-sm transition-colors hover:text-cobalt ${
                      isActive ? "text-cobalt" : "text-muted"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-[13px] h-0.5 bg-cobalt transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LinkButton href={site.githubUrl} external size="sm">
            <GitHubIcon className="size-4" />
            GitHub
          </LinkButton>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-cobalt hover:text-cobalt md:hidden"
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

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-paper md:hidden"
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
