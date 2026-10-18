"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Compass,
  Layers,
  ShieldCheck,
  Terminal,
  Sparkles,
  ChevronRight,
  Lock,
  ArrowUpRight,
  Home,
  UserCheck,
  Cpu,
  FolderGit2,
  BookOpen,
  Award,
  Package,
  Mic,
  Send,
  Activity,
  Boxes,
  Briefcase,
  FileCode2,
  Mail,
} from "lucide-react";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { getDictionary } from "@/i18n/messages";

/**
 * Compute dynamic 01/12 page counter and section label from pathname
 * (DESIGN_SPEC.md Section 1.1 & 2)
 */
function getPageCounterInfo(pathname: string, locale: string) {
  const clean = pathname.replace(`/${locale}`, "") || "/";
  if (clean === "/") return { count: "01/12", label: "PORTFOLIO" };
  if (clean.startsWith("/about")) return { count: "02/12", label: "ABOUT" };
  if (clean.startsWith("/skills")) return { count: "03/12", label: "SKILLS" };
  if (clean === "/projects") return { count: "04/12", label: "PROJECTS" };
  if (clean.startsWith("/projects/")) return { count: "05/12", label: "CASE STUDY" };
  if (clean === "/blog") return { count: "06/12", label: "BLOG" };
  if (clean.startsWith("/blog/")) return { count: "07/12", label: "ARTICLE" };
  if (clean.startsWith("/certificates")) return { count: "08/12", label: "CERTIFICATES" };
  if (clean.startsWith("/resources")) return { count: "09/12", label: "RESOURCES" };
  if (clean.startsWith("/speaking")) return { count: "10/12", label: "SPEAKING" };
  if (clean.startsWith("/contact")) return { count: "11/12", label: "CONTACT" };
  if (clean.startsWith("/privacy")) return { count: "12/12", label: "PRIVACY" };
  return { count: "01/12", label: "PORTFOLIO" };
}

