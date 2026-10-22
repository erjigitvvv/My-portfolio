import React, { useState } from 'react';
import { Layout, Server, Database, Cloud, Search, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { skillCategories } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    frontend: <Layout className="w-4 h-4" />,
    backend: <Server className="w-4 h-4" />,
    database: <Database className="w-4 h-4" />,
    devops: <Cloud className="w-4 h-4" />,
  };

  // Filter skills based on category and search query
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, categoryId: cat.id, categoryName: cat.name }))
  );

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.categoryId === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Technical Skills"
          badgeVariant="emerald"
          title="Mastered Technologies &"
          highlightText="Production Arsenal"
          description="A comprehensive view of my engineering toolbox refined across 5+ years of shipping mission-critical software."
        />

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-panel w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              All Skills ({allSkills.length})
            </button>

            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technology..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="glass-panel p-5 rounded-2xl hover:border-sky-500/30 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    {skill.name}
                  </span>
                  {skill.featured && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
                      <Sparkles className="w-2.5 h-2.5" />
                      Core
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {skill.experience}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>{skill.categoryName}</span>
                <span>{skill.level}% proficiency</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            No technologies found matching "{searchQuery}". Try another keyword.
          </div>
        )}
      </div>
    </section>
  );
};
