import React from "react";
import { Download, ExternalLink, Package } from "lucide-react";
import { getResources } from "@/lib/queries";
import { getDictionary, localizeField } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge, getCategoryBadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 3600; // ISR: re-generated hourly or instantly via revalidatePath

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "Open-Source Blueprints & Checklists" : "Resurslar va Ochiq Kodli Shablonlar",
    description: "Zero-Trust Kubernetes Terraform blueprints, OWASP LLM checklists, and DevSecOps CI/CD kits.",
    locale: params.locale,
    path: "/resources",
  });
}

export default async function ResourcesPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const resources = await getResources();

  return (
    <div className="space-y-10 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="devops" pulse>
            OPEN-SOURCE TOOLKIT // BLUEPRINTS & CHECKLISTS
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {dict.sections.resourcesTitle}
          </h1>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((res, idx) => {
          const title = localizeField(res, "title", locale);
          const desc = localizeField(res, "description", locale);
          const variant = getCategoryBadgeVariant(res.category);

          return (
            <ScrollReveal key={res.id} direction="up" delay={idx * 0.06}>
              <GlassCard
                variant={variant}
                className="flex h-full flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={variant}>{res.type}</Badge>
                    <span className="font-mono text-xs text-slate-400">
                      {res.downloads} downloads
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-emerald-400">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {title}
                      </h2>
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400 hover:underline"
                  >
                    <span>GitHub Repo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  {res.downloadUrl && (
                    <a href={res.url} target="_blank" rel="noreferrer">
                      <Button variant="glass" size="sm">
                        <Download className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{dict.common.download}</span>
                      </Button>
                    </a>
                  )}
                </div>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

