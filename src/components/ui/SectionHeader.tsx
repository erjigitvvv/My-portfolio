import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badgeText: string;
  badgeVariant?: 'cyan' | 'purple' | 'emerald' | 'amber' | 'neutral';
  title: string;
  highlightText?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeVariant = 'cyan',
  title,
  highlightText,
  description,
  align = 'center',
  className = '',
}) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl'
      } ${className}`}
    >
      <div className="mb-4">
        <Badge variant={badgeVariant} dot>
          {badgeText}
        </Badge>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
        {title}{' '}
        {highlightText && (
          <span className="text-gradient">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
