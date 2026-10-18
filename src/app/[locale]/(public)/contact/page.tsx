import React from "react";
import { Mail, MapPin, KeyRound, Send, ShieldCheck } from "lucide-react";
import { getProfile } from "@/lib/queries";
import { getDictionary } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "./ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "Encrypted Contact & Consulting" : "Xavfsiz Aloqa va Konsalting",
    description: "Contact Erjigitov Mirhamid for AI Engineering, Cybersecurity Audits, and DevOps.",
    locale: params.locale,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const profile = await getProfile();

  return (
    <div className="space-y-10 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="cyber" pulse>
            ENCRYPTED DISPATCH // TELEGRAM & PGP ENABLED
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {dict.sections.contactTitle}
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {dict.sections.contactSub}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <ScrollReveal direction="left" delay={0.05} className="lg:col-span-7">
          <ContactForm locale={locale} />
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.1} className="space-y-5 lg:col-span-5">
          <GlassCard variant="ai" className="space-y-4">
            <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>Direct Communication Nodes</span>
            </h3>
            <div className="space-y-3 font-mono text-xs text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>{profile.email}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Send className="h-4 w-4 text-cyan-400" />
                <a
                  href={profile.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  {profile.telegramUrl}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-violet-400" />
                <span>{profile.location}</span>
              </p>
            </div>
          </GlassCard>

          <GlassCard variant="default" className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
              <KeyRound className="h-4 w-4" />
              <span>PGP PUBLIC KEY (FOR SENSITIVE AUDITS)</span>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/90 p-3.5 font-mono text-[10px] text-slate-300 leading-relaxed">
              {profile.pgpKey}
            </pre>
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  );
}

