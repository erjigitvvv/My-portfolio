import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ink" | "cyber" | "ai" | "glass" | "spatial" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

/**
 * Spatial Tactile Pill Button (Apple visionOS 3D Floating Pill)
 * Features dynamic optical rim highlights, subtle Z-elevation on hover, and haptic depression.
 */
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "clay-btn-primary font-bold tracking-tight shadow-[0_12px_28px_-4px_rgba(61,190,116,0.45)]",
    spatial: "spatial-ornament liquid-card-sheen font-bold text-[var(--ink)] hover:border-[var(--accent)] hover:shadow-[0_16px_32px_-6px_rgba(61,190,116,0.3)]",
    ink: "bg-[var(--ink)] text-[var(--bg)] font-bold hover:opacity-90 shadow-lg",
    cyber: "spatial-ornament liquid-card-sheen font-semibold text-[var(--ink)] hover:border-[var(--accent)]",
    ai: "spatial-ornament liquid-card-sheen font-semibold text-[var(--ink)] hover:border-[var(--accent)]",
    glass: "spatial-ornament liquid-card-sheen font-semibold text-[var(--ink)] hover:border-[var(--accent)]",
    danger: "bg-[#E5484D] text-white font-bold hover:opacity-90 shadow-md",
    ghost: "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--glass)] font-medium",
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
