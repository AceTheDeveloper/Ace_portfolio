import type { CSSProperties } from "react";
import { Crosshairs } from "@/components/ui/Crosshairs";
import { titleBlock } from "@/data/site";

const step = (index: number) => ({ "--i": index }) as CSSProperties;

/**
 * The About facts, laid out like the title block in the corner of an
 * engineering drawing. Every rule is its own element so it can be drawn with a
 * scale transform on first view; the values then fade in row by row
 * (`data-reveal="titleblock"` in globals.css).
 *
 * The SHEET and SCALE cells are drawing furniture, not information, so they are
 * hidden from assistive technology.
 */
export function TitleBlock() {
  const last = titleBlock.length;

  return (
    <div data-reveal="titleblock" className="relative self-start">
      <Crosshairs />
      {/* Outer frame */}
      <span aria-hidden="true" className="tb-x top-0" />
      <span aria-hidden="true" className="tb-x bottom-0" style={step(last + 1)} />
      <span aria-hidden="true" className="tb-y left-0" />
      <span aria-hidden="true" className="tb-y right-0" style={step(2)} />

      <dl>
        {titleBlock.map((row, index) => (
          <div
            key={row.label}
            className="relative grid grid-cols-[6.5rem_1fr]"
            style={step(index)}
          >
            {index > 0 && <span aria-hidden="true" className="tb-x top-0" />}
            <span aria-hidden="true" className="tb-y left-[6.5rem]" />
            <dt className="tb-cell px-4 py-3.5 font-mono text-[11px] uppercase leading-5 tracking-[0.15em] text-muted">
              {row.label}
            </dt>
            <dd className="tb-cell px-4 py-3.5 leading-5">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div
        aria-hidden="true"
        className="relative grid grid-cols-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
        style={step(last)}
      >
        <span className="tb-x top-0" />
        <span className="tb-y left-1/2" />
        <p className="tb-cell px-4 py-3">Sheet 01 / 01</p>
        <p className="tb-cell px-4 py-3">Scale 1:1</p>
      </div>
    </div>
  );
}
