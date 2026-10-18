"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
export { cn };

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "ai" | "cyber" | "devops" | "interactive";
  glow?: boolean;
  spotlight?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Clear Liquid Glass Card with animated specular shimmer wave,
 * prismatic border refraction & fluid cursor/touch spotlight.
 */
export function GlassCard({
  children,
  className,
  variant = "default",
  glow = false,
  spotlight = true,
  padding = "md",
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    });
    setOpacity(1);
  };

  const paddingStyles = {
    none: "p-0",
    sm: "p-3.5 sm:p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  }[padding];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onTouchStart={() => setOpacity(1)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setOpacity(0)}
      className={cn(
        "group clear-liquid-glass liquid-card-sheen relative overflow-hidden rounded-card transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_22px_50px_-12px_rgba(61,190,116,0.22)]",
        variant === "interactive" &&
          "hover:-translate-y-1.5 hover:scale-[1.008] hover:shadow-[0_28px_60px_-12px_rgba(61,190,116,0.26)]",
        glow && "ring-1 ring-[var(--accent)]/50",
        paddingStyles,
        className
      )}
      {...props}
    >
      {/* Top crystal specular reflection bar */}
      <div className="pointer-events-none absolute inset-x-5 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-90" />

      {/* Bottom subtle emerald-peach refraction rim */}
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-70" />

      {/* Continuous Clear Liquid Glass Shimmer Wave */}
      <div className="liquid-shimmer-sweep" />

      {/* Fluid cursor/touch refraction spotlight */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.22), rgba(61, 190, 116, 0.14) 38%, rgba(242, 169, 140, 0.08) 60%, transparent 75%)`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

