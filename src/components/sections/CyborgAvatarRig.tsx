"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Cpu, Eye, Sparkles, Activity } from "lucide-react";

interface CyborgAvatarRigProps {
  locale: string;
}

/**
 * Multi-Layer 2.5D / 3D Parallax Cyborg Avatar Rig for Website Header (Hero)
 * - Background, Torso, Head/Cranium, and Foreground HUD move at distinct parallax speeds
 * - Subtle 3D tilt (rotateX, rotateY) following the cursor
 * - Living mechanical details around the ear, temple, neck pistons, and bionic hand
 * - Intermittent, non-fatiguing neon blue & red light pulses flowing along hidden wires
 */
export function CyborgAvatarRig({ locale }: CyborgAvatarRigProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pose, setPose] = useState<"profile" | "main">("profile");

  // Normalized cursor position (-1 to +1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics so movements are fluid, weighted, and never jarring
  const smoothX = useSpring(mouseX, { stiffness: 65, damping: 22, mass: 0.9 });
  const smoothY = useSpring(mouseY, { stiffness: 65, damping: 22, mass: 0.9 });

  // Head uses a slightly more responsive spring for realistic multi-layer lag/lead
  const headSpringX = useSpring(mouseX, { stiffness: 85, damping: 20, mass: 0.7 });
  const headSpringY = useSpring(mouseY, { stiffness: 85, damping: 20, mass: 0.7 });

  // Layer 0: Deep Background Grid & Cyber Rings (inverse slow parallax)
  const bgX = useTransform(smoothX, [-1, 1], [14, -14]);
  const bgY = useTransform(smoothY, [-1, 1], [10, -10]);

  // Layer 1: Volumetric Neon Backlight Aura (slow positive parallax)
  const auraX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const auraY = useTransform(smoothY, [-1, 1], [-6, 6]);

  // Layer 2: Character Torso, Suit & Bionic Hand (medium parallax + 3D tilt)
  const torsoX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const torsoY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const torsoRotateY = useTransform(smoothX, [-1, 1], [-5.5, 5.5]);
  const torsoRotateX = useTransform(smoothY, [-1, 1], [4, -4]);

  // Layer 3: Character Head, Cranial Plates & Ear Mechanism (stronger parallax + 3D head turn)
  // Note: relative offset from torso is kept within +-5.5px so the neck pivots naturally inside the collar
  const headX = useTransform(headSpringX, [-1, 1], [-17.5, 17.5]);
  const headY = useTransform(headSpringY, [-1, 1], [-11.5, 11.5]);
  const headRotateY = useTransform(headSpringX, [-1, 1], [-8.5, 8.5]);
  const headRotateX = useTransform(headSpringY, [-1, 1], [6, -6]);

  // Subtle eye iris tracking
  const eyeX = useTransform(headSpringX, [-1, 1], [-2.5, 2.5]);
  const eyeY = useTransform(headSpringY, [-1, 1], [-1.8, 1.8]);

  // Layer 4: Foreground HUD & Specular Frame (fastest foreground parallax)
  const hudX = useTransform(smoothX, [-1, 1], [-24, 24]);
  const hudY = useTransform(smoothY, [-1, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(Math.max(-1, Math.min(1, nx)));
      mouseY.set(Math.max(-1, Math.min(1, ny)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const nx = (touch.clientX / window.innerWidth - 0.5) * 2;
      const ny = (touch.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(Math.max(-1, Math.min(1, nx)));
      mouseY.set(Math.max(-1, Math.min(1, ny)));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

  const isProfile = pose === "profile";

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Main 3D Stage Container */}
      <div className="clear-liquid-glass liquid-shimmer-sweep relative h-[430px] w-full max-w-[410px] sm:h-[510px] sm:max-w-[450px] overflow-hidden rounded-[2rem] border border-white/25 dark:border-white/15 shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
        {/* ============================================================
            LAYER 0: Deep Background Perspective Grid & Cybernetic Halo
            Moves inversely to cursor (-14px .. +14px)
           ============================================================ */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="pointer-events-none absolute -inset-8 z-0 flex items-center justify-center"
        >
          {/* Subtle radial cyber grid */}
          <div
            className="absolute inset-0 opacity-35 dark:opacity-45"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 35%, rgba(56,189,248,0.16) 0%, rgba(244,63,94,0.08) 42%, transparent 72%), linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 28px 28px, 28px 28px",
            }}
          />

          {/* Slow rotating neural telemetry ring behind the head */}
          <svg
            viewBox="0 0 400 400"
            className="absolute top-6 h-72 w-72 sm:h-80 sm:w-80 opacity-35 dark:opacity-50"
          >
            <defs>
              <linearGradient id="cyberRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#3DBE74" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FB7185" stopOpacity="0.65" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="200"
              cy="175"
              r="138"
              fill="none"
              stroke="url(#cyberRingGrad)"
              strokeWidth="1"
              strokeDasharray="8 14 28 10"
              animate={{ rotate: 360 }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "200px 175px" }}
            />
            <motion.circle
              cx="200"
              cy="175"
              r="112"
              fill="none"
              stroke="#38BDF8"
              strokeOpacity="0.28"
              strokeWidth="0.8"
              strokeDasharray="4 18"
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "200px 175px" }}
            />
          </svg>
        </motion.div>

        {/* ============================================================
            LAYER 1: Volumetric Neon Backlight Aura
            Moves gently with cursor (-8px .. +8px)
           ============================================================ */}
        <motion.div
          style={{ x: auraX, y: auraY }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        >
          {/* Cool Cyan/Blue aura near right temple/ear */}
          <motion.div
            animate={{
              opacity: [0.28, 0.52, 0.28],
              scale: [0.96, 1.05, 0.96],
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-14 right-10 h-44 w-44 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.42) 0%, rgba(14,165,233,0.12) 60%, transparent 100%)",
            }}
          />
          {/* Subtle Crimson/Red aura near ear wires & lapel rose */}
          <motion.div
            animate={{
              opacity: [0.22, 0.45, 0.22],
              scale: [1.02, 0.94, 1.02],
            }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-32 right-16 h-40 w-40 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(251,113,133,0.36) 0%, rgba(225,29,72,0.1) 60%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* ============================================================
            CALM AUTONOMOUS BREATHING WRAPPER FOR CHARACTER RIG
           ============================================================ */}
        <motion.div
          animate={{ y: [0, -3.5, 0] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 h-full w-full"
        >
          {/* ============================================================
              LAYER 2: Torso, Suit, Armor & Bionic Hand Base Layer
              Moves at 1.0x cursor parallax + 3D perspective tilt
             ============================================================ */}
          <motion.div
            style={{
              x: torsoX,
              y: torsoY,
              rotateX: torsoRotateX,
              rotateY: torsoRotateY,
              transformStyle: "preserve-3d",
            }}
            className=" pointer-events-none absolute inset-0"
          >
            {/* Extracted Torso PNG */}
            <img
              src={
                isProfile
                  ? "/avatar/cyborg-profile-torso.png"
                  : "/avatar/cyborg-main-torso.png"
              }
              alt="Erjigitov Mirhamid Cybernetic Torso Layer"
              className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_36px_rgba(0,0,0,0.45)]"
              draggable={false}
            />

            {/* Coordinate-Locked SVG Overlay for Torso, Neck Pistons & Bionic Hand Wires */}
            <svg
              viewBox="0 0 682 1024"
              preserveAspectRatio="xMidYMax meet"
              className="absolute inset-0 h-full w-full"
              style={{ mixBlendMode: "screen" }}
            >
              <defs>
                <filter id="neonBlueGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="neonRedGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {isProfile ? (
                <>
                  {/* Neck Hydraulic Red Tube Pulse (Collar -> Ear Base) */}
                  <motion.path
                    d="M 468 485 L 495 352"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    filter="url(#neonRedGlow)"
                    strokeDasharray="26 160"
                    animate={{
                      strokeDashoffset: [160, -40],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 3.8,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Neck Hydraulic Blue Conduit Pulse */}
                  <motion.path
                    d="M 442 508 L 480 375"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="24 160"
                    animate={{
                      strokeDashoffset: [160, -40],
                      opacity: [0, 0.85, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 4.4,
                      delay: 1.6,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Inner Neck Shadow Blue Wire */}
                  <motion.path
                    d="M 398 532 L 418 465"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="16 110"
                    animate={{
                      strokeDashoffset: [110, -25],
                      opacity: [0, 0.75, 0],
                    }}
                    transition={{
                      duration: 1.9,
                      repeat: Infinity,
                      repeatDelay: 5.1,
                      delay: 2.8,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Chest Armor Core Seam Subtle Breath Line */}
                  <motion.path
                    d="M 328 648 L 288 815"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="35 220"
                    animate={{
                      strokeDashoffset: [220, -50],
                      opacity: [0, 0.55, 0],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      repeatDelay: 4.5,
                      delay: 0.8,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Bionic Hand Exposed Red Wire Pulse */}
                  <motion.path
                    d="M 304 940 C 335 944, 362 949, 382 956"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    filter="url(#neonRedGlow)"
                    strokeDasharray="22 120"
                    animate={{
                      strokeDashoffset: [120, -30],
                      opacity: [0, 0.95, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatDelay: 4.2,
                      delay: 1.2,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Bionic Hand Exposed Blue Wire Pulse */}
                  <motion.path
                    d="M 304 947 C 332 952, 355 956, 374 960"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="20 120"
                    animate={{
                      strokeDashoffset: [-30, 120],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      repeatDelay: 4.6,
                      delay: 3.0,
                      ease: "easeInOut",
                    }}
                  />
                </>
              ) : (
                <>
                  {/* Main Pose: Right Neck Hydraulic Rod Pulse */}
                  <motion.path
                    d="M 385 555 L 418 492 L 455 404"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#neonRedGlow)"
                    strokeDasharray="26 170"
                    animate={{
                      strokeDashoffset: [170, -40],
                      opacity: [0, 0.85, 0],
                    }}
                    transition={{
                      duration: 2.3,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Pose: Left Neck Hydraulic Blue Pulse */}
                  <motion.path
                    d="M 325 535 L 286 435"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="22 150"
                    animate={{
                      strokeDashoffset: [150, -35],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 2.1,
                      repeat: Infinity,
                      repeatDelay: 4.7,
                      delay: 1.9,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Pose: Chest Core Seam */}
                  <motion.path
                    d="M 342 612 L 320 755"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="32 200"
                    animate={{
                      strokeDashoffset: [200, -40],
                      opacity: [0, 0.55, 0],
                    }}
                    transition={{
                      duration: 3.0,
                      repeat: Infinity,
                      repeatDelay: 4.5,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Pose: Bionic Hand Red & Blue Wires */}
                  <motion.path
                    d="M 475 838 C 495 842, 512 848, 526 854"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#neonRedGlow)"
                    strokeDasharray="18 100"
                    animate={{
                      strokeDashoffset: [100, -25],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 1.7,
                      repeat: Infinity,
                      repeatDelay: 4.0,
                      delay: 0.9,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.path
                    d="M 472 844 C 490 848, 506 852, 518 856"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="18 100"
                    animate={{
                      strokeDashoffset: [-25, 100],
                      opacity: [0, 0.88, 0],
                    }}
                    transition={{
                      duration: 1.9,
                      repeat: Infinity,
                      repeatDelay: 4.4,
                      delay: 2.5,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
            </svg>
          </motion.div>

          {/* ============================================================
              LAYER 3: Head, Cranial Plates & Ear Cybernetics Layer
              Moves at 1.45x cursor parallax + independent 3D Head Tilt!
              Includes animated ear/temple mechanical servos & neon wires
             ============================================================ */}
          <motion.div
            style={{
              x: headX,
              y: headY,
              rotateX: headRotateX,
              rotateY: headRotateY,
              transformStyle: "preserve-3d",
            }}
            className="pointer-events-none absolute inset-0 z-30"
          >
            {/* Extracted Head & Cranial Cybernetics PNG */}
            <img
              src={
                isProfile
                  ? "/avatar/cyborg-profile-head.png"
                  : "/avatar/cyborg-main-head.png"
              }
              alt="Erjigitov Mirhamid Cybernetic Head & Ear Layer"
              className="h-full w-full object-contain object-bottom"
              draggable={false}
            />

            {/* Coordinate-Locked SVG Overlay for Ear & Head Mechanical Details + Neon Wires */}
            <svg
              viewBox="0 0 682 1024"
              preserveAspectRatio="xMidYMax meet"
              className="absolute inset-0 h-full w-full"
              style={{ mixBlendMode: "screen" }}
            >
              {isProfile ? (
                <>
                  {/* 1. Upper Temple Red Wire Neon Flow */}
                  <motion.path
                    d="M 447 154 C 468 140, 492 152, 505 182"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    filter="url(#neonRedGlow)"
                    strokeDasharray="20 130"
                    animate={{
                      strokeDashoffset: [130, -30],
                      opacity: [0, 0.95, 0],
                    }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      repeatDelay: 3.2,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 2. Inner Temple Blue Wire Coil Flow */}
                  <motion.path
                    d="M 492 174 C 503 185, 507 205, 502 225"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="18 110"
                    animate={{
                      strokeDashoffset: [110, -25],
                      opacity: [0, 0.95, 0],
                    }}
                    transition={{
                      duration: 1.9,
                      repeat: Infinity,
                      repeatDelay: 3.6,
                      delay: 1.4,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 3. Mid-Temple Intertwined Red Wire (Above Ear) */}
                  <motion.path
                    d="M 462 204 C 468 220, 464 238, 460 255"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    filter="url(#neonRedGlow)"
                    strokeDasharray="16 100"
                    animate={{
                      strokeDashoffset: [100, -25],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatDelay: 4.1,
                      delay: 2.6,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 4. Mid-Temple Intertwined Blue Wire (Above Ear) */}
                  <motion.path
                    d="M 468 202 C 476 218, 478 232, 488 225"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="15 95"
                    animate={{
                      strokeDashoffset: [-20, 95],
                      opacity: [0, 0.92, 0],
                    }}
                    transition={{
                      duration: 1.7,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                      delay: 0.7,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 5. Cranial Chrome Plate Seam Energy Trace */}
                  <motion.path
                    d="M 408 108 L 400 128 L 418 152 L 408 205 L 444 275 L 422 345 L 415 425 L 372 478"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="45 380"
                    animate={{
                      strokeDashoffset: [380, -60],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      repeatDelay: 4.2,
                      delay: 2.0,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 6. Mechanical Micro-Servo Ring around Ear Cybernetic Cavity */}
                  <motion.circle
                    cx="482"
                    cy="212"
                    r="16"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="1.4"
                    strokeDasharray="4 6 10 4"
                    filter="url(#neonBlueGlow)"
                    animate={{
                      rotate: [0, 45, -20, 0],
                      opacity: [0.2, 0.65, 0.2],
                    }}
                    transition={{
                      duration: 6.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "482px 212px" }}
                  />

                  {/* 7. Inner Ear Canal Cybernetic Transceiver Ring & Hidden LED */}
                  <motion.circle
                    cx="496"
                    cy="304"
                    r="11"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="1.5"
                    strokeDasharray="3 5"
                    filter="url(#neonRedGlow)"
                    animate={{
                      rotate: [0, -60, 25, 0],
                      opacity: [0.2, 0.75, 0.2],
                    }}
                    transition={{
                      duration: 5.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "496px 304px" }}
                  />
                  {/* Hidden Micro-LED Node in Ear Canal */}
                  <motion.circle
                    cx="496"
                    cy="304"
                    r="3.2"
                    fill="#FF2A5F"
                    filter="url(#neonRedGlow)"
                    animate={{
                      opacity: [0.15, 0.9, 0.15],
                      scale: [0.85, 1.2, 0.85],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 8. Hidden Micro-LED Node inside Upper Temple Mechanism */}
                  <motion.circle
                    cx="474"
                    cy="198"
                    r="3"
                    fill="#00E5FF"
                    filter="url(#neonBlueGlow)"
                    animate={{
                      opacity: [0.1, 0.88, 0.1],
                      scale: [0.8, 1.25, 0.8],
                    }}
                    transition={{
                      duration: 4.4,
                      repeat: Infinity,
                      delay: 1.8,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 9. Subtle Cybernetic Eye Optical Sensor Glints (Follow Cursor) */}
                  <motion.g style={{ x: eyeX, y: eyeY }}>
                    <motion.circle
                      cx="240"
                      cy="286"
                      r="3.5"
                      fill="#38BDF8"
                      filter="url(#neonBlueGlow)"
                      animate={{ opacity: [0.15, 0.45, 0.15] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="355"
                      cy="276"
                      r="3.8"
                      fill="#38BDF8"
                      filter="url(#neonBlueGlow)"
                      animate={{ opacity: [0.15, 0.48, 0.15] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.g>
                </>
              ) : (
                <>
                  {/* Main Pose: Right Temple Cranial Seam Trace */}
                  <motion.path
                    d="M 426 105 L 424 126 L 448 152 L 445 205 L 468 248 L 448 318 L 445 385"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="40 340"
                    animate={{
                      strokeDashoffset: [340, -50],
                      opacity: [0, 0.78, 0],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      repeatDelay: 3.8,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Pose: Right Temple Recessed Red Wire */}
                  <motion.path
                    d="M 466 144 C 482 156, 486 192, 476 238"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    filter="url(#neonRedGlow)"
                    strokeDasharray="20 130"
                    animate={{
                      strokeDashoffset: [130, -30],
                      opacity: [0, 0.92, 0],
                    }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      repeatDelay: 3.4,
                      delay: 1.1,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Pose: Inner Temple Blue Wire */}
                  <motion.path
                    d="M 458 175 C 468 195, 470 218, 464 245"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="16 110"
                    animate={{
                      strokeDashoffset: [-25, 110],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatDelay: 4.0,
                      delay: 2.4,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Pose: Left Temple Chrome Seam Trace */}
                  <motion.path
                    d="M 244 115 C 228 142, 222 185, 228 245"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    filter="url(#neonBlueGlow)"
                    strokeDasharray="24 160"
                    animate={{
                      strokeDashoffset: [160, -35],
                      opacity: [0, 0.72, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 4.5,
                      delay: 1.5,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Pose: Temple Micro-Servo & Ear Node */}
                  <motion.circle
                    cx="468"
                    cy="195"
                    r="13"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="1.4"
                    strokeDasharray="4 6"
                    filter="url(#neonBlueGlow)"
                    animate={{
                      rotate: [0, 45, -20, 0],
                      opacity: [0.2, 0.65, 0.2],
                    }}
                    transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "468px 195px" }}
                  />
                  <motion.circle
                    cx="482"
                    cy="272"
                    r="3.2"
                    fill="#FF2A5F"
                    filter="url(#neonRedGlow)"
                    animate={{
                      opacity: [0.15, 0.85, 0.15],
                      scale: [0.85, 1.2, 0.85],
                    }}
                    transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Main Pose: Optical Eye Glints */}
                  <motion.g style={{ x: eyeX, y: eyeY }}>
                    <motion.circle
                      cx="282"
                      cy="266"
                      r="3.4"
                      fill="#38BDF8"
                      filter="url(#neonBlueGlow)"
                      animate={{ opacity: [0.15, 0.45, 0.15] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="395"
                      cy="262"
                      r="3.4"
                      fill="#38BDF8"
                      filter="url(#neonBlueGlow)"
                      animate={{ opacity: [0.15, 0.45, 0.15] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.g>
                </>
              )}
            </svg>
          </motion.div>
        </motion.div>

        {/* ============================================================
            LAYER 4: Foreground Telemetry HUD Badges & Specular Glass Rim
            Moves at 1.85x cursor speed in the closest foreground plane
           ============================================================ */}
        <motion.div
          style={{ x: hudX, y: hudY }}
          className="pointer-events-none absolute inset-0 z-40"
        >
          {/* Top-Left Neural Sync Indicator */}
          <div className="clear-liquid-glass absolute top-3.5 left-3.5 flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] font-semibold text-[var(--ink)] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </span>
            <span>NEURAL RIG // 3D PARALLAX</span>
          </div>

          {/* Top-Right Ear Mechanism Telemetry Callout */}
          <div className="clear-liquid-glass absolute top-14 right-3 hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] text-sky-400 border border-sky-400/30">
            <Activity className="h-3 w-3 text-rose-400 animate-pulse" />
            <span>CRANIAL BUS: ACTIVE</span>
          </div>
        </motion.div>

        {/* Bottom Gradient Vignette + Pose Switcher Pill */}
        <div className="absolute inset-x-0 bottom-0 z-50 flex items-center justify-between gap-2 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-4 pt-8 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="liquid-icon-badge h-7 w-7 text-[var(--accent)]">
              <Cpu className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-bold tracking-wider text-white uppercase">
                ERJIGITOV MIRHAMID
              </p>
              <p className="font-mono text-[9px] text-emerald-300">
                {locale === "en"
                  ? "Cybernetic 3D Layers • Interactive"
                  : "3D Qatlamli Avatar • Jonli Mexanika"}
              </p>
            </div>
          </div>

          {/* Interactive Pose Switcher Button (Profile Ear Rig vs Desk Rig) */}
          <button
            type="button"
            onClick={() =>
              setPose((prev) => (prev === "profile" ? "main" : "profile"))
            }
            className="clear-liquid-glass pointer-events-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold text-white transition hover:scale-105 hover:border-sky-400/60"
            title={
              locale === "en"
                ? "Switch Cybernetic Portrait Angle"
                : "Rakursni almashtirish (01 / 02)"
            }
          >
            <Eye className="h-3 w-3 text-sky-400" />
            <span>{isProfile ? "POSE 01/02" : "POSE 02/02"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
