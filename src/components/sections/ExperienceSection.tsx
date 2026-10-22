import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { experienceData } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Career Journey"
          badgeVariant="amber"
          title="Track Record of"
          highlightText="Engineering Impact"
          description="A chronological timeline of roles where I drove architectural decisions, engineered high-load platforms, and led technical teams."
        />

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-32 space-y-12">
          {experienceData.map((item) => (
            <div key={item.id} className="relative pl-6 md:pl-10 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-sky-500 group-hover:scale-125 transition-transform" />

              {/* Date pill for desktop */}
              <div className="md:absolute md:-left-36 md:top-0.5 mb-2 md:mb-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.period}
                </span>
              </div>

              {/* Card Container */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-sky-500/30 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </h3>
                    <div className="text-base font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="neutral" size="sm">
                      {item.type}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Achievements List */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Key Outcomes & Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {item.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-2">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
