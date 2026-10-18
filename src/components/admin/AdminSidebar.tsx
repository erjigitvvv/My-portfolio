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
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-6 rounded-2xl border border-white/15 bg-slate-900/75 p-4 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/15">
              <Shield className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold text-white">
                ROOT COMMAND
              </p>
              <p className="font-mono text-[10px] text-emerald-400">
                CMS // SECOPS
              </p>
            </div>
          </div>
          <Link
            href="/uz"
            className="rounded-lg border border-white/10 p-1.5 text-slate-400 hover:text-white"
            title="View Public Site"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <nav className="space-y-1">
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
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 font-mono text-xs transition ${
                  active
                    ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/35 font-semibold"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 font-mono text-xs text-rose-300 transition hover:bg-rose-500/20"
          >
            <LogOut className="h-4 w-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
