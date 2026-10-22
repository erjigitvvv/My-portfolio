"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
export { cn };

// framer-motion redefines these handlers with different signatures than the DOM ones.
type MotionConflictingProps =
  | "onAnimationStart"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd";

interface GlassCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, MotionConflictingProps> {
  variant?: "default" | "spatial" | "ai" | "cyber" | "devops" | "interactive";
  glow?: boolean;
  spotlight?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  magnetic?: boolean;
  magneticStrength?: number;
}

/**
 * Spatial Glass Card (Apple visionOS & Spatial Computing 3D Refractive Aerogel)
 * Features dynamic specular sheen tracking the cursor, 3D perspective tilt physics,
 * chamfered optical bevels, and multi-layer Z-axis diorama depth.
 */
export function GlassCard({
  children,
  className,
  variant = "spatial",
  glow = false,
  spotlight = true,
  padding = "lg",
  magnetic = true,
  magneticStrength = 20,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic 3D tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, physical spring animations for visionOS fluid glass inertia
  const springConfig = { stiffness: 280, damping: 28 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);

  // Spotlight parallax effect
  const spotlightX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), springConfig);
  const spotlightY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate relative position (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left - centerX) / centerX;
    const relativeY = (e.clientY - rect.top - centerY) / centerY;

    // Update magnetic tilt values
    x.set(relativeX);
    y.set(relativeY);

    // Update spotlight position
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (spotlight) setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
    // Reset tilt to center smoothly
    x.set(0);
    y.set(0);
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
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-7 sm:p-9",
    xl: "p-8 sm:p-12",
  }[padding];

  // Base transform styles for Spatial 3D depth
  const baseTransform = magnetic
    ? {
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d" as const,
      }
    : {};

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      style={baseTransform}
      className={cn(
        "spatial-glass liquid-card-sheen relative overflow-hidden rounded-[26px] transition-all duration-500 ease-out",
        magnetic && isHovered
          ? "shadow-[0_36px_70px_-16px_rgba(61,190,116,0.32),0_12px_24px_-4px_rgba(0,0,0,0.1)]"
          : "hover:shadow-[0_28px_56px_-14px_rgba(61,190,116,0.22),0_8px_16px_-4px_rgba(0,0,0,0.06)]",
        (variant === "interactive" || variant === "spatial") && "hover:scale-[1.012] active:scale-[0.985]",
        glow && "ring-2 ring-[var(--accent)]/60 shadow-[0_0_36px_rgba(61,190,116,0.3)]",
        paddingStyles,
        className
      )}
      {...props}
    >
      {/* Top crystal specular reflection bar */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/95 to-transparent opacity-95" />

      {/* Bottom subtle emerald refraction rim */}
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent opacity-80" />

      {/* Continuous Clear Liquid Glass Shimmer Wave */}
      <div className="liquid-shimmer-sweep" />

      {/* Fluid cursor/touch refraction spotlight */}
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            x: spotlightX,
            y: spotlightY,
            background: `radial-gradient(540px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.32), rgba(61, 190, 116, 0.16) 40%, rgba(242, 169, 140, 0.1) 62%, transparent 78%)`,
          }}
        />
      )}

      {/* Spatial 3D floating diorama content layer */}
      <motion.div
        style={{ transform: "translateZ(36px)", transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Glass overlay shine on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent"
        />
      )}
    </motion.div>
  );
}
