"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Server, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { DoodleArrow, SparkleSticker } from "../ui/Stickers";
import { getDictionary, localizeField } from "@/i18n/messages";

/**
 * Prestige visionOS Spatial UI Hero.
 * Features 3D Hologram Avatar on the right side and live telemetry.
 */
export function Hero({
  profile,
  locale,
}: {
  profile: Record<string, any>;
  locale: string;
}) {
  const dict = getDictionary(locale);

  const heroLine1 = localizeField(profile, "heroLine1", locale);
  const heroLine2 = localizeField(profile, "heroLine2", locale);
  const availability = localizeField(profile, "availability", locale);
  const rolePill = localizeField(profile, "rolePill", locale);
  const bio = localizeField(profile, "bio", locale);

  return (
    <section id="hero" className="relative scroll-mt-24 min-h-[90vh] lg:min-h-screen flex flex-col justify-center py-20 lg:py-28 overflow-visible">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 relative z-10 overflow-visible">
        {/* Left Column: Poster Typography & CTA */}
        <div className="space-y-8 lg:col-span-7 overflow-visible">
          {/* Giant Uppercase Poster Display Lines with clamp() */}
          <div className="space-y-1">
            <h1
              className="font-poster font-black text-[var(--ink)] tracking-tight leading-none select-none"
              style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.8rem)" }}
            >
              <span className="block">{heroLine1}</span>
              <span className="block">
                {heroLine2.replace("*", "")}
                {heroLine2.includes("*") && (
                  <span className="text-[var(--accent-text)]">*</span>
                )}
              </span>
            </h1>
          </div>

          {/* Green Status Pill + Role Pill + Doodle Arrow & Sticker */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {availability && (
              <Badge variant="accent" pulse className="px-4 py-1.5 text-xs sm:text-sm">
                {availability}
              </Badge>
            )}
            {rolePill && (
              <Badge variant="default" className="px-4 py-1.5 text-xs sm:text-sm">
                {rolePill}
              </Badge>
            )}
            <DoodleArrow className="hidden sm:block" />
            <SparkleSticker label={profile.name} variant="peach" />
          </div>

          <p className="max-w-xl text-base sm:text-lg text-[var(--muted)] leading-relaxed">
            {bio}
          </p>

          {/* Primary CTA Button */}
          <div className="relative inline-block pt-3 pb-8 pr-8 overflow-visible">
            <div
              className="absolute inset-x-2 bottom-4 top-4 rounded-full bg-[var(--accent)]/30 blur-xl pointer-events-none transition-all duration-300"
              aria-hidden="true"
            />
            <Link href={`/${locale}/projects`}>
              <Button variant="primary" size="lg" className="clay-btn-primary group relative">
                <span>{dict.hero.ctaProjects}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Spatial Telemetry Glass Monitor */}
        <div className="lg:col-span-5 flex flex-col justify-center overflow-visible">
          <GlassCard
            variant="spatial"
            glow
            magnetic
            padding="lg"
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4">
              <span className="font-mono text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
                SYSTEM TELEMETRY // SPATIAL NODE
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-[var(--accent-text)] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                ONLINE
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[var(--muted)]">
                  <Server className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Cluster
                </span>
                <span className="font-bold text-[var(--ink)]">
                  k8s-prod-us-east
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[var(--muted)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Zero-Trust
                </span>
                <span className="font-bold text-[var(--ink)]">
                  mTLS / eBPF Active
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[var(--muted)]">
                  <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Latency
                </span>
                <span className="font-bold text-[var(--accent-text)]">
                  12ms
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">SLA Uptime</span>
                <span className="font-bold text-[var(--ink)]">
                  99.99%
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--line)]/40">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-text)] hover:underline"
              >
                <span>Read Full Engineering Dossier →</span>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
