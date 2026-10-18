import React from "react";
import { Shield, Cpu, Server, KeyRound, MapPin, Mail, FileDown } from "lucide-react";
import { getProfile, getExperiences } from "@/lib/queries";
import { localizeField } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Timeline } from "@/components/sections/Timeline";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "About Erjigitov Mirhamid" : "Erjigitov Mirhamid haqida",
    description: "Erjigitov Mirhamid — AI Engineer, Cybersecurity Architect & DevSecOps Specialist biography.",
    locale: params.locale,
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const [profile, experiences] = await Promise.all([
    getProfile(),
    getExperiences(),
  ]);

  const role = localizeField(profile, "role", locale);
  const about = localizeField(profile, "about", locale);

  return (
    <div className="space-y-12 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="cyber" pulse>
            ENGINEER DOSSIER // SECURITY CLEARANCE: LEVEL 5
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {profile.name || profile.fullName || "Erjigitov Mirhamid"}
          </h1>
          <p className="font-mono text-sm sm:text-base text-emerald-500 dark:text-emerald-400">
            {role}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <ScrollReveal direction="left" delay={0.05} className="lg:col-span-8">
          <GlassCard variant="default" padding="lg" className="h-full space-y-4">
            <h2 className="font-mono text-lg font-bold text-slate-900 dark:text-white">
              {locale === "en" ? "// Engineering Biography" : "// Muhandislik Biografiyasi"}
            </h2>
            <div className="whitespace-pre-line text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {about}
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
              <div className="liquid-glass rounded-xl p-4 space-y-1.5">
                <Cpu className="h-5 w-5 text-violet-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Autonomous AI
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Production LLMs, Multi-Agent RAG, vLLM & GPU MLOps.
                </p>
              </div>
              <div className="liquid-glass rounded-xl p-4 space-y-1.5">
                <Shield className="h-5 w-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Zero-Trust Security
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  OSCP Red Teaming, Linux eBPF, OWASP LLM Guardrails.
                </p>
              </div>
              <div className="liquid-glass rounded-xl p-4 space-y-1.5">
                <Server className="h-5 w-5 text-blue-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Cloud-Native DevOps
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Multi-Region Kubernetes (CKS), Terraform & ArgoCD GitOps.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.1} className="lg:col-span-4">
          <GlassCard variant="cyber" padding="lg" className="h-full space-y-4">
            <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white">
              {locale === "en" ? "Direct Telemetry & PGP" : "Aloqa va PGP Kalit"}
            </h3>
            <div className="space-y-2.5 font-mono text-xs text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" /> {profile.location}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400" /> {profile.email}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950/85 p-3 font-mono text-[10px] text-emerald-300 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <KeyRound className="h-3.5 w-3.5 text-emerald-400" />
                <span>PGP PUBLIC KEY BLOCK</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{profile.pgpKey}</pre>
            </div>

            <a
              href={locale === "en" ? profile.resumeUrlEn : profile.resumeUrlUz}
              download
              className="block pt-2"
            >
              <Button variant="primary" className="w-full">
                <FileDown className="h-4 w-4" />
                <span>
                  {locale === "en"
                    ? "Download Full CV (PDF)"
                    : "To'liq Rezyumeni Yuklash (PDF)"}
                </span>
              </Button>
            </a>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* Full Timeline */}
      <ScrollReveal direction="up" delay={0.05}>
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {locale === "en" ? "Experience & Academic Track" : "Ish Tajribasi va Ta'lim"}
          </h2>
          <Timeline experiences={experiences} locale={locale} />
        </div>
      </ScrollReveal>
    </div>
  );
}