export function Header({ locale }: { locale: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const dict = getDictionary(locale);
  const { count, label } = getPageCounterInfo(pathname, locale);
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home, id: "home", icon: Home },
    { href: `/${locale}/about`, label: dict.nav.about, id: "about", icon: UserCheck },
    { href: `/${locale}/skills`, label: dict.nav.skills, id: "skills", icon: Cpu },
    { href: `/${locale}/projects`, label: dict.nav.projects, id: "projects", icon: FolderGit2 },
    { href: `/${locale}/blog`, label: dict.nav.blog, id: "blog", icon: BookOpen },
    { href: `/${locale}/certificates`, label: dict.nav.certificates, id: "certificates", icon: Award },
    { href: `/${locale}/resources`, label: dict.nav.resources, id: "resources", icon: Package },
    { href: `/${locale}/speaking`, label: dict.nav.speaking, id: "speaking", icon: Mic },
    { href: `/${locale}/contact`, label: dict.nav.contact, id: "contact", icon: Send },
    { href: `/${locale}/privacy`, label: dict.nav.privacy, id: "privacy", icon: ShieldCheck },
  ];

  const scrollSections = [
    {
      hash: "#hero",
      label: locale === "en" ? "01. Hero Poster & 3D Avatar" : "01. Hero Poster va 3D Avatar",
      icon: Sparkles,
      color: "text-emerald-400",
    },
    {
      hash: "#telemetry",
      label: locale === "en" ? "02. Live Security Telemetry" : "02. Jonli Kiber-Telemetriya",
      icon: Activity,
      color: "text-cyan-400",
    },
    {
      hash: "#projects",
      label: locale === "en" ? "03. Featured Case Studies" : "03. Tanlangan Loyihalar",
      icon: Boxes,
      color: "text-violet-400",
    },
    {
      hash: "#skills",
      label: locale === "en" ? "04. Technical Arsenal" : "04. Texnik Koʻnikmalar",
      icon: Cpu,
      color: "text-blue-400",
    },
    {
      hash: "#timeline",
      label: locale === "en" ? "05. Experience Timeline" : "05. Tajriba va Taʼlim",
      icon: Briefcase,
      color: "text-amber-400",
    },
    {
      hash: "#blog",
      label: locale === "en" ? "06. Research & CTF Writeups" : "06. Maqolalar va CTF Tahlillar",
      icon: FileCode2,
      color: "text-rose-400",
    },
    {
      hash: "#contact",
      label: locale === "en" ? "07. Direct Contact CTA" : "07. Bogʻlanish Boʻlimi",
      icon: Mail,
      color: "text-emerald-400",
    },
  ];

  const mobileDockItems = [
    { href: `/${locale}`, label: dict.nav.home, icon: Home },
    { href: `/${locale}/projects`, label: dict.nav.projects, icon: FolderGit2 },
    { href: `/${locale}/skills`, label: dict.nav.skills, icon: Cpu },
    { href: `/${locale}/blog`, label: dict.nav.blog, icon: BookOpen },
    { href: `/${locale}/contact`, label: dict.nav.contact, icon: Send },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return isHomePage;
    return pathname.startsWith(href);
  };

  const handleSectionScroll = (hash: string) => {
    setDrawerOpen(false);
    if (isHomePage) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push(`/${locale}${hash}`);
  };

  return (
    <>
      {/* Top-Left Clear Liquid Glass Trigger Bar (Responsive across Mobile, Tablet, Desktop) */}
      <header className="fixed top-3.5 left-3.5 right-3.5 sm:right-auto z-40 flex items-center justify-between sm:justify-start gap-2.5 pointer-events-none">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open left navigation drawer"
          className="clear-liquid-glass liquid-card-sheen pointer-events-auto group flex items-center gap-2.5 sm:gap-3 rounded-pill px-3.5 sm:px-4 py-2 sm:py-2.5 font-mono text-xs font-semibold text-[var(--ink)] transition-all duration-300 hover:scale-[1.03] hover:border-[var(--accent)]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-[#0B0B0B] shadow-sm transition-transform duration-300 group-hover:rotate-90">
            <Menu className="h-4 w-4" />
          </span>
          <span className="font-bold tracking-wider">MENU</span>
          <span className="h-3.5 w-[1px] bg-[var(--line)]" />
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-bold">{count}</span>
            <span className="hidden xs:inline text-[var(--muted)]">({label})</span>
          </span>
        </button>

        <Link
          href={`/${locale}`}
          aria-label="Erjigitov Mirhamid Home"
          className="clear-liquid-glass liquid-card-sheen pointer-events-auto inline-flex items-center gap-2 rounded-pill px-3 sm:px-3.5 py-2 font-mono text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--accent)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] font-poster text-[10px] font-black text-[#0B0B0B]">
            EM
          </span>
          <span className="hidden sm:inline tracking-tight">Erjigitov Mirhamid</span>
        </Link>
      </header>

      {/* Subtle Left-Edge Quick Pull Tab on Desktop */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu from left edge"
        className="clear-liquid-glass fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-1.5 rounded-r-2xl border-l-0 px-2.5 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] transition-all hover:px-4 hover:text-[var(--ink)] lg:flex"
        style={{ writingMode: "vertical-rl" }}
      >
        <span>☰ MENU • BOʻLIMLAR</span>
      </button>

      {/* Mobile & Tablet Floating Clear Liquid Glass Bottom Dock */}
      <nav
        aria-label="Mobile Quick Navigation Dock"
        className="clear-liquid-glass liquid-card-sheen fixed bottom-3 inset-x-3 z-40 mx-auto flex max-w-md items-center justify-around rounded-pill px-2 py-1.5 shadow-2xl lg:hidden"
      >
        {mobileDockItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-pill px-3 py-1.5 font-mono text-[10px] transition-all ${
                active
                  ? "bg-[var(--accent)] font-bold text-[#0B0B0B] shadow-sm scale-105"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="truncate max-w-[56px]">{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open full drawer menu"
          className="flex flex-col items-center justify-center gap-0.5 rounded-pill px-3 py-1.5 font-mono text-[10px] text-[var(--ink)] hover:text-[var(--accent-text)]"
        >
          <Menu className="h-4 w-4 text-[var(--accent-text)]" />
          <span>{locale === "en" ? "More" : "Barchasi"}</span>
        </button>
      </nav>

      {/* Left-Side Clear Liquid Glass Collapsible Drawer + Backdrop */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Frosted Backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm"
            />

            {/* Left Clear Liquid Glass Drawer */}
            <motion.aside
              key="left-drawer"
              initial={{ x: "-100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              aria-label="Left Navigation Drawer"
              className="clear-liquid-glass liquid-card-sheen fixed top-0 left-0 bottom-0 z-50 flex w-[90vw] max-w-[400px] flex-col justify-between overflow-y-auto border-r border-[var(--glass-border)] p-5 sm:p-6 shadow-2xl"
            >
              {/* Top Profile Header inside Drawer */}
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-[var(--line)]/60 pb-4">
                  <Link
                    href={`/${locale}`}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] font-poster text-base font-black text-[#0B0B0B] shadow-md">
                      EM
                    </div>
                    <div>
                      <p className="font-poster text-sm sm:text-base font-black tracking-tight text-[var(--ink)]">
                        ERJIGITOV MIRHAMID
                      </p>
                      <p className="font-mono text-[11px] text-[var(--muted)]">
                        AI • Cybersecurity • DevOps
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Close navigation menu"
                    className="liquid-icon-badge h-10 w-10 rounded-full text-[var(--ink)] transition hover:rotate-90 hover:bg-[var(--accent)] hover:text-[#0B0B0B]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Section 1: All Pages (Navlinks with Matching Icons) */}
                <div className="mt-5">
                  <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Compass className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                      {locale === "en" ? "(ALL PAGES)" : "(BARCHA SAHIFALAR)"}
                    </span>
                    <span>{count}</span>
                  </div>

                  <nav className="grid grid-cols-1 gap-1.5">
                    {navItems.map((item, idx) => {
                      const active = isActive(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          data-nav-item={item.id}
                          onClick={() => setDrawerOpen(false)}
                          className={`group flex items-center justify-between rounded-2xl px-3 py-2 font-mono text-xs transition-all ${
                            active
                              ? "bg-[var(--accent)] font-bold text-[#0B0B0B] shadow-sm"
                              : "text-[var(--ink)] hover:bg-[var(--ink)]/5"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${
                                active
                                  ? "bg-[#0B0B0B]/15 text-[#0B0B0B]"
                                  : "liquid-icon-badge text-[var(--accent-text)]"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="flex flex-col">
                              <span className="font-semibold tracking-tight">
                                {item.label}
                              </span>
                              <span
                                className={`text-[9px] ${
                                  active ? "text-[#0B0B0B]/70" : "text-[var(--muted)]"
                                }`}
                              >
                                PAGE {String(idx + 1).padStart(2, "0")}/10
                              </span>
                            </span>
                          </span>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                              active ? "text-[#0B0B0B]" : "text-[var(--muted)]"
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Section 2: Quick Scroll Sections (Bo'limlar with Matching Icons) */}
                <div className="mt-6 border-t border-[var(--line)]/60 pt-5">
                  <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                      {locale === "en"
                        ? "(PAGE SECTIONS • SCROLL)"
                        : "(SAHIFA BOʻLIMLARI • SCROLL)"}
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {scrollSections.map((sec) => {
                      const SecIcon = sec.icon;
                      return (
                        <button
                          key={sec.hash}
                          type="button"
                          onClick={() => handleSectionScroll(sec.hash)}
                          className="group flex items-center justify-between rounded-xl px-2.5 py-2 text-left font-mono text-xs text-[var(--muted)] transition hover:bg-[var(--ink)]/5 hover:text-[var(--ink)]"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="liquid-icon-badge flex h-7 w-7 items-center justify-center rounded-lg">
                              <SecIcon className={`h-3.5 w-3.5 ${sec.color}`} />
                            </span>
                            <span>{sec.label}</span>
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 3: Hidden Navbar Buttons (LangSwitch, ThemeToggle, Admin, AI Command) */}
              <div className="mt-6 border-t border-[var(--line)]/60 pt-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                  {locale === "en"
                    ? "(CONTROLS & SYSTEM BUTTONS)"
                    : "(BOSHQARUV TUGMALARI)"}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <LangSwitch locale={locale} />
                  <ThemeToggle />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/admin"
                    onClick={() => setDrawerOpen(false)}
                    className="clear-liquid-glass flex items-center justify-center gap-1.5 rounded-pill px-3 py-2.5 font-mono text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--accent)]"
                  >
                    <Lock className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                    <span>Admin CMS</span>
                  </Link>

                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-pill bg-[var(--accent)] px-3 py-2.5 font-mono text-xs font-bold text-[#0B0B0B] transition hover:brightness-105"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{locale === "en" ? "Hire Me" : "Bogʻlanish"}</span>
                  </Link>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[var(--ink)]/5 px-3.5 py-2 font-mono text-[11px] text-[var(--muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                    <span>AI Command Terminal</span>
                  </span>
                  <kbd className="rounded bg-[var(--bg)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--ink)]">
                    Ctrl + K
                  </kbd>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


