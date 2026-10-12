"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// Loaded as its own chunk so the animation library never blocks first paint.
const AnimatedContent = dynamic(
  () => import("@/components/reactbits/AnimatedContent"),
);

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the element scrolls into view. */
  delay?: number;
}

/**
 * Scroll reveal. The `reveal` class is what globals.css targets to show the
 * content immediately under prefers-reduced-motion or without JavaScript.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <AnimatedContent
      distance={24}
      duration={0.6}
      delay={delay}
      threshold={0.1}
      className={`reveal ${className}`}
    >
      {children}
    </AnimatedContent>
  );
}
