"use client";

import React, { useState } from "react";
import { ShieldCheck, Brain, Server, Code2, Sparkles } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { Badge, getCategoryBadgeVariant } from "../ui/Badge";
import { getDictionary, localizeField } from "@/i18n/messages";

export function SkillBars({
  skills,
  locale,
}: {
  skills: Record<string, any>[];
  locale: string;
}) {
  const [activeCat, setActiveCat] = useState("ALL");
  const dict = getDictionary(locale);

  const filtered =
    activeCat === "ALL"
      ? skills
      : skills.filter((s) => s.category.toUpperCase() === activeCat);

  const tabs = [
    { id: "ALL", label: dict.common.all, icon: Sparkles },
    { id: "AI", label: dict.common.ai, icon: Brain },
    { id: "CYBERSECURITY", label: dict.common.cyber, icon: ShieldCheck },
    { id: "DEVOPS", label: dict.common.devops, icon: Server },
    { id: "CORE", label: dict.common.core, icon: Code2 },
  ];

  const getBarColor = (cat: string) => {
    switch (cat.toUpperCase()) {
      case "AI":
        return "from-violet-500 to-fuchsia-400";
      case "CYBERSECURITY":
        return "from-emerald-400 to-teal-300";
      case "DEVOPS":
        return "from-blue-500 to-cyan-400";
      default:
        return "from-amber-400 to-orange-400";
    }
  };

  const getSkillIcon = (cat: string) => {
    switch (cat.toUpperCase()) {
      case "AI":
        return <Brain className="h-5 w-5 text-violet-400" />;
      case "CYBERSECURITY":
        return <ShieldCheck className="h-5 w-5 text-emerald-400" />;
      case "DEVOPS":
        return <Server className="h-5 w-5 text-blue-400" />;
      default:
        return <Code2 className="h-5 w-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeCat === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveCat(t.id)}
              className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 font-mono text-xs font-medium transition-all ${
                active
                  ? "bg-[var(--accent)] text-[#0B0B0B] font-bold shadow-[0_8px_24px_rgba(61,190,116,0.35)] scale-[1.02]"
                  : "clear-liquid-glass text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {filtered.map((skill) => {
          const desc = localizeField(skill, "description", locale);
          const badgeVariant = getCategoryBadgeVariant(skill.category);

          return (
            <GlassCard key={skill.id} variant={badgeVariant} padding="md">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <span className="liquid-icon-badge h-10 w-10 shrink-0 mt-0.5">
                    {getSkillIcon(skill.category)}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {skill.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
                <Badge variant={badgeVariant}>{skill.level}%</Badge>
              </div>

              <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getBarColor(
                    skill.category
                  )} transition-all duration-700`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

