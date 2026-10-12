"use client";

import { type ReactNode, useEffect, useRef } from "react";

/** How far the content may drift toward the cursor, in pixels. */
const MAX_PULL = 6;
/** Critically damped spring: it settles without overshooting or bouncing. */
const STIFFNESS = 260;
const DAMPING = 2 * Math.sqrt(STIFFNESS);

const clamp = (value: number) => Math.min(MAX_PULL, Math.max(-MAX_PULL, value));

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

/**
 * Lets its content lean a few pixels toward the cursor while hovered and
 * spring back on leave. Only on devices with a real hover and a fine pointer,
 * and never under reduced motion; everywhere else it is just a wrapper.
 */
export function Magnetic({ children, className = "" }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const position = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      for (const axis of ["x", "y"] as const) {
        const force =
          STIFFNESS * (target[axis] - position[axis]) - DAMPING * velocity[axis];
        velocity[axis] += force * dt;
        position[axis] += velocity[axis] * dt;
      }
      const settled =
        Math.abs(target.x - position.x) < 0.05 &&
        Math.abs(target.y - position.y) < 0.05 &&
        Math.abs(velocity.x) < 0.05 &&
        Math.abs(velocity.y) < 0.05;
      if (settled) {
        position.x = target.x;
        position.y = target.y;
      }
      element.style.transform = `translate(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px)`;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      // The rect includes the current offset, so take it back out.
      const centreX = rect.left - position.x + rect.width / 2;
      const centreY = rect.top - position.y + rect.height / 2;
      target.x = clamp((event.clientX - centreX) * 0.2);
      target.y = clamp((event.clientY - centreY) * 0.35);
      start();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {children}
    </span>
  );
}
