"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Fallback for the "ACE IT" band in browsers without CSS scroll-driven
 * animations. Where `animation-timeline: view()` exists, CSS does everything
 * and this does nothing. Elsewhere it writes two progress variables onto the
 * band, at most once per frame and only while the band is on screen:
 * `--p` (words converging, done when the band is centred) and `--u` (underline).
 */
export function AceBandScroll() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const band = document.querySelector<HTMLElement>(".ace-band");
    if (!band) return;

    let frame = 0;
    let onScreen = false;
    const update = () => {
      frame = 0;
      const rect = band.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the band's top meets the viewport bottom, 1 when its bottom leaves the top.
      const cover = (viewport - rect.top) / (viewport + rect.height);
      band.style.setProperty("--p", clamp(cover / 0.5).toFixed(4));
      band.style.setProperty("--u", clamp((cover - 0.5) / 0.1).toFixed(4));
    };
    const schedule = () => {
      if (onScreen && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      schedule();
    });

    band.dataset.scroll = "";
    update();
    observer.observe(band);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
