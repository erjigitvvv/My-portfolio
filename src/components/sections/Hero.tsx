"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { BracketLabel, DoodleArrow, SparkleSticker } from "../ui/Stickers";
import { CyborgAvatarRig } from "./CyborgAvatarRig";
import { getDictionary, localizeField } from "@/i18n/messages";

/**
 * Poster-style Hero Header section over the perspective room grid + Multi-Layer 3D Cyborg Avatar Rig
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
              style={{ fontSize: "clamp(2.5rem, 6.8vw, 6rem)" }}
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

        {/* Right Column: Extracted Multi-Layer 3D Cyborg Avatar Rig */}
        <div className="relative flex items-center justify-center lg:col-span-5">
          <CyborgAvatarRig locale={locale} />
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

