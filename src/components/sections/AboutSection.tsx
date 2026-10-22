import React from 'react';
import { Zap, ShieldCheck, Sparkles, Users, Award, Clock, MapPin, Terminal } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { corePhilosophy } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Zap: <Zap className="w-5 h-5 text-amber-500" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    Sparkles: <Sparkles className="w-5 h-5 text-sky-500" />,
    Users: <Users className="w-5 h-5 text-purple-500" />,
  };

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="About Me"
          badgeVariant="purple"
          title="Bridging Architectural Rigor with"
          highlightText="Creative Execution"
          description="A look inside my approach to software engineering, leadership, and system design."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Engineering with empathy, speed, and precision.
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-4">
                Over the past 5+ years, I have navigated through the full lifecycle of modern web products — from early architecture and rapid prototyping to optimizing high-throughput distributed microservices handling millions of events.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-6">
                I believe software engineering is not just about writing code; it is about building reliable, maintainable platforms that empower businesses and delight users. Whether tuning a Postgres query execution plan or crafting fluid UI interactions in React 19, my goal is always uncompromising quality.
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Location</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Tashkent, Uzbekistan
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Experience</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      5+ Years Active
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Completed Works</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      35+ Production Deployments
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Core Specialty</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Full-Stack & Cloud Architecture
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Philosophy Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corePhilosophy.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl hover:border-sky-500/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[item.icon]}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
