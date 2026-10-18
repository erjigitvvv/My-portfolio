import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ink" | "cyber" | "ai" | "glass" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

/**
 * Pill Button component following DESIGN_SPEC.md Section 1.2 & 1.4:
 * - Pill radius: 999px
 * - Primary button uses --accent fill with --accent-ink (#0B0B0B) text.
 */
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-ink)] font-semibold hover:brightness-105 hover:scale-[1.02] shadow-sm",
    ink: "bg-[var(--ink)] text-[var(--bg)] font-semibold hover:opacity-90",
    cyber:
      "glass-surface text-[var(--ink)] hover:border-[var(--accent)] font-medium",
    ai: "glass-surface text-[var(--ink)] hover:border-[var(--accent)] font-medium",
    glass:
      "glass-surface text-[var(--ink)] hover:border-[var(--ink)]/40 font-medium",
    danger: "bg-[#E5484D] text-white font-semibold hover:opacity-90",
    ghost:
      "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--glass)]",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-sm sm:text-base gap-2.5",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-pill font-mono transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
