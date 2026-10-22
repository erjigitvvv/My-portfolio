import React, { useState } from 'react';
import { ExternalLink, Star, Activity, X } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { projectsData } from '../../data/portfolioData';
import type { Project } from '../../types/portfolio';
import { GithubIcon } from '../ui/Icons';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI & Systems' },
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Featured Works"
          badgeVariant="cyan"
          title="Architected with Precision &"
          highlightText="Shipped to Scale"
          description="A selection of high-impact platforms, open-source tools, and enterprise systems built with modern engineering standards."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                  : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between hover:border-sky-500/40 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Visual Header / Gradient Accent */}
                <div className={`h-32 bg-gradient-to-r ${project.imageGradient} p-5 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/90 bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                      {project.category}
                    </span>
                    {project.stars && (
                      <span className="flex items-center gap-1 text-xs text-white/90 font-mono bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        {project.stars}
                      </span>
                    )}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white group-hover:translate-x-1 transition-transform">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2">
                    {project.tagline}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Operational Metric Badge */}
                  {project.metrics && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-4 font-mono">
                      <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{project.metrics}</span>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Architecture Details &rarr;
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repo for ${project.title}`}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo for ${project.title}`}
                      className="p-2 rounded-lg text-slate-500 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Deep Architecture Inspection */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass-panel max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className={`p-6 bg-gradient-to-r ${selectedProject.imageGradient} text-white flex items-center justify-between`}>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold mt-2">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider mb-2">
                    System Architecture & Design Decisions
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {selectedProject.metrics && (
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-xs font-mono text-slate-500 mb-1">Key Performance Metric</div>
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {selectedProject.metrics}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider mb-3">
                    Technology & Protocols
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <Button
                    variant="outline"
                    href={selectedProject.githubUrl}
                    target="_blank"
                    icon={<GithubIcon className="w-4 h-4" />}
                  >
                    View Source Code
                  </Button>

                  {selectedProject.liveUrl && (
                    <Button
                      variant="primary"
                      href={selectedProject.liveUrl}
                      target="_blank"
                      icon={<ExternalLink className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Visit Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
