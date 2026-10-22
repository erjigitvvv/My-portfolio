import React from "react";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Building2,
} from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { localizeField } from "@/i18n/messages";

export function Timeline({
  experiences,
  locale,
}: {
  experiences: Record<string, any>[];
  locale: string;
}) {
  return (
    <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-4 sm:before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:via-violet-500 before:to-blue-500">
      {experiences.map((exp) => {
        const role = localizeField(exp, "role", locale);
        const desc = localizeField(exp, "description", locale);
        const isWork = exp.type === "WORK";

        return (
          <div key={exp.id} className="relative pl-12 sm:pl-16">
            {/* Timeline Clear Liquid Glass Node Icon */}
            <div className="liquid-icon-badge absolute left-0 sm:left-1.5 top-1 h-9 w-9 sm:h-10 sm:w-10">
              {isWork ? (
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
              ) : (
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-violet-400" />
              )}
            </div>

            <GlassCard variant={isWork ? "cyber" : "ai"} padding="md">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {role}
                  </h3>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{exp.company}</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {exp.current && (
                    <Badge variant="live" pulse>
                      CURRENT
                    </Badge>
                  )}
                  <span className="spatial-ornament inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[11px] text-[var(--muted)]">
                    <Calendar className="h-3 w-3 text-[var(--accent-text)]" />{" "}
                    {exp.period}
                  </span>
                  <span className="spatial-ornament inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[11px] text-[var(--muted)]">
                    <MapPin className="h-3 w-3 text-violet-400" /> {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.split(",").map((tech: string) => (
                  <span
                    key={tech}
                    className="spatial-glass rounded-lg px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] text-[var(--ink)]"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        );
      })}
    </div>
  );
}

