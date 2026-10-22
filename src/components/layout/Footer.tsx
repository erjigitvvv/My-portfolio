import React from 'react';
import { Terminal, Send, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
              {personalInfo.title}. Passionate about building resilient distributed architectures, developer tooling, and modern interactive applications.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#about" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  Experience & Career
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Status & Quick Action */}
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Availability
            </h3>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Ready for Engagement
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                Open to Senior / Lead Full-Stack engineering positions and high-impact contracts.
              </p>
              <a
                href="#contact"
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                Let's discuss &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with React, TypeScript & Tailwind</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-sky-500 dark:hover:text-sky-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
