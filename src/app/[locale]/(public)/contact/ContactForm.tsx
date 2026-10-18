"use client";

import React, { useState } from "react";
import { Send, Lock, CheckCircle2, AlertTriangle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/messages";

export function ContactForm({ locale }: { locale: string }) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [encrypted, setEncrypted] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      category: String(formData.get("category") || "PROJECT"),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      encrypted,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Xatolik yuz berdi");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setErrorMsg("Server bilan ulanishda xatolik");
    }
  };

  return (
    <GlassCard variant="cyber" padding="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-slate-300">
              {locale === "en" ? "Your Name / Organization *" : "Ismingiz yoki Kompaniya *"}
            </label>
            <input
              name="name"
              required
              placeholder="Alex Mercer // CTO"
              className="w-full rounded-xl border border-white/15 bg-slate-950/65 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-slate-300">
              {locale === "en" ? "Work Email *" : "Email manzilingiz *"}
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="security@company.io"
              className="w-full rounded-xl border border-white/15 bg-slate-950/65 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-slate-300">
              {locale === "en" ? "Inquiry Domain" : "Murojaat Yo'nalishi"}
            </label>
            <select
              name="category"
              className="w-full rounded-xl border border-white/15 bg-slate-950/85 px-4 py-2.5 text-sm text-white focus:border-emerald-400 focus:outline-none"
            >
              <option value="PROJECT">AI / DevOps Architecture Project</option>
              <option value="SECURITY_AUDIT">Cybersecurity Audit & Pentesting</option>
              <option value="AI_CONSULTING">Enterprise LLM & RAG Consulting</option>
              <option value="SPEAKING">Conference Keynote / Workshop</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-slate-300">
              {locale === "en" ? "Subject *" : "Mavzu *"}
            </label>
            <input
              name="subject"
              required
              placeholder="Zero-Trust K8s & RAG Deployment"
              className="w-full rounded-xl border border-white/15 bg-slate-950/65 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-mono text-xs text-slate-300">
            {locale === "en"
              ? "Message or PGP Encrypted Block *"
              : "Xabar matni yoki PGP shifrlangan blok *"}
          </label>
          <textarea
            name="message"
            rows={5}
            required
            placeholder={
              locale === "en"
                ? "Describe your architecture goals, timeline, or paste a PGP-signed message..."
                : "Loyiha maqsadi, muddati yoki texnik talablarni yozing..."
            }
            className="w-full rounded-xl border border-white/15 bg-slate-950/65 p-4 font-mono text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <label className="flex cursor-pointer items-center gap-2 font-mono text-xs text-emerald-300">
            <input
              type="checkbox"
              checked={encrypted}
              onChange={(e) => setEncrypted(e.target.checked)}
              className="rounded border-emerald-400 bg-slate-900 text-emerald-400"
            />
            <Lock className="h-3.5 w-3.5" />
            <span>Zero-Trust TLS + Telegram Instant Dispatch</span>
          </label>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === "loading"}
          >
            <Send className="h-4 w-4" />
            <span>
              {status === "loading" ? dict.common.sending : dict.common.send}
            </span>
          </Button>
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/15 p-4 font-mono text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{dict.common.sentSuccess}</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-400/40 bg-rose-500/15 p-4 font-mono text-xs text-rose-300">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </form>
    </GlassCard>
  );
}
