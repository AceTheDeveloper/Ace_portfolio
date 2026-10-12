"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { marqueeStack } from "@/data/site";
import { useMediaQuery } from "@/lib/use-media-query";

const COPIES = 4;
const half = Math.ceil(marqueeStack.length / 2);
const rows = [marqueeStack.slice(0, half), marqueeStack.slice(half)];

const scrollerClass =
  "font-display text-3xl font-bold leading-[1.25] tracking-[-0.03em] text-ink md:text-5xl md:leading-[1.25]";

function Row({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span key={item} className="inline-flex items-center">
          {item}
          <span className="mx-6 font-mono text-[0.6em] font-normal text-cobalt md:mx-10">
            +
          </span>
        </span>
      ))}
    </>
  );
}

/** Same markup ScrollVelocity produces, minus the motion, so swapping them causes no shift. */
function StaticRows() {
  return (
    <section>
      {rows.map((items, rowIndex) => (
        <div key={rowIndex} className="relative overflow-hidden">
          <div className={`${scrollerClass} flex whitespace-nowrap`}>
            {Array.from({ length: COPIES }, (_, copy) => (
              <span key={copy} className="flex-shrink-0">
                <Row items={items} />
                &nbsp;
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

const ScrollVelocity = dynamic(
  () => import("@/components/reactbits/ScrollVelocity"),
  { ssr: false, loading: StaticRows },
);

/**
 * Decorative tech strip; the same names are listed accessibly in Skills.
 * The animated version (and its animation library) loads only once the strip
 * is near the viewport, and never under prefers-reduced-motion.
 */
export function StackMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const motionAllowed = useMediaQuery(
    "(prefers-reduced-motion: no-preference)",
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="overflow-hidden border-y border-line bg-wash py-6 md:py-8"
    >
      {near && motionAllowed ? (
        <ScrollVelocity
          texts={rows.map((items, index) => (
            <Row key={index} items={items} />
          ))}
          velocity={36}
          numCopies={COPIES}
          scrollerClassName={scrollerClass}
        />
      ) : (
        <StaticRows />
      )}
    </div>
  );
}
