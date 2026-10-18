import React from "react";
import { getProjects } from "@/lib/queries";
import { getDictionary } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "Architecture Case Studies & Projects" : "Loyihalar va Arxitektura Case-Studylar",
    description: "Production AI systems, Zero-Trust Kubernetes platforms, and Cybersecurity tools.",
    locale: params.locale,
    path: "/projects",
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const projects = await getProjects("ALL", false);

  return (
    <div className="space-y-10 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="ai" pulse>
            PRODUCTION CASE STUDIES // ARCHITECTURE & METRICS
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {dict.sections.featuredProjects}
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {dict.sections.featuredProjectsSub}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.08}>
        <ProjectGrid projects={projects} locale={locale} showFilter />
      </ScrollReveal>
    </div>
  );
}

