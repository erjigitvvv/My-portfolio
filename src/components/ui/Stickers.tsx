"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn doodle arrow SVG (DESIGN_SPEC.md Section 1.1 & 5)
 */
export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 84 42"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-16 text-[var(--ink)]", className)}
    >
      <path
        d="M4 32C22 10 48 8 74 22"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M64 12L76 23L61 29"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Interactive Doodle "Hand / Star" Sticker (DESIGN_SPEC.md Section 1.1 & 4)
 * Wiggles/rotates on hover and click.
 */
export function SparkleSticker({
  label = "*",
  variant = "accent",
  className,
}: {
  label?: string;
  variant?: "accent" | "peach";
  className?: string;
}) {
  const [wiggle, setWiggle] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setWiggle(true);
        setTimeout(() => setWiggle(false), 600);
      }}
      aria-label="Interactive sticker"
      className={cn(
        "group inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#0B0B0B]/20 shadow-md transition-transform duration-300 hover:rotate-12 hover:scale-110",
        variant === "accent"
          ? "bg-[var(--accent)] text-[#0B0B0B]"
          : "bg-[var(--peach)] text-[#0B0B0B]",
        wiggle && "rotate-45 scale-125",
        className
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45"
      >
        <path
          d="M16 3L19.2 12.8L29 16L19.2 19.2L16 29L12.8 19.2L3 16L12.8 12.8L16 3Z"
          fill="currentColor"
          stroke="#0B0B0B"
          strokeWidth="1.5"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </button>
  );
}

/**
 * Bracketed label e.g. (PORTFOLIO) or (01/12)
 */
export function BracketLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-[var(--muted)]",
        className
      )}
    >
      ({children})
    </span>
  );
}
