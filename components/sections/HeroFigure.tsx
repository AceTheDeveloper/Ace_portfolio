import type { CSSProperties } from "react";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Decorative blueprint drawing of the "A" mark beside the name on wide screens.
 * On load it draws itself: every stroked path has pathLength="1", so one
 * stroke-dashoffset keyframe (in globals.css) works for all of them. The frame
 * comes first, then the construction lines, the letter, and finally the
 * registration marks and dimension lines. All of it ends by 1.4s.
 */
export function HeroFigure({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 340"
      fill="none"
      aria-hidden="true"
      className={`text-cobalt ${className}`}
    >
      <g stroke="currentColor" strokeOpacity="0.35">
        <path
          className="fig-draw"
          pathLength={1}
          d="M40.5 40.5h240v240h-240z"
        />
        <path
          className="fig-draw"
          style={delay(150)}
          pathLength={1}
          d="M280.5 160.5a120 120 0 1 1-240 0a120 120 0 1 1 240 0"
        />
        {/* Dashed construction lines fade in; a dash pattern cannot also be drawn. */}
        <g className="fig-fade" style={delay(350)}>
          <path d="M40.5 160.5h240M160.5 40.5v240" strokeDasharray="4 6" />
          <path d="M40.5 280.5l120-240 120 240" strokeDasharray="2 5" />
        </g>
      </g>

      <path
        className="fig-draw"
        style={delay(450)}
        pathLength={1}
        d="M95 250 160.5 72 226 250"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinejoin="miter"
      />
      <path
        className="fig-draw"
        style={delay(700)}
        pathLength={1}
        d="M118 190h85"
        stroke="currentColor"
        strokeWidth="14"
      />

      <g className="fig-fade" style={delay(1000)}>
        {/* Dimension lines */}
        <g stroke="currentColor" strokeOpacity="0.6">
          <path d="M40.5 306.5h240M40.5 300v13M280.5 300v13" />
          <path d="M306.5 40.5v240M300 40.5h13M300 280.5h13" />
        </g>
        {/* Registration marks on the frame corners */}
        <path
          stroke="currentColor"
          d="M34 40.5h13M40.5 34v13M274 40.5h13M280.5 34v13M34 280.5h13M40.5 274v13M274 280.5h13M280.5 274v13"
        />
        <g
          fill="currentColor"
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="10"
          letterSpacing="2"
        >
          <text x="40" y="24">FIG. A</text>
          <text x="160" y="330" textAnchor="middle">
            ACE / MARK
          </text>
        </g>
      </g>
    </svg>
  );
}
