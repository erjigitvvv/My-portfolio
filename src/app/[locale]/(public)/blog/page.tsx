import React from "react";
import Link from "next/link";
import { Eye, Heart, Clock, ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/queries";
import { getDictionary, localizeField } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge, getCategoryBadgeVariant } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 3600; // ISR: re-generated hourly or instantly via revalidatePath

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "Engineering Blog & Security Write-ups" : "Muhandislik Blogi va CTF Tahlillar",
    description: "Technical articles on LLM Security, Linux eBPF, Kubernetes, and MLOps.",
    locale: params.locale,
    path: "/blog",
  });
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const posts = await getPosts(true);

  return (
    <div className="space-y-10 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="cyber" pulse>
            RESEARCH LOGS // AI SECURITY • eBPF • KUBERNETES
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {dict.sections.latestPosts}
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {dict.sections.latestPostsSub}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => {
          const title = localizeField(post, "title", locale);
          const excerpt = localizeField(post, "excerpt", locale);

          return (
            <ScrollReveal key={post.id} direction="up" delay={idx * 0.06}>
              <GlassCard
                variant="interactive"
                className="flex h-full flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={getCategoryBadgeVariant(post.category)}>
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}{" "}
                      {dict.common.minRead}
                    </span>
                  </div>

                  <Link href={`/${locale}/blog/${post.slug}`} className="block group">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition">
                      {title}
                    </h2>
                  </Link>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.split(",").map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5 text-emerald-400" /> {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-rose-400" /> {post.likes}
                      </span>
                    </div>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-emerald-400 font-semibold hover:underline"
                    >
                      <span>{dict.common.readMore}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

