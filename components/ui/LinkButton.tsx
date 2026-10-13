import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 border";

const variants = {
  primary:
    "border-brand bg-brand text-on-brand hover:border-ink hover:bg-ink hover:text-paper",
  outline: "border-ink bg-paper text-ink hover:border-cobalt hover:text-cobalt",
  inverse: "border-on-brand bg-on-brand text-brand hover:bg-on-brand/90",
  "inverse-outline":
    "border-on-brand text-on-brand hover:bg-on-brand hover:text-brand",
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
