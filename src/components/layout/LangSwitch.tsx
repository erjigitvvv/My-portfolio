"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LangSwitch({ locale }: { locale: string }) {
  const pathname = usePathname() || "/uz";
  const segments = pathname.split("/");

  const buildPath = (targetLocale: string) => {
    if (segments[1] === "uz" || segments[1] === "en") {
      const copy = [...segments];
      copy[1] = targetLocale;
      return copy.join("/") || `/${targetLocale}`;
    }
    return `/${targetLocale}${pathname}`;
  };

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="glass-surface inline-flex items-center rounded-pill p-0.5 font-mono text-xs"
    >
      <Link
        href={buildPath("uz")}
        className={`rounded-pill px-2.5 py-1 transition ${
          locale === "uz"
            ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold"
            : "text-[var(--muted)] hover:text-[var(--ink)]"
        }`}
      >
        UZ
      </Link>
      <span className="text-[var(--line)] px-0.5">|</span>
      <Link
        href={buildPath("en")}
        className={`rounded-pill px-2.5 py-1 transition ${
          locale === "en"
            ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold"
            : "text-[var(--muted)] hover:text-[var(--ink)]"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
