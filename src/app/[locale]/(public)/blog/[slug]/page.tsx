import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getPostBySlug } from "@/lib/queries";
import { incrementPostReactionAction } from "@/lib/actions";
import { getDictionary, localizeField } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge, getCategoryBadgeVariant } from "@/components/ui/Badge";
import { PostReactionBar } from "./PostReactionBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return constructMetadata({
      title: "Article Not Found",
      description: "Blog post not found",
      locale: params.locale,
    });
  }
  return constructMetadata({
    title: localizeField(post, "title", params.locale),
    description: localizeField(post, "excerpt", params.locale),
    locale: params.locale,
    path: `/blog/${params.slug}`,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  await incrementPostReactionAction(slug, "view");

  const title = localizeField(post, "title", locale);
  const excerpt = localizeField(post, "excerpt", locale);
  const content = localizeField(post, "content", locale);

  return (
    <article className="mx-auto max-w-4xl space-y-8 py-6">
      <ScrollReveal direction="up">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{dict.nav.blog}</span>
        </Link>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
            <Badge variant={getCategoryBadgeVariant(post.category)} pulse>
              {post.category}
            </Badge>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-emerald-400" /> {post.readTime}{" "}
              {dict.common.minRead}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-violet-400" />{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {excerpt}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.05}>
        <PostReactionBar
          slug={slug}
          initialViews={post.views + 1}
          initialLikes={post.likes}
        />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <GlassCard variant="default" padding="lg" className="space-y-4">
          <div className="whitespace-pre-line font-sans text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            {content}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {post.tags.split(",").map((tag: string) => (
              <span
                key={tag}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-emerald-300"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </GlassCard>
      </ScrollReveal>
    </article>
  );
}

