import React from "react";
import { ShieldCheck, Lock, FileCode2 } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "Privacy & Security Policy (security.txt)" : "Maxfiylik va Xavfsizlik Siyosati",
    description: "Zero-Trust Privacy Policy and Responsible Vulnerability Disclosure.",
    locale: params.locale,
    path: "/privacy",
  });
}

export default function PrivacyPage({
  params,
}: {
  params: { locale: string };
}) {
  const isEn = params.locale === "en";

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="cyber" pulse>
            ZERO-TRUST PRIVACY // RESPONSIBLE DISCLOSURE
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {isEn
              ? "Privacy Policy & Security Posture"
              : "Maxfiylik Siyosati va Kiberxavfsizlik Standarti"}
          </h1>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.08}>
        <GlassCard variant="cyber" padding="lg" className="space-y-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? "1. Zero Third-Party Tracking" : "1. Uchinchi Tomon Kuzatuvlarisiz (Zero-Tracking)"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEn
                  ? "This platform does not use invasive ad trackers or third-party cookies. Only anonymous view counters and explicitly submitted contact messages are stored in our encrypted database."
                  : "Ushbu platforma reklama trekerlari yoki shaxsni kuzatuvchi uchinchi tomon cookie-fayllaridan foydalanmaydi. Faqatgina anonim ko'rishlar soni va o'zingiz yuborgan aloqa xabarlari himoyalangan bazada saqlanadi."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="h-6 w-6 text-violet-400 shrink-0 mt-1" />
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? "2. End-to-End Encryption & PGP" : "2. Shifrlangan Aloqa va PGP Imzo"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEn
                  ? "All traffic is enforced over TLS 1.3 with strict Content-Security-Policy (CSP) headers. For sensitive vulnerability reports or enterprise NDAs, please encrypt your payload with the published PGP key."
                  : "Barcha trafik TLS 1.3 va qat'iy Content-Security-Policy (CSP) sarlavhalari orqali himoyalangan. Maxfiy xavfsizlik hisobotlari uchun e'lon qilingan PGP kalitdan foydalanishingiz mumkin."}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
              <FileCode2 className="h-4 w-4" />
              <span>/.well-known/security.txt</span>
            </div>
            <pre className="rounded-xl border border-white/10 bg-slate-950/90 p-4 font-mono text-xs text-emerald-300 leading-relaxed">
{`Contact: mailto:mirhamid@cyberai.dev
Encryption: https://cyberai.dev/uz/about#pgp
Preferred-Languages: uz, en
Policy: https://cyberai.dev/en/privacy
Hiring: https://cyberai.dev/en/contact`}
            </pre>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}

