import React, { useState } from 'react';
import { ArrowRight, Send, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { personalInfo, statsData } from '../../data/portfolioData';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { GithubIcon } from '../ui/Icons';

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'stack' | 'metrics'>('terminal');
  const { copied, copy } = useCopyToClipboard();

  const terminalCode = `// Erjigit's Runtime Environment
const engineer = {
  name: "${personalInfo.name}",
  role: "Senior Full-Stack & Systems Architect",
  expertise: ["Distributed Systems", "Cloud Edge", "Reactive UI"],
  uptimeRecord: "${personalInfo.uptimeRecord}",
  stack: ["TypeScript", "React", "Go", "Next.js", "Docker", "Kafka"],
  status: "Available for high-impact challenges"
};

await engineer.buildNextGenerationPlatform();`;

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glows */}
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="mb-4">
              <Badge variant="cyan" dot>
                {personalInfo.status}
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
              Engineering{' '}
              <span className="text-gradient">resilient systems</span> & modern reactive web platforms.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed font-normal">
              Hi, I'm <strong className="text-slate-900 dark:text-white font-semibold">{personalInfo.name}</strong> — a Senior Full-Stack Engineer & Solutions Architect with 5+ years of experience transforming complex technical problems into high-performance, fault-tolerant products.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                View Projects
              </Button>

              <Button
                variant="outline"
                size="lg"
                href="#contact"
                icon={<Send className="w-4 h-4" />}
              >
                Get in Touch
              </Button>

              <Button
                variant="ghost"
                size="lg"
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                icon={<GithubIcon className="w-5 h-5" />}
              >
                GitHub
              </Button>
            </div>

            {/* Quick Micro-stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full">
              {statsData.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-sky-500/30 via-purple-500/20 to-transparent shadow-2xl">
              <div className="rounded-2xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-800 overflow-hidden shadow-2xl">
                {/* Window header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/95 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setActiveTab('terminal')}
                      className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors cursor-pointer ${
                        activeTab === 'terminal'
                          ? 'bg-slate-800 text-sky-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      engineer.ts
                    </button>
                    <button
                      onClick={() => setActiveTab('stack')}
                      className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors cursor-pointer ${
                        activeTab === 'stack'
                          ? 'bg-slate-800 text-purple-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      stack.env
                    </button>
                    <button
                      onClick={() => setActiveTab('metrics')}
                      className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors cursor-pointer ${
                        activeTab === 'metrics'
                          ? 'bg-slate-800 text-emerald-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      telemetry
                    </button>
                  </div>

                  {/* Copy snippet button */}
                  <button
                    onClick={() => copy(terminalCode)}
                    aria-label="Copy code snippet"
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Window content */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[300px]">
                  {activeTab === 'terminal' && (
                    <div className="text-slate-300 space-y-2">
                      <div className="text-slate-500">// Erjigit's Runtime Environment</div>
                      <div>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-sky-300">engineer</span> = &#123;
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">name:</span>{' '}
                        <span className="text-emerald-300">"{personalInfo.name}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">role:</span>{' '}
                        <span className="text-emerald-300">"Senior Full-Stack & Architect"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">experience:</span>{' '}
                        <span className="text-amber-300">"{personalInfo.yearsOfExperience}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">focus:</span> [
                        <span className="text-emerald-300">"Microservices"</span>,{' '}
                        <span className="text-emerald-300">"React 19"</span>,{' '}
                        <span className="text-emerald-300">"Go"</span>],
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">uptime:</span>{' '}
                        <span className="text-amber-300">"{personalInfo.uptimeRecord}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">location:</span>{' '}
                        <span className="text-emerald-300">"Tashkent / Remote"</span>
                      </div>
                      <div>&#125;;</div>
                      <div className="pt-2 text-sky-400 flex items-center gap-1.5">
                        <span className="animate-pulse">❯</span>
                        <span>await engineer.deployInnovation();</span>
                      </div>
                      <div className="text-emerald-400 text-xs mt-1">
                        ✔ Ready for high-velocity engineering
                      </div>
                    </div>
                  )}

                  {activeTab === 'stack' && (
                    <div className="text-slate-300 space-y-2">
                      <div className="text-slate-500"># Core Production Stack</div>
                      <div><span className="text-sky-400">FRONTEND</span>=React 19, TypeScript, Next.js, Tailwind</div>
                      <div><span className="text-purple-400">BACKEND</span>=Node.js, Go (Golang), FastAPI, NestJS</div>
                      <div><span className="text-emerald-400">DATA</span>=PostgreSQL, Redis, ClickHouse, Kafka</div>
                      <div><span className="text-amber-400">INFRA</span>=Docker, AWS, Kubernetes, GitHub Actions</div>
                      <div><span className="text-rose-400">PARADIGM</span>=Zero-Trust, Event-Driven, Atomic UI</div>
                      <div className="pt-4 text-slate-500"># Ready for automated deployments</div>
                    </div>
                  )}

                  {activeTab === 'metrics' && (
                    <div className="text-slate-300 space-y-3">
                      <div className="text-slate-500">// Operational Telemetry</div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">API Availability</span>
                          <span className="text-emerald-400 font-bold">99.98%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '99.9%' }} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Code Quality & Type Coverage</span>
                          <span className="text-sky-400 font-bold">98%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '98%' }} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Test & CI/CD Pass Rate</span>
                          <span className="text-purple-400 font-bold">100%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Window footer */}
                <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>status: active</span>
                  </div>
                  <span>branch: main</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
