import type { ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line bg-paper px-2 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </span>
  );
}
