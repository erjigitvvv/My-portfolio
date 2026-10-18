import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Boxes,
  Briefcase,
  Calendar,
  Clock,
  Cpu,
  Eye,
  FileText,
  Heart,
  Mic,
  ShieldCheck,
} from "lucide-react";
import {
  getProfile,
  getProjects,
  getSkills,
  getExperiences,
  getPosts,
  getCertificates,
  getSpeakings,
} from "@/lib/queries";
import { getDictionary, localizeField } from "@/i18n/messages";
import { Hero } from "@/components/sections/Hero";
import { BentoTelemetry } from "@/components/sections/BentoTelemetry";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SkillBars } from "@/components/sections/SkillBars";
import { Timeline } from "@/components/sections/Timeline";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge, getCategoryBadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  const [profile, projects, skills, experiences, posts, certificates, speakings] =
    await Promise.all([
      getProfile(),
      getProjects("ALL", true),
      getSkills(),
      getExperiences(),
      getPosts(true),
      getCertificates(),
      getSpeakings(),
    ]);

  return (
    <div className="space-y-14 sm:space-y-20 pb-12">
      {/* 1. Hero Section */}
      <ScrollReveal direction="up">
        <Hero profile={profile} locale={locale} />
      </ScrollReveal>

      {/* 2. Live Telemetry Bento Grid */}
      <ScrollReveal direction="up" delay={0.05}>
        <div id="telemetry" className="scroll-mt-24">
          <BentoTelemetry locale={locale} />
        </div>
      </ScrollReveal>

      {/* 3. Featured Architecture Case Studies */}
      <ScrollReveal direction="up" delay={0.05}>
        <section id="projects" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex items-start gap-3.5">
              <span className="liquid-icon-badge mt-1 h-11 w-11 shrink-0 text-[var(--accent)]">
                <Boxes className="h-5 w-5" />
              </span>
              <div>
                <Badge variant="ai" className="mb-2">
                  PRODUCTION ARCHITECTURES // CASE STUDIES
                </Badge>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  {dict.sections.featuredProjects}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {dict.sections.featuredProjectsSub}
                </p>
              </div>
            </div>
            <Link href={`/${locale}/projects`} className="self-start sm:self-auto">
              <Button variant="glass" size="sm">
                <span>{dict.sections.viewAll}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <ProjectGrid projects={projects} locale={locale} />
        </section>
      </ScrollReveal>

      {/* 4. Engineering Stack & Tech Radar */}
      <ScrollReveal direction="up" delay={0.05}>
        <section id="skills" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex items-start gap-3.5">
              <span className="liquid-icon-badge mt-1 h-11 w-11 shrink-0 text-sky-400">
                <Cpu className="h-5 w-5" />
              </span>
              <div>
                <Badge variant="devops" className="mb-2">
                  TECH RADAR // AI • SEC • OPS
                </Badge>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  {dict.sections.skillsTitle}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {dict.sections.skillsSub}
                </p>
              </div>
            </div>
            <Link href={`/${locale}/skills`} className="self-start sm:self-auto">
              <Button variant="glass" size="sm">
                <span>{dict.sections.viewAll}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <SkillBars skills={skills.slice(0, 6)} locale={locale} />
        </section>
      </ScrollReveal>

      {/* 5. Experience & Education Timeline */}
      <ScrollReveal direction="up" delay={0.05}>
        <section id="timeline" className="scroll-mt-24 space-y-6">
          <div className="flex items-start gap-3.5">
            <span className="liquid-icon-badge mt-1 h-11 w-11 shrink-0 text-emerald-400">
              <Briefcase className="h-5 w-5" />
            </span>
            <div>
              <Badge variant="cyber" className="mb-2">
                CAREER CHRONOLOGY // ENTERPRISE TRACK
              </Badge>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {dict.sections.timelineTitle}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {dict.sections.timelineSub}
              </p>
            </div>
          </div>

          <Timeline experiences={experiences} locale={locale} />
        </section>
      </ScrollReveal>

      {/* 6. Engineering Blog & CTF Security Write-ups */}
      <ScrollReveal direction="up" delay={0.05}>
        <section id="blog" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex items-start gap-3.5">
              <span className="liquid-icon-badge mt-1 h-11 w-11 shrink-0 text-violet-400">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <Badge variant="ai" className="mb-2">
                  RESEARCH & CTF WRITE-UPS
                </Badge>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  {dict.sections.latestPosts}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {dict.sections.latestPostsSub}
                </p>
              </div>
            </div>
            <Link href={`/${locale}/blog`} className="self-start sm:self-auto">
              <Button variant="glass" size="sm">
                <span>{dict.sections.viewAll}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post, idx) => {
              const title = localizeField(post, "title", locale);
              const excerpt = localizeField(post, "excerpt", locale);
              return (
                <ScrollReveal key={post.id} direction="up" delay={idx * 0.08}>
                  <GlassCard
                    variant="interactive"
                    className="flex h-full flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="liquid-icon-badge h-8 w-8 text-[var(--accent)]">
                            <FileText className="h-4 w-4" />
                          </span>
                          <Badge variant={getCategoryBadgeVariant(post.category)}>
                            {post.category}
                          </Badge>
                        </div>
                        <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-400">
                          <Clock className="h-3 w-3 text-[var(--accent)]" />
                          {post.readTime} {dict.common.minRead}
                        </span>
                      </div>
                      <Link href={`/${locale}/blog/${post.slug}`} className="block">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition">
                          {title}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5 text-emerald-400" /> {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5 text-rose-400" /> {post.likes}
                        </span>
                      </div>
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
                      >
                        <span>{dict.common.readMore}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* 7. Certificates & Speaking Preview Dual Row */}
      <ScrollReveal direction="up" delay={0.05}>
        <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          <GlassCard variant="cyber" className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="liquid-icon-badge h-9 w-9 text-emerald-400">
                  <Award className="h-4 w-4" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {dict.sections.certsTitle}
                </h3>
              </div>
              <Link
                href={`/${locale}/certificates`}
                className="font-mono text-xs text-emerald-400 hover:underline shrink-0"
              >
                {dict.sections.viewAll} →
              </Link>
            </div>
            <div className="space-y-2.5">
              {certificates.slice(0, 4).map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {localizeField(cert, "title", locale)}
                    </p>
                    <p className="font-mono text-xs text-slate-400">
                      {cert.issuer} • {cert.issueDate}
                    </p>
                  </div>
                  <div className="self-start sm:self-auto shrink-0">
                    <Badge variant="cyber">{cert.credentialId}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard variant="ai" className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="liquid-icon-badge h-9 w-9 text-violet-400">
                  <Mic className="h-4 w-4" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {dict.sections.speakingTitle}
                </h3>
              </div>
              <Link
                href={`/${locale}/speaking`}
                className="font-mono text-xs text-violet-300 hover:underline shrink-0"
              >
                {dict.sections.viewAll} →
              </Link>
            </div>
            <div className="space-y-3">
              {speakings.map((talk) => (
                <div
                  key={talk.id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="ai">{talk.type}</Badge>
                    <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-violet-400" /> {talk.date} • {talk.location}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {localizeField(talk, "title", locale)}
                  </p>
                  <p className="text-xs text-emerald-400 font-mono">
                    {localizeField(talk, "event", locale)}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </ScrollReveal>

      {/* 8. Encrypted Contact Call-to-Action Banner */}
      <ScrollReveal direction="up" delay={0.05}>
        <div id="contact" className="scroll-mt-24">
          <GlassCard
            variant="cyber"
            glow
            padding="lg"
            className="text-center space-y-4 border-emerald-400/35"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center">
              <span className="liquid-icon-badge h-12 w-12 text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </span>
            </div>
            <Badge variant="live" pulse>
              PGP ENCRYPTED CHANNEL // TELEGRAM WEBHOOK ACTIVE
            </Badge>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              {dict.sections.contactTitle}
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {dict.sections.contactSub}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/contact`}>
                <Button variant="primary" size="lg">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{dict.hero.ctaContact}</span>
                </Button>
              </Link>
              <Link href={`/${locale}/resources`}>
                <Button variant="glass" size="lg">
                  <BookOpen className="h-4 w-4 text-violet-400" />
                  <span>{dict.sections.resourcesTitle}</span>
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </ScrollReveal>
    </div>
  );
}

