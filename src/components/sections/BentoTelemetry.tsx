"use client";

import React, { useState } from "react";
import {
  Brain,
  ShieldCheck,
  Server,
  GitBranch,
  Send,
  Activity,
  CheckCircle2,
  Zap,
  Cpu,
  Gauge,
} from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { getDictionary } from "@/i18n/messages";

export function BentoTelemetry({ locale }: { locale: string }) {
  const dict = getDictionary(locale);
  const [promptInput, setPromptInput] = useState("");
  const [aiOutput, setAiOutput] = useState(
    locale === "en"
      ? "Ready. Select a security/architecture query below or type your own prompt to test Erjigitov Mirhamid's RAG defense sandbox."
      : "Tayyor. Quyidagi arxitektura savollaridan birini tanlang yoki Erjigitov Mirhamidning AI RAG xavfsizlik sandboxini sinab ko'ring."
  );

  const handleQuickPrompt = (q: string) => {
    setPromptInput(q);
    if (q.toLowerCase().includes("ebpf") || q.toLowerCase().includes("k8s")) {
      setAiOutput(
        locale === "en"
          ? "[RAG VERIFIED • 9.2ms]: Deploying Cilium eBPF with Tetragon enforces kernel-level syscall filtering and identity-aware mTLS across all 120+ Kubernetes pods without sidecar memory overhead."
          : "[RAG TASDIQLANDI • 9.2ms]: Cilium eBPF va Tetragon yordamida Linux yadrosi darajasida har bir konteyner chaqiruvlari (syscalls) nazorat qilinadi va mTLS shifrlash sidecar xotira sarfisiz amalga oshiriladi."
      );
    } else if (
      q.toLowerCase().includes("injection") ||
      q.toLowerCase().includes("llm")
    ) {
      setAiOutput(
        locale === "en"
          ? "[NEURALSHIELD WAF • 11.4ms]: Blocked 98.7% of indirect prompt injections using a quantized ONNX DeBERTa-v3 classifier + cryptographic context delimiters before reaching the primary LLM."
          : "[NEURALSHIELD WAF • 11.4ms]: Kvantizatsiya qilingan ONNX DeBERTa-v3 klassifikatori va kriptografik kontekst chegaralari orqali Prompt Injection hujumlarining 98.7% asosiy LLM ga yetmasdan bloklanadi."
      );
    } else {
      setAiOutput(
        locale === "en"
          ? `[AI AGENT RESPONSE]: Analyzed query "${q}". Erjigitov Mirhamid's architecture combines PyTorch/vLLM inference with OSCP-grade offensive security hardening and Terraform/ArgoCD GitOps.`
          : `[AI AGENT JAVOBI]: "${q}" so'rovi tahlil qilindi. Erjigitov Mirhamidning arxitekturasi PyTorch/vLLM modellarini OSCP darajasidagi kiber-himoya va Terraform/ArgoCD GitOps bilan birlashtiradi.`
      );
    }
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex items-start gap-3.5">
          <span className="liquid-icon-badge h-12 w-12 shrink-0 mt-1">
            <Activity className="h-6 w-6 text-emerald-400" />
          </span>
          <div>
            <Badge variant="cyber" className="mb-2">
              REAL-TIME TELEMETRY // BENTO COMMAND
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {dict.telemetry.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {dict.telemetry.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Card 1: Interactive AI RAG Sandbox (7 cols) */}
        <GlassCard
          variant="ai"
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="liquid-icon-badge h-10 w-10">
                  <Brain className="h-5 w-5 text-violet-400" />
                </span>
                <h3 className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {dict.telemetry.aiTitle}
                </h3>
              </div>
              <Badge variant="ai">ONNX • vLLM • pgvector</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
              {dict.telemetry.aiDesc}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                locale === "en"
                  ? "How do you secure Kubernetes with eBPF?"
                  : "Kubernetes klasterlarni eBPF bilan qanday himoyalaysiz?",
                locale === "en"
                  ? "How does NeuralShield block Prompt Injection?"
                  : "NeuralShield Prompt Injectionni qanday to'xtatadi?",
              ].map((sample) => (
                <button
                  key={sample}
                  onClick={() => handleQuickPrompt(sample)}
                  className="spatial-glass inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-left font-mono text-xs text-[var(--ink)] transition hover:border-[var(--accent)]"
                >
                  <Zap className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                  <span>{sample}</span>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/15 bg-slate-950/85 p-4 font-mono text-xs text-emerald-300 leading-relaxed min-h-[84px]">
              {aiOutput}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (promptInput.trim()) handleQuickPrompt(promptInput);
            }}
            className="mt-4 flex flex-col xs:flex-row items-stretch xs:items-center gap-2"
          >
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder={
                locale === "en"
                  ? "Test the AI Sandbox with a technical question..."
                  : "Texnik savol yozib AI Sandboxni sinab ko'ring..."
              }
              className="spatial-glass w-full rounded-xl px-3.5 py-2.5 font-mono text-xs text-[var(--ink)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-[var(--accent)] px-4 py-2.5 font-mono text-xs font-bold text-[#0B0B0B] hover:brightness-105 flex items-center justify-center gap-1.5 shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Run</span>
            </button>
          </form>
        </GlassCard>

        {/* Card 2: Cybersecurity Posture (5 cols) */}
        <GlassCard variant="cyber" className="lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="liquid-icon-badge h-10 w-10">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </span>
              <h3 className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {dict.telemetry.secTitle}
              </h3>
            </div>
            <Badge variant="cyber" pulse>
              A+ HARDENED
            </Badge>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {[
              {
                label: "Zero-Trust mTLS & Identity",
                status: "ENFORCED",
                score: "100%",
              },
              {
                label: "OWASP LLM Top-10 Guardrails",
                status: "ACTIVE",
                score: "98.7%",
              },
              {
                label: "Supply-Chain SBOM & Cosign",
                status: "VERIFIED",
                score: "SIGNED",
              },
              {
                label: "HackTheBox / OffSec Rank",
                status: "OSCP • PRO LABS",
                score: "TOP 1%",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="spatial-glass flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5"
              >
                <span className="text-slate-700 dark:text-slate-300 truncate">
                  {item.label}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Card 3: DevOps & Kubernetes Telemetry (6 cols) */}
        <GlassCard variant="devops" className="lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="liquid-icon-badge h-10 w-10">
                <Server className="h-5 w-5 text-blue-400" />
              </span>
              <h3 className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {dict.telemetry.devopsTitle}
              </h3>
            </div>
            <Badge variant="devops">EKS • Bare-Metal • ArgoCD</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            <div className="spatial-glass rounded-2xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[var(--muted)]">CLUSTER UPTIME</p>
                <Gauge className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <p className="mt-1 text-lg font-bold text-emerald-500 dark:text-emerald-400">
                99.99%
              </p>
              <p className="text-[10px] text-[var(--muted)]">Multi-Region HA</p>
            </div>
            <div className="spatial-glass rounded-2xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[var(--muted)]">GPU INFERENCE</p>
                <Cpu className="h-3.5 w-3.5 text-violet-400" />
              </div>
              <p className="mt-1 text-lg font-bold text-violet-500 dark:text-violet-400">
                11.8ms
              </p>
              <p className="text-[10px] text-[var(--muted)]">vLLM PagedAttn</p>
            </div>
            <div className="spatial-glass rounded-2xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[var(--muted)]">DEPLOYS / WK</p>
                <Zap className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <p className="mt-1 text-lg font-bold text-blue-500 dark:text-blue-400">
                140+
              </p>
              <p className="text-[10px] text-[var(--muted)]">Zero Rollbacks</p>
            </div>
          </div>
        </GlassCard>

        {/* Card 4: GitHub & WakaTime Activity (6 cols) */}
        <GlassCard variant="default" className="lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="liquid-icon-badge h-10 w-10">
                <GitBranch className="h-5 w-5 text-emerald-400" />
              </span>
              <h3 className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {dict.telemetry.githubTitle}
              </h3>
            </div>
            <Badge variant="live" pulse>
              2,840+ Contributions
            </Badge>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {[
              {
                lang: "Python (PyTorch, FastAPI, MLOps)",
                pct: 42,
                color: "bg-violet-400",
              },
              {
                lang: "Go & Rust (eBPF, Security Tooling)",
                pct: 28,
                color: "bg-emerald-400",
              },
              {
                lang: "HCL / YAML (Terraform, K8s, Helm)",
                pct: 20,
                color: "bg-blue-400",
              },
              {
                lang: "TypeScript (Next.js, Dashboards)",
                pct: 10,
                color: "bg-cyan-400",
              },
            ].map((row) => (
              <div key={row.lang} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-700 dark:text-slate-300 truncate pr-2">
                    {row.lang}
                  </span>
                  <span className="text-slate-400 shrink-0">{row.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full ${row.color}`}
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

