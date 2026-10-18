import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Eye,
  Network,
  Zap,
} from "lucide-react";
import { getProjectBySlug } from "@/lib/queries";
import { incrementProjectViewAction } from "@/lib/actions";
import { getDictionary, localizeField } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge, getCategoryBadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return constructMetadata({
      title: "Project Not Found",
      description: "Case study not found",
      locale: params.locale,
    });
  }
  return constructMetadata({
    title: localizeField(project, "title", params.locale),
    description: localizeField(project, "summary", params.locale),
    locale: params.locale,
    path: `/projects/${params.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  await incrementProjectViewAction(slug);

  const title = localizeField(project, "title", locale);
  const summary = localizeField(project, "summary", locale);
  const content = localizeField(project, "content", locale);
  const arch = localizeField(project, "architecture", locale);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-6">
      <ScrollReveal direction="up">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{dict.nav.projects}</span>
        </Link>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={getCategoryBadgeVariant(project.category)} pulse>
              {project.category}
            </Badge>
            <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
              <Eye className="h-3.5 w-3.5 text-emerald-400" /> {project.views + 1}{" "}
              {dict.common.views}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {summary}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="glass">
                  <Github className="h-4 w-4" />
                  <span>{dict.common.sourceCode}</span>
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button variant="primary">
                  <ExternalLink className="h-4 w-4" />
                  <span>{dict.common.liveDemo}</span>
                </Button>
              </a>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Impact Metrics Card */}
      {project.metrics && (
        <ScrollReveal direction="up" delay={0.06}>
          <GlassCard variant="cyber" padding="md">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-3">
              <Zap className="h-4 w-4" />
              <span>{dict.common.metrics.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.metrics.split("|").map((metric: string) => (
                <div
                  key={metric}
                  className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3.5 font-mono text-sm font-bold text-emerald-300"
                >
                  ⚡ {metric.trim()}
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      )}

      {/* System Architecture Pipeline */}
      {arch && (
        <ScrollReveal direction="up" delay={0.1}>
          <GlassCard variant="ai" padding="md">
            <div className="flex items-center gap-2 font-mono text-xs text-violet-300 mb-2">
              <Network className="h-4 w-4" />
              <span>{dict.common.architecture.toUpperCase()}</span>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/85 p-4 font-mono text-xs text-emerald-300 leading-relaxed">
              {arch}
            </pre>
          </GlassCard>
        </ScrollReveal>
      )}

      {/* Detailed Engineering Write-up */}
      <ScrollReveal direction="up" delay={0.14}>
        <GlassCard variant="default" padding="lg" className="space-y-4">
          <div className="whitespace-pre-line text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            {content}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {project.tags.split(",").map((tag: string) => (
              <span
                key={tag}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}

