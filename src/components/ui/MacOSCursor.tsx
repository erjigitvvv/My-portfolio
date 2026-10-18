"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

/**
 * Complements the hardware-accelerated macOS SVG cursors in globals.css
 * (Tail-less macOS Arrow + 3-Stripe White Gloved Pointing Hand + Closed Glove + I-Beam)
 * with a subtle Liquid Glass click ripple effect.
 */
export function MacOSCursor() {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const onMouseDown = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 550);
    };

    window.addEventListener("mousedown", onMouseDown, { passive: true });
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{
              x: ripple.x,
              y: ripple.y,
              scale: 0.2,
              opacity: 0.75,
            }}
            animate={{
              scale: 1.85,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.48, ease: "easeOut" }}
            style={{
              translateX: "-50%",
              translateY: "-50%",
            }}
            className=" fixed top-0 left-0 h-8 w-8 rounded-full border border-[var(--accent)] bg-[var(--accent)]/15 backdrop-blur-[2px]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}


