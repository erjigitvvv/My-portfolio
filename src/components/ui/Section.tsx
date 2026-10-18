import React from "react";
import { BracketLabel } from "./Stickers";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  index?: string;
  tag: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function Section({
  index,
  tag,
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-12 border-t border-[var(--line)]", className)}
      {...props}
    >
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {index && (
              <span className="font-mono text-xs font-bold text-[var(--accent-text)]">
                {index}
              </span>
            )}
            <BracketLabel>{tag}</BracketLabel>
          </div>
          <h2 className="font-poster text-3xl font-black text-[var(--ink)] sm:text-5xl">
            {title}
            <span className="text-[var(--accent-text)]">*</span>
          </h2>
          {subtitle && (
            <p className="max-w-2xl text-sm text-[var(--muted)]">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      {children}
    </section>
  );
}
