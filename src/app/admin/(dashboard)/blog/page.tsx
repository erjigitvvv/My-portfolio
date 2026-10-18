import React from "react";
import { Trash2, Plus } from "lucide-react";
import { getPosts } from "@/lib/queries";
import { createPostAction, deletePostAction } from "@/lib/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField, FormSelect, FormTextarea } from "@/components/admin/Form";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getPosts(false);

  return (
    <div className="space-y-8">
      <GlassCard variant="cyber" padding="lg">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-mono">
          <Plus className="h-5 w-5 text-emerald-400" />
          <span>Yangi Maqola yoki CTF Write-up Qo&apos;shish</span>
        </h2>

        <form action={createPostAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Slug (URL)"
              name="slug"
              placeholder="zero-day-ebpf-analysis"
              required
            />
            <FormSelect
              label="Turkum (Category)"
              name="category"
              options={[
                { value: "Cybersecurity / CTF", label: "Cybersecurity / CTF" },
                { value: "AI Research", label: "AI Research & MLOps" },
                { value: "DevOps & Cloud", label: "DevOps & Kubernetes" },
              ]}
            />
            <FormField
              label="O'qish vaqti (daqiqa)"
              name="readTime"
              type="number"
              defaultValue={7}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Sarlavha (UZ)"
              name="titleUz"
              placeholder="Maqola sarlavhasi (O'zbekcha)"
              required
            />
            <FormField
              label="Title (EN)"
              name="titleEn"
              placeholder="Article Title (English)"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormTextarea
              label="Qisqacha anons (UZ)"
              name="excerptUz"
              rows={2}
              required
            />
            <FormTextarea
              label="Excerpt (EN)"
              name="excerptEn"
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MarkdownEditor
              label="Maqola Matni (UZ Markdown)"
              name="contentUz"
              defaultValue="## Kirish\nTexnik tahlil..."
            />
            <MarkdownEditor
              label="Article Content (EN Markdown)"
              name="contentEn"
              defaultValue="## Introduction\nTechnical breakdown..."
            />
          </div>

          <FormField
            label="Teglar (Comma-separated)"
            name="tags"
            placeholder="LLM Security, eBPF, Kubernetes, OWASP"
            required
          />

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Plus className="h-4 w-4" />
              <span>Maqolani Nashr Qilish</span>
            </Button>
          </div>
        </form>
      </GlassCard>

      <GlassCard variant="default" padding="lg" className="space-y-4">
        <h3 className="font-mono text-base font-bold text-white">
          Nashr qilingan maqolalar ({posts.length})
        </h3>
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="ai">{post.category}</Badge>
                  <span className="font-mono text-xs text-slate-400">
                    {post.views} views • {post.likes} likes
                  </span>
                </div>
                <p className="font-bold text-white">{post.titleUz}</p>
                <p className="text-xs text-slate-400">/{post.slug}</p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await deletePostAction(post.id);
                }}
              >
                <Button type="submit" variant="danger" size="sm">
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </form>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
