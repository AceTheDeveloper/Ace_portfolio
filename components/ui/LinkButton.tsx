import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 border";

const variants = {
  primary: "border-cobalt bg-cobalt text-paper hover:border-ink hover:bg-ink",
  outline: "border-ink bg-paper text-ink hover:border-cobalt hover:text-cobalt",
  inverse: "border-paper bg-paper text-cobalt hover:bg-tint",
  "inverse-outline":
    "border-paper text-paper hover:bg-paper hover:text-cobalt",
} as const;

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-7 text-lg",
} as const;

interface LinkButtonProps extends ComponentProps<"a"> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}
