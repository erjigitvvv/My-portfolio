import React from "react";
import Link from "next/link";
import {
  FolderKanban,
  FileText,
  Eye,
  MessageSquare,
  Award,
  Cpu,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { getDashboardStats, getContactMessages } from "@/lib/queries";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [stats, messages] = await Promise.all([
    getDashboardStats(),
    getContactMessages(),
  ]);

  const cards = [
    {
      label: "Total Case Studies",
      value: stats.projectsCount,
      icon: FolderKanban,
      variant: "ai" as const,
      href: "/admin/projects",
    },
    {
      label: "Blog & CTF Posts",
      value: stats.postsCount,
      icon: FileText,
      variant: "cyber" as const,
      href: "/admin/blog",
    },
    {
      label: "Total Content Views",
      value: stats.totalViews,
      icon: Eye,
      variant: "devops" as const,
      href: "/admin/projects",
    },
    {
      label: "Unread Messages",
      value: `${stats.unreadMessagesCount} / ${stats.messagesCount}`,
      icon: MessageSquare,
      variant: "cyber" as const,
      href: "/admin/messages",
    },
    {
      label: "Tech Radar Skills",
      value: stats.skillsCount,
      icon: Cpu,
      variant: "ai" as const,
      href: "/admin/skills",
    },
    {
      label: "Verified Certificates",
      value: stats.certsCount,
      icon: Award,
      variant: "default" as const,
      href: "/admin/certificates",
    },
  ];

  return (
    <div className="space-y-6">
      <GlassCard variant="cyber" className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="live" pulse className="mb-2">
            CMS TELEMETRY // ROOT ACCESS GRANTED
          </Badge>
          <h1 className="text-2xl font-extrabold text-white">
            Portfolio Command Center
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Manage bilingual (UZ / EN) AI, Cybersecurity & DevOps content in real time.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/projects">
            <Button variant="primary" size="sm">
              <Plus className="h-4 w-4" /> New Project
            </Button>
          </Link>
          <Link href="/admin/blog">
            <Button variant="cyber" size="sm">
              <Plus className="h-4 w-4" /> New Blog Post
            </Button>
          </Link>
        </div>
      </GlassCard>

      {/* Stat Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.label} href={c.href}>
              <GlassCard variant={c.variant} className="hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs text-slate-400">{c.label}</p>
                    <p className="mt-1 font-mono text-3xl font-extrabold text-white">
                      {c.value}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>

      {/* Recent Encrypted Messages */}
      <GlassCard variant="default" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h2 className="font-mono text-base font-bold text-white">
              Recent Encrypted Dispatches
            </h2>
          </div>
          <Link
            href="/admin/messages"
            className="font-mono text-xs text-emerald-400 hover:underline"
          >
            Open Inbox →
          </Link>
        </div>

        <div className="space-y-3">
          {messages.slice(0, 4).map((m) => (
            <div
              key={m.id}
              className="rounded-xl border border-white/10 bg-slate-950/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{m.name}</span>
                  <span className="font-mono text-xs text-emerald-400">
                    &lt;{m.email}&gt;
                  </span>
                  <Badge variant={m.isRead ? "default" : "live"}>
                    {m.category}
                  </Badge>
                </div>
                <p className="text-xs font-semibold text-slate-200">{m.subject}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{m.message}</p>
              </div>
              <span className="font-mono text-[11px] text-slate-500 shrink-0">
                {new Date(m.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
