import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "accent"
    | "ai"
    | "cyber"
    | "devops"
    | "live"
    | "amber"
    | "peach"
    | "bracket";
  pulse?: boolean;
}

/**
 * Pill / Badge component following DESIGN_SPEC.md Section 1.2 & 1.4:
 * - Pill radius: 999px
 * - Green accent pills ALWAYS use black ink (--accent-ink: #0B0B0B) for AA contrast.
 */
export function Badge({
  children,
  className,
  variant = "default",
  pulse = false,
  ...props
}: BadgeProps) {
  if (variant === "bracket") {
    return (
      <span
        className={cn(
          "inline-flex items-center font-mono text-xs uppercase tracking-wider text-[var(--muted)]",
          className
        )}
        {...props}
      >
        ({children})
      </span>
    );
  }

  const isAccentFill =
    variant === "accent" || variant === "live" || variant === "cyber";

  const variantClasses = isAccentFill
    ? "bg-[var(--accent)] text-[var(--accent-ink)] border-transparent font-semibold"
    : variant === "peach"
    ? "bg-[var(--peach)] text-[#0B0B0B] border-transparent font-semibold"
    : "glass-surface text-[var(--ink)]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-3.5 py-1 text-xs font-mono tracking-tight transition-colors",
        variantClasses,
        className
      )}
      {...props}
    >
      {pulse && (
        <span
          className={cn(
            "inline-block h-2 w-2 rounded-full",
            isAccentFill ? "bg-[#0B0B0B]" : "bg-[var(--accent)]"
          )}
        />
      )}
      {children}
    </span>
  );
}

export function getCategoryBadgeVariant(
  category: string
): "ai" | "cyber" | "devops" | "default" {
  const upper = category.toUpperCase();
  if (upper.includes("AI") || upper.includes("ML")) return "ai";
  if (upper.includes("CYBER") || upper.includes("SEC") || upper.includes("CTF"))
    return "cyber";
  if (upper.includes("DEVOPS") || upper.includes("CLOUD") || upper.includes("K8S"))
    return "devops";
  return "default";
}
