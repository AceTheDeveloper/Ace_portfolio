"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/lib/use-media-query";

const DotGrid = dynamic(() => import("@/components/reactbits/DotGrid"), {
  ssr: false,
});

/**
 * Cursor-reactive dots behind the hero. Only loaded for mouse users who have
 * not asked for reduced motion, so touch devices never download it.
 */
export function HeroDots() {
  const enabled = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <DotGrid
        dotSize={3}
        gap={21}
        baseColor="#1f4fff"
        activeColor="#1f4fff"
        opacity={0.22}
        proximity={130}
        glow={0}
        fade={0.35}
        clickShock={false}
      />
    </div>
  );
}
