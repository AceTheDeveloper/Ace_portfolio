/** Decorative blueprint drawing of the "A" mark, shown beside the name on wide screens. */
export function HeroFigure({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 340"
      fill="none"
      aria-hidden="true"
      className={`text-cobalt ${className}`}
    >
      <g stroke="currentColor" strokeOpacity="0.35">
        <rect x="40.5" y="40.5" width="240" height="240" />
        <circle cx="160.5" cy="160.5" r="120" />
        <path d="M40.5 160.5h240M160.5 40.5v240" strokeDasharray="4 6" />
        <path d="M40.5 280.5l120-240 120 240" strokeDasharray="2 5" />
      </g>

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

      <path
        d="M95 250 160.5 72 226 250M118 190h85"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
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
    </svg>
  );
}
