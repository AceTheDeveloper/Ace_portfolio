"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    /** Set once reveals are wired up; the inline script in layout.tsx checks it. */
    __reveal?: boolean;
  }
}

/** For `data-reveal="lines"`: give every word the index of the line it sits on. */
function numberLines(element: HTMLElement) {
  let line = -1;
  let lastTop = Number.NaN;
  for (const word of element.querySelectorAll<HTMLElement>("[data-word]")) {
    if (word.offsetTop !== lastTop) {
      line += 1;
      lastTop = word.offsetTop;
    }
    word.style.setProperty("--i", String(line));
  }
}

/**
 * The one scroll-reveal mechanism for the whole page. Any element with a
 * `data-reveal` attribute gets `data-revealed` the first time it enters the
 * viewport; globals.css does the rest. Rendered once, renders nothing.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          if (element.dataset.reveal === "lines") numberLines(element);
          element.dataset.revealed = "";
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    const watch = (root: ParentNode) => {
      for (const element of root.querySelectorAll("[data-reveal]")) {
        if (!(element as HTMLElement).hasAttribute("data-revealed")) {
          observer.observe(element);
        }
      }
    };
    watch(document);

    // Cards added later ("Show more", filters) bring new reveal targets.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof HTMLElement) watch(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    window.__reveal = true;

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
