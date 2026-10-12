"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

const SpotlightCard = dynamic(
  () => import("@/components/reactbits/SpotlightCard"),
  { ssr: false },
);

const style = {
  "--spotlight-card-surface": "transparent",
  "--spotlight-card-border": "transparent",
  "--spotlight-card-shadow": "none",
} as CSSProperties;

/**
 * Soft blue spotlight that follows the cursor across a project card. It sits
 * behind the card content as an overlay and is only loaded for mouse users,
 * so touch devices never download or run it.
 */
export function CardSpotlight() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");

  if (!enabled) return null;

  return (
    <SpotlightCard
      aria-hidden="true"
      theme="light"
      spotlightColor="#1f4fff"
      intensity={0.5}
      spotlightSize={280}
      borderGlow={0}
      proximity={1}
      flare={false}
      style={style}
      className="pointer-events-none absolute! inset-0 rounded-none! p-0!"
    />
  );
}
