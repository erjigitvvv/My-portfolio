"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

/**
 * Smooth Liquid Glass Scroll Reveal animation wrapper for sections and cards
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: ScrollRevealProps) {
  const initialMap = {
    up: { opacity: 0, y: 42, scale: 0.98, filter: "blur(6px)" },
    down: { opacity: 0, y: -42, scale: 0.98, filter: "blur(6px)" },
    left: { opacity: 0, x: -42, scale: 0.98, filter: "blur(6px)" },
    right: { opacity: 0, x: 42, scale: 0.98, filter: "blur(6px)" },
    scale: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  }[direction];

  return (
    <motion.div
      initial={initialMap}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.14, margin: "0px 0px -40px 0px" }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 20,
        mass: 0.8,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Top viewport Liquid Glass scroll progress indicator
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-[var(--accent)] via-[#35D0FF] to-[var(--peach)] shadow-[0_0_16px_var(--accent)]"
    />
  );
}
