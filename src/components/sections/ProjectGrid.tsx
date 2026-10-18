"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Cpu,
  Eye,
  Network,
  Brain,
  ShieldCheck,
  Server,
  Layers,
  Zap,
  Hash,
} from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { Badge, getCategoryBadgeVariant } from "../ui/Badge";
import { getDictionary, localizeField } from "@/i18n/messages";

export function ProjectGrid({
  projects,
  locale,
  showFilter = true,
}: {
  projects: Record<string, any>[];
  locale: string;
  showFilter?: boolean;
}) {
  const [filter, setFilter] = useState<string>("ALL");
  const dict = getDictionary(locale);

  const filtered =
    filter === "ALL"
      ? projects
      : projects.filter((p) => p.category.toUpperCase() === filter);

  const categories = [
    { id: "ALL", label: dict.common.all, icon: Layers },
    { id: "AI", label: dict.common.ai, icon: Brain },
    { id: "CYBERSECURITY", label: dict.common.cyber, icon: ShieldCheck },
    { id: "DEVOPS", label: dict.common.devops, icon: Server },
  ];

  const getProjectIcon = (category: string) => {
    const cat = category.toUpperCase();
    if (cat === "AI") return <Brain className="h-5 w-5 text-violet-400" />;
    if (cat === "CYBERSECURITY")
      return <ShieldCheck className="h-5 w-5 text-emerald-400" />;
    if (cat === "DEVOPS") return <Server className="h-5 w-5 text-blue-400" />;
    return <Cpu className="h-5 w-5 text-emerald-400" />;
  };

  return (
    <div className="space-y-6">
      {showFilter && (
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 font-mono text-xs font-medium transition-all ${
                  active
                    ? "bg-[var(--accent)] text-[#0B0B0B] font-bold shadow-[0_8px_24px_rgba(61,190,116,0.35)] scale-[1.02]"
                    : "clear-liquid-glass text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        {filtered.map((project) => {
          const title = localizeField(project, "title", locale);
          const summary = localizeField(project, "summary", locale);
          const arch = localizeField(project, "architecture", locale);
          const variant = getCategoryBadgeVariant(project.category);

          return (
            <GlassCard
              key={project.id}
              variant="interactive"
              className="flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="liquid-icon-badge h-10 w-10">
                      {getProjectIcon(project.category)}
                    </span>
                    <Badge variant={variant}>{project.category}</Badge>
                  </div>
                  <span className="clear-liquid-glass inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-mono text-xs text-[var(--muted)]">
                    <Eye className="h-3.5 w-3.5 text-[var(--accent-text)]" />{" "}
                    {project.views}
                  </span>
                </div>

                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="block group/title"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover/title:text-[var(--accent-text)] transition">
                    {title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {summary}
                </p>

                {/* Architecture Pipeline Preview */}
                {arch && (
                  <div className="rounded-2xl border border-white/15 bg-slate-950/75 p-3 font-mono text-[11px] text-emerald-300">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Network className="h-3.5 w-3.5 text-violet-400" />
                      <span>{dict.common.architecture}:</span>
                    </div>
                    <p className="leading-relaxed break-words">{arch}</p>
                  </div>
                )}

                {/* Impact Metrics */}
                {project.metrics && (
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.split("|").map((m: string) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-300"
                      >
                        <Zap className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>{m.trim()}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)]/50 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.split(",").map((tag: string) => (
                    <span
                      key={tag}
                      className="clear-liquid-glass inline-flex items-center gap-0.5 rounded-lg px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-[var(--muted)]"
                    >
                      <Hash className="h-2.5 w-2.5 text-[var(--accent-text)]" />
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent-text)] hover:underline"
                  >
                    <span>{dict.common.readMore}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Repository"
                        className="liquid-icon-badge h-9 w-9 text-[var(--ink)]"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live Demo"
                        className="liquid-icon-badge h-9 w-9 text-[var(--accent-text)]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

