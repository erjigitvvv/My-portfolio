import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Lock,
  Rss,
  Send,
  ShieldCheck,
} from "lucide-react";
import { getDictionary } from "@/i18n/messages";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Footer with giant poster Marquee, social pills with icons, privacy link, and lang/theme controls
 * (DESIGN_SPEC.md Section 2)
 */
export function Footer({ locale }: { locale: string }) {
  const dict = getDictionary(locale);

  const marqueeItems = [
    locale === "en" ? "OPEN TO WORK *" : "LOYIHALARGA OCHIQ *",
    "AI ENGINEERING *",
    "CYBERSECURITY & PENTEST *",
    "ZERO-TRUST KUBERNETES *",
    "DEVSECOPS *",
    "ERJIGITOV MIRHAMID *",
  ];

  const socialLinks = [
    { label: "GITHUB", href: "https://github.com/mirhamid-erjigitov", icon: Github },
    { label: "LINKEDIN", href: "https://linkedin.com/in/mirhamid-erjigitov", icon: Linkedin },
    { label: "TELEGRAM", href: "https://t.me/mirhamid_erjigitov", icon: Send },
    { label: "RSS", href: "/rss.xml", icon: Rss },
    { label: "ADMIN", href: "/admin", icon: Lock },
  ];

  return (
    <footer className="mt-16 sm:mt-24 border-t border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl">
      {/* Giant Poster Marquee Ticker */}
      <div className="overflow-hidden border-b border-[var(--line)] py-4 sm:py-5">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((text, idx) => (
            <span
              key={idx}
              className="font-poster text-2xl sm:text-5xl font-black tracking-tight text-[var(--ink)]"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 lg:py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* Social Pills with Icons */}
          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="clear-liquid-glass liquid-shimmer-sweep inline-flex items-center gap-2 rounded-pill px-3.5 py-2 font-mono text-xs font-semibold text-[var(--ink)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
                >
                  <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-75" />
                </a>
              );
            })}
          </div>

          {/* Right Controls: Privacy, LangSwitch, ThemeToggle */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              href={`/${locale}/privacy`}
              className="clear-liquid-glass inline-flex items-center gap-1.5 rounded-pill px-3.5 py-2 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>({dict.nav.privacy})</span>
            </Link>
            <LangSwitch locale={locale} />
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-[var(--line)] pt-6 font-mono text-xs text-[var(--muted)] sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Erjigitov Mirhamid — (CLEAR LIQUID GLASS // MINT GRID SYSTEM)
          </span>
          <span>Oʻzbekiston • Tashkent / Remote Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
