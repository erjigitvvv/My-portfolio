import React from "react";
import { getSkills } from "@/lib/queries";
import { getDictionary } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { SkillBars } from "@/components/sections/SkillBars";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "Engineering Stack & Tech Radar" : "Texnologik Stek va Ko'nikmalar",
    description: "AI/MLOps, Offensive/Defensive Cybersecurity, and Kubernetes DevOps skills.",
    locale: params.locale,
    path: "/skills",
  });
}

export default async function SkillsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const skills = await getSkills();

  return (
    <div className="space-y-12 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="devops" pulse>
            FULL-SPECTRUM CAPABILITIES // AI • SEC • OPS
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {dict.sections.skillsTitle}
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {dict.sections.skillsSub}
          </p>
        </div>
      </ScrollReveal>

      {/* Reference DevSecOps + MLOps Pipeline Blueprint */}
      <ScrollReveal direction="up" delay={0.06}>
        <GlassCard variant="cyber" padding="lg" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-emerald-400">
              // Unified DevSecOps & Autonomous AI Pipeline
            </h2>
            <Badge variant="cyber">Zero-Trust Verified</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-4">
            <div className="liquid-glass rounded-xl p-4">
              <p className="text-violet-400 font-bold mb-1">01. AI & RAG Design</p>
              <p className="text-slate-600 dark:text-slate-300">
                PyTorch, LangGraph, Qdrant, LoRA Fine-Tuning, ONNX
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4">
              <p className="text-emerald-400 font-bold mb-1">02. SecOps Gate</p>
              <p className="text-slate-600 dark:text-slate-300">
                Semgrep SAST, Trivy, Gitleaks, Syft SBOM, Cosign
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4">
              <p className="text-blue-400 font-bold mb-1">03. K8s & GitOps</p>
              <p className="text-slate-600 dark:text-slate-300">
                Terraform, ArgoCD, EKS/Bare-Metal, Karpenter GPU
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4">
              <p className="text-amber-400 font-bold mb-1">04. eBPF Runtime</p>
              <p className="text-slate-600 dark:text-slate-300">
                Cilium mTLS, Falco, Prometheus, Grafana, Wazuh SIEM
              </p>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.12}>
        <SkillBars skills={skills} locale={locale} />
      </ScrollReveal>
    </div>
  );
}

