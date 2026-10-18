"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { BracketLabel, DoodleArrow, SparkleSticker } from "../ui/Stickers";
import { getDictionary, localizeField } from "@/i18n/messages";

/**
 * Poster-style Hero section over the perspective room grid + Liquid Glass 3D Avatar
 * Custom tailored for Erjigitov Mirhamid (MIRHAMID / ERJIGITOV *26)
 */
export function Hero({
  profile,
  locale,
}: {
  profile: Record<string, any>;
  locale: string;
}) {
  const dict = getDictionary(locale);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setEyeOffset({ x: nx * 5.5, y: ny * 4.5 });
      setHeadTilt({ rotateX: -ny * 7, rotateY: nx * 9 });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rawLine1 = localizeField(profile, "heroLine1", locale);
  const rawLine2 = localizeField(profile, "heroLine2", locale);

  const heroLine1 =
    !rawLine1 || rawLine1 === "SARDORBEK" ? "MIRHAMID" : rawLine1;
  const heroLine2 =
    !rawLine2 || rawLine2.includes("ALIMOV") ? "ERJIGITOV *26" : rawLine2;

  const availability =
    localizeField(profile, "availability", locale) ||
    (locale === "en" ? "Open to work*" : "Loyihalarga ochiq*");
  const rolePill =
    localizeField(profile, "rolePill", locale) ||
    (locale === "en"
      ? "AI • CYBERSECURITY • DEVOPS"
      : "AI • KIBERXAVFSIZLIK • DEVOPS");
  const bio = localizeField(profile, "bio", locale);

  let specialties: string[] = [];
  try {
    const rawSpec = localizeField(profile, "specialties", locale);
    specialties = rawSpec ? JSON.parse(rawSpec) : [];
  } catch {
    specialties = [];
  }

  if (specialties.length === 0) {
    specialties =
      locale === "en"
        ? [
            "01 / Autonomous AI & RAG Systems",
            "02 / Offensive Security & Pentesting",
            "03 / Zero-Trust Kubernetes (CKS)",
            "04 / DevSecOps & Cloud Architecture",
          ]
        : [
            "01 / Avtonom AI & RAG Tizimlari",
            "02 / Kiberxavfsizlik & Pentest (OSCP)",
            "03 / Zero-Trust Kubernetes (CKS)",
            "04 / DevSecOps & Bulutli Arxitektura",
          ];
  }

  return (
    <section id="hero" className="relative scroll-mt-24 pt-4 pb-12">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Left Column: Poster Typography, Pills, Doodle Arrow & Sticker */}
        <div className="space-y-6 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <BracketLabel>ERJIGITOV MIRHAMID // 2026</BracketLabel>
            <span className="font-mono text-xs text-[var(--muted)]">
              • OʻZBEKISTON / REMOTE WORLDWIDE
            </span>
          </div>

          {/* Giant Uppercase Poster Display Lines with clamp() */}
          <div className="space-y-1">
            <h1
              className="font-poster font-black text-[var(--ink)] tracking-tight"
              style={{ fontSize: "clamp(2.75rem, 6.8vw, 6rem)" }}
            >
              <span className="block">{heroLine1}</span>
              <span className="block">
                {heroLine2.replace("*", "")}
                <span className="text-[var(--accent-text)]">*</span>
              </span>
            </h1>
          </div>

          {/* Green Status Pill + Role Pill + Doodle Arrow & Sticker */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Badge variant="accent" pulse className="px-4 py-1.5 text-xs sm:text-sm">
              {availability}
            </Badge>
            <Badge variant="default" className="px-4 py-1.5 text-xs sm:text-sm">
              {rolePill}
            </Badge>
            <DoodleArrow className="hidden sm:block" />
            <SparkleSticker label="Erjigitov Mirhamid" variant="peach" />
          </div>

          <p className="max-w-xl text-base sm:text-lg text-[var(--muted)] leading-relaxed">
            {bio}
          </p>

          {/* CTA Pill Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`/${locale}/projects`}>
              <Button variant="primary" size="lg">
                <span>{dict.hero.ctaProjects}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button variant="ink" size="lg">
                <span>{dict.hero.ctaContact}</span>
              </Button>
            </Link>
            <a
              href={
                locale === "en"
                  ? profile.cvUrl_en || "/cv-en.pdf"
                  : profile.cvUrl_uz || "/cv-uz.pdf"
              }
              download
            >
              <Button variant="glass" size="lg">
                <FileDown className="h-4 w-4 text-[var(--accent-text)]" />
                <span>{dict.hero.downloadCv}</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Liquid Glass 3D Interactive Avatar Stage */}
        <div className="relative flex items-center justify-center lg:col-span-5">
          {/* Soft circular green/peach liquid blob behind avatar */}
          <div
            aria-hidden="true"
            className="animate-liquid-blob pointer-events-none absolute h-72 w-72 sm:h-80 sm:w-80 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(61,190,116,0.28) 0%, rgba(242,169,140,0.26) 70%, transparent 100%)",
            }}
          />

          <motion.div
            animate={{
              y: [0, -7, 0],
              rotateX: headTilt.rotateX,
              rotateY: headTilt.rotateY,
            }}
            transition={{
              y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
              rotateX: { type: "spring", stiffness: 120, damping: 18 },
              rotateY: { type: "spring", stiffness: 120, damping: 18 },
            }}
            style={{ transformPerspective: 900 }}
            className="liquid-glass relative flex h-80 w-80 sm:h-96 sm:w-96 flex-col items-center justify-center rounded-full p-4"
          >
            {/* Floating Sticker on top-right of avatar frame */}
            <div className="absolute -top-2 right-6">
              <SparkleSticker variant="accent" />
            </div>

            {/* 3D Clay/Vinyl Style Interactive Avatar for Erjigitov Mirhamid */}
            <svg
              viewBox="0 0 240 240"
              className="h-64 w-64 drop-shadow-xl"
              role="img"
              aria-label="Erjigitov Mirhamid 3D Interactive Avatar"
            >
              {/* Shoulders / Black Polo */}
              <path
                d="M40 220 C40 172, 200 172, 200 220 Z"
                fill="#0B0B0B"
              />
              {/* Collar highlight */}
              <path
                d="M95 176 L120 194 L145 176"
                stroke="#3DBE74"
                strokeWidth="2.5"
                fill="none"
                opacity="0.8"
              />
              {/* Neck */}
              <rect x="102" y="146" width="36" height="32" rx="14" fill="#F3C6B1" />
              {/* Head */}
              <rect x="66" y="54" width="108" height="106" rx="52" fill="#F7D3C0" />
              {/* Black Beanie */}
              <path d="M64 90 C64 46, 176 46, 176 90 Z" fill="#0B0B0B" />
              <rect x="62" y="82" width="116" height="16" rx="8" fill="#181A18" />
              {/* Rosy Cheeks (--peach) */}
              <circle cx="86" cy="122" r="10" fill="#F2A98C" opacity="0.65" />
              <circle cx="154" cy="122" r="10" fill="#F2A98C" opacity="0.65" />

              {/* Eye whites / sockets */}
              <ellipse cx="98" cy="108" rx="9" ry="10" fill="#FFFFFF" opacity="0.85" />
              <ellipse cx="142" cy="108" rx="9" ry="10" fill="#FFFFFF" opacity="0.85" />

              {/* Interactive Pupils following cursor */}
              <g
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                  transition: "transform 60ms linear",
                }}
              >
                <ellipse cx="98" cy="108" rx="5.5" ry="7.5" fill="#0B0B0B" />
                <circle cx="100" cy="105" r="2.2" fill="#FFFFFF" />
                <ellipse cx="142" cy="108" rx="5.5" ry="7.5" fill="#0B0B0B" />
                <circle cx="144" cy="105" r="2.2" fill="#FFFFFF" />
              </g>

              {/* Eyebrows */}
              <path
                d="M88 93 Q98 88 107 93"
                stroke="#0B0B0B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M133 93 Q142 88 152 93"
                stroke="#0B0B0B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Smile */}
              <path
                d="M108 130 Q120 139 132 130"
                stroke="#0B0B0B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <span className="mt-1 rounded-pill bg-[var(--accent)] px-3.5 py-1 font-mono text-[10px] font-bold text-[#0B0B0B] shadow-sm">
              ERJIGITOV MIRHAMID • 3D LIVE
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom 4 Specialty Rows with Thin Vertical Dividers */}
      <div className="liquid-glass mt-12 grid grid-cols-1 rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
        {specialties.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className={`py-4 px-5 font-mono text-xs sm:text-sm font-medium text-[var(--ink)] ${
              idx > 0
                ? "sm:border-l border-t sm:border-t-0 border-[var(--line)]/60"
                : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

