import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2";

const variants = {
  primary:
    "bg-accent text-accent-foreground shadow-[var(--shadow-accent)] hover:brightness-110 active:brightness-95",
  outline:
    "border border-border-strong bg-transparent text-foreground hover:bg-card-hover hover:border-accent",
  ghost: "text-foreground hover:text-accent",
} as const;

type CtaProps = {
  to: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  onClick?: () => void;
};

export function Cta({ to, children, variant = "primary", className, onClick }: CtaProps) {
  return (
    <Link
      to={to as ComponentProps<typeof Link>["to"]}
      {...(onClick ? { onClick } : {})}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </Link>
  );
}

export const ctaClasses = (variant: keyof typeof variants = "primary") =>
  cn(base, variants[variant]);