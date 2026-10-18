import React from "react";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { getCertificates } from "@/lib/queries";
import { getDictionary, localizeField } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge, getCategoryBadgeVariant } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "Verified Global Certifications" : "Xalqaro Sertifikatlar",
    description: "CKS, OSCP, CKA, AWS Security & Machine Learning certifications.",
    locale: params.locale,
    path: "/certificates",
  });
}

export default async function CertificatesPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const certificates = await getCertificates();

  return (
    <div className="space-y-10 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="cyber" pulse>
            CRYPTOGRAPHICALLY VERIFIED CREDENTIALS
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {dict.sections.certsTitle}
          </h1>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, idx) => {
          const title = localizeField(cert, "title", locale);
          const variant = getCategoryBadgeVariant(cert.category);

          return (
            <ScrollReveal key={cert.id} direction="up" delay={idx * 0.06}>
              <GlassCard
                variant={variant}
                className="flex h-full flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={variant}>{cert.category}</Badge>
                    <span className="flex items-center gap-1 font-mono text-xs text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {dict.common.verified}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-400">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {title}
                      </h2>
                      <p className="mt-1 font-mono text-xs text-slate-400">
                        {cert.issuer} • {cert.issueDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">ID: {cert.credentialId}</span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
                  >
                    <span>Verify</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

