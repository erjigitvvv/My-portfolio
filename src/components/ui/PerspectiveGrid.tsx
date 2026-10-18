"use client";

import React, { useEffect, useRef } from "react";

/**
 * One-point perspective "room" grid background (DESIGN_SPEC.md Section 1.1 & 2).
 * Vanishing point shifts subtly with cursor movement (up to ±2% of viewport) via lerp.
 * Respects prefers-reduced-motion and pauses when tab is hidden.
 */
export function PerspectiveGrid() {
  const vanishingGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isRunning = true;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      // Max shift ±2% of 1000x1000 coordinate space => ±20 units
      targetX = normX * 20;
      targetY = normY * 20;
    };

    const tick = () => {
      if (!isRunning) return;
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (vanishingGroupRef.current) {
        vanishingGroupRef.current.style.transform = `translate3d(${currentX.toFixed(
          2
        )}px, ${currentY.toFixed(2)}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    rafId = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Generate radial rays from edges of 1000x1000 box toward center (500, 500)
  const edgePoints: [number, number][] = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const pos = (i / steps) * 1000;
    edgePoints.push([pos, 0]); // Top edge
    edgePoints.push([pos, 1000]); // Bottom edge
    if (i > 0 && i < steps) {
      edgePoints.push([0, pos]); // Left edge
      edgePoints.push([1000, pos]); // Right edge
    }
  }

  // Concentric room depth frames
  const depthFrames = [
    { x: 60, y: 60, w: 880, h: 880 },
    { x: 140, y: 140, w: 720, h: 720 },
    { x: 225, y: 225, w: 550, h: 550 },
    { x: 310, y: 310, w: 380, h: 380 },
    { x: 390, y: 390, w: 220, h: 220 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="h-full w-full opacity-75"
      >
        <g
          ref={vanishingGroupRef}
          style={{ willChange: "transform" }}
          stroke="var(--line)"
          strokeWidth="1"
          fill="none"
        >
          {/* Perspective rays converging to center back wall */}
          {edgePoints.map(([ex, ey], idx) => (
            <line key={idx} x1={ex} y1={ey} x2={500} y2={500} />
          ))}

          {/* Rectangular room depth walls */}
          {depthFrames.map((f, idx) => (
            <rect
              key={idx}
              x={f.x}
              y={f.y}
              width={f.w}
              height={f.h}
              style={{
                fill: idx === depthFrames.length - 1 ? "var(--bg)" : "none",
              }}
            />
          ))}
        </g>
      </svg>

      {/* Subtle ambient Mint & Peach soft blobs */}
      <div
        className="absolute top-1/4 right-1/4 h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{ background: "var(--accent)", opacity: 0.12 }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 h-[320px] w-[320px] rounded-full blur-[110px]"
        style={{ background: "var(--peach)", opacity: 0.14 }}
      />
    </div>
  );
}
