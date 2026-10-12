"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// Loaded as its own chunk so the animation library never blocks first paint.
const SplitText = dynamic(() => import("@/components/reactbits/SplitText"));

const from = { opacity: 0, y: 48 };
const to = { opacity: 1, y: 0 };

interface HeroNameProps {
  /** Plain-text version of `children`. */
  text: string;
  children: ReactNode;
  className?: string;
}

/** The page's h1, revealed character by character. */
export function HeroName({ text, children, className = "" }: HeroNameProps) {
  return (
    <SplitText
      tag="h1"
      text={text}
      textAlign="left"
      splitType="chars"
      delay={22}
      duration={0.8}
      ease="power3.out"
      from={from}
      to={to}
      threshold={0}
      rootMargin="0px"
      className={`hero-name ${className}`}
    >
      {children}
    </SplitText>
  );
}
