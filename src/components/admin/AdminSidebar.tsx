"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Cpu,
  Award,
  Package,
  Mic,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
  ExternalLink,
} from "lucide-react";
import { logoutAdminAction } from "@/lib/actions";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects (Case Studies)", icon: FolderKanban },
    { href: "/admin/blog", label: "Blog & CTF Write-ups", icon: FileText },
    { href: "/admin/skills", label: "Skills & Tech Radar", icon: Cpu },
    { href: "/admin/certificates", label: "Certificates", icon: Award },
    { href: "/admin/resources", label: "Resources & Tools", icon: Package },
    { href: "/admin/speaking", label: "Speaking & Talks", icon: Mic },
    { href: "/admin/messages", label: "Encrypted Messages", icon: MessageSquare },
    { href: "/admin/settings", label: "Profile & PGP Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="sticky top-6 clay-card p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/15 text-[var(--accent-text)]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold text-[var(--ink)]">
                ROOT COMMAND
              </p>
              <p className="font-mono text-[10px] text-[var(--accent-text)]">
                CMS // SECOPS
              </p>
            </div>
          </div>
          <Link
            href="/uz"
            className="liquid-icon-badge h-9 w-9 text-[var(--ink)]"
            title="View Public Site"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <nav className="space-y-1.5">
          {links.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 font-mono text-xs transition-all ${
                  active
                    ? "bg-[var(--accent)] font-bold text-[#0B0B0B] shadow-[0_8px_20px_rgba(61,190,116,0.35)] scale-[1.02]"
                    : "text-[var(--ink)] hover:bg-[var(--ink)]/5"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-xl ${
                    active ? "bg-[#0B0B0B]/15 text-[#0B0B0B]" : "liquid-icon-badge text-[var(--accent-text)]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--line)]/60 pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 font-mono text-xs font-semibold text-rose-500 dark:text-rose-300 transition hover:bg-rose-500/20"
          >
            <LogOut className="h-4 w-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
