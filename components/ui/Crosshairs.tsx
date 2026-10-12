const corners = [
  "-left-1 -top-1",
  "-right-1 -top-1",
  "-bottom-1 -left-1",
  "-bottom-1 -right-1",
];

/** Blueprint `+` registration marks on the four corners of a relatively positioned parent. */
export function Crosshairs({ className = "text-cobalt" }: { className?: string }) {
  return (
    <>
      {corners.map((position) => (
        <svg
          key={position}
          viewBox="0 0 9 9"
          aria-hidden="true"
          className={`crosshair pointer-events-none absolute z-10 size-[9px] ${position} ${className}`}
        >
          <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" />
        </svg>
      ))}
    </>
  );
}
