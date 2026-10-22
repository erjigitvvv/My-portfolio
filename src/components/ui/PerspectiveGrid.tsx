"use client";

import React, { useEffect, useRef } from "react";

/**
 * Executive Office Spatial Computing Environment (Apple visionOS Spatial Passthrough)
 * - Photorealistic 3D executive office environment with panoramic windows and luxury textures
 * - Interactive 3D camera head/mouse tracking parallax (room looks around with cursor)
 * - Adaptive optical scrim ensuring strict WCAG contrast for both light and dark themes
 * - Holographic AR room depth mesh
 * - Volumetric light blooms matching the natural window light and warm ambient illumination
 */
export function PerspectiveGrid() {
  const bgRef = useRef<HTMLDivElement>(null);
  const vanishingGroupRef = useRef<SVGGElement>(null);
  const orbWindowRef = useRef<HTMLDivElement>(null);
  const orbWoodRef = useRef<HTMLDivElement>(null);
  const orbFloorRef = useRef<HTMLDivElement>(null);

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
      // Max shift: ±18px on coordinate space
      targetX = normX * 18;
      targetY = normY * 18;
    };

    const tick = () => {
      if (!isRunning) return;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Realistic 3D camera parallax for the executive office room
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.06) translate3d(${(-currentX * 0.85).toFixed(
          2
        )}px, ${(-currentY * 0.85).toFixed(2)}px, 0)`;
      }

      // AR Spatial tracking mesh shifting with different Z-factor
      if (vanishingGroupRef.current) {
        vanishingGroupRef.current.style.transform = `translate3d(${(currentX * 1.2).toFixed(
          2
        )}px, ${(currentY * 1.2).toFixed(2)}px, 0)`;
      }

      // Window natural light bloom
      if (orbWindowRef.current) {
        orbWindowRef.current.style.transform = `translate3d(${(-currentX * 1.6).toFixed(
          2
        )}px, ${(-currentY * 1.6).toFixed(2)}px, 0)`;
      }

      // Warm wood interior bloom
      if (orbWoodRef.current) {
        orbWoodRef.current.style.transform = `translate3d(${(currentX * 1.8).toFixed(
          2
        )}px, ${(currentY * 1.8).toFixed(2)}px, 0)`;
      }

      // Floor carpet spatial depth
      if (orbFloorRef.current) {
        orbFloorRef.current.style.transform = `translate3d(${(-currentX * 1.1).toFixed(
          2
        )}px, ${(currentY * 1.1).toFixed(2)}px, 0)`;
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

  // Concentric room depth frames for the holographic AR mesh
  const edgePoints: [number, number][] = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const pos = (i / steps) * 1000;
    edgePoints.push([pos, 0]);
    edgePoints.push([pos, 1000]);
    if (i > 0 && i < steps) {
      edgePoints.push([0, pos]);
      edgePoints.push([1000, pos]);
    }
  }

  const depthFrames = [
    { x: 70, y: 70, w: 860, h: 860 },
    { x: 160, y: 160, w: 680, h: 680 },
    { x: 260, y: 260, w: 480, h: 480 },
    { x: 360, y: 360, w: 280, h: 280 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* 1. Photorealistic Executive Office Background (3D Room Passthrough) */}
      <div
        ref={bgRef}
        className="absolute -inset-10 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out will-change-transform"
        style={{
          backgroundImage: "url('/spatial-office-bg.webp')",
          filter: "brightness(0.98) contrast(1.02)",
        }}
      />

      {/* 2. visionOS Adaptive Optical Scrim (Ensures crystal clear text readability while keeping the office razor-sharp) */}
      <div
        className="absolute inset-0 bg-[#EDEEEC]/55 dark:bg-[#070908]/75 transition-colors duration-500"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 30%, transparent 20%, rgba(0, 0, 0, 0.14) 100%)",
        }}
      />

      {/* 3. Holographic AR Room Wireframe Overlay */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="h-full w-full opacity-25 dark:opacity-20 transition-opacity duration-500"
      >
        <g
          ref={vanishingGroupRef}
          style={{ willChange: "transform" }}
          stroke="var(--line)"
          strokeWidth="0.85"
          fill="none"
        >
          {edgePoints.map(([ex, ey], idx) => (
            <line key={idx} x1={ex} y1={ey} x2={500} y2={450} strokeDasharray="3 4" />
          ))}

          {depthFrames.map((f, idx) => (
            <rect key={idx} x={f.x} y={f.y} width={f.w} height={f.h} rx="12" />
          ))}
        </g>
      </svg>

      {/* 4. Natural Window Light Bloom (Matching Left Panoramic Windows) */}
      <div
        ref={orbWindowRef}
        className="absolute top-1/6 left-1/12 h-[520px] w-[520px] rounded-full blur-[140px] transition-transform duration-700 ease-out will-change-transform pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(61, 190, 116, 0.18) 45%, transparent 70%)",
          opacity: 0.8,
        }}
      />

      {/* 5. Warm Ambient Wood Interior Bloom (Matching Right Carved Wood Walls) */}
      <div
        ref={orbWoodRef}
        className="absolute top-1/3 right-1/12 h-[460px] w-[460px] rounded-full blur-[130px] transition-transform duration-700 ease-out will-change-transform pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(242, 169, 140, 0.28) 0%, rgba(217, 119, 6, 0.12) 50%, transparent 75%)",
          opacity: 0.75,
        }}
      />

      {/* 6. Floor Ambient Grounding Bloom */}
      <div
        ref={orbFloorRef}
        className="absolute bottom-[-10%] left-1/3 h-[400px] w-[500px] rounded-full blur-[140px] transition-transform duration-700 ease-out will-change-transform pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)",
          opacity: 0.22,
        }}
      />
    </div>
  );
}
