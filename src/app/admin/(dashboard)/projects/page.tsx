import React from "react";
import { Trash2, Plus } from "lucide-react";
import { getProjects } from "@/lib/queries";
import { createProjectAction, deleteProjectAction } from "@/lib/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField, FormSelect, FormTextarea } from "@/components/admin/Form";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects("ALL", false);

  return (
    <div className="space-y-8">
      {/* Add New Project Form */}
      <GlassCard variant="ai" padding="lg">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-mono">
          <Plus className="h-5 w-5 text-emerald-400" />
          <span>Yangi Loyiha (Case Study) Qo&apos;shish</span>
        </h2>

        <form action={createProjectAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Slug (URL ID)"
              name="slug"
              placeholder="zero-trust-llm-gateway"
              required
            />
            <FormSelect
              label="Yo'nalish (Category)"
              name="category"
              options={[
                { value: "AI", label: "AI & MLOps" },
                { value: "CYBERSECURITY", label: "Cybersecurity & SecOps" },
                { value: "DEVOPS", label: "DevOps & Kubernetes" },
              ]}
            />
            <FormField
              label="Natijalar (Metrics)"
              name="metrics"
              placeholder="99.99% Uptime | -40% Latency"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Sarlavha (O'zbekcha)"
              name="titleUz"
              placeholder="Loyiha nomi (UZ)"
              required
            />
            <FormField
              label="Title (English)"
              name="titleEn"
              placeholder="Project Title (EN)"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormTextarea
              label="Qisqacha tavsif (UZ)"
              name="summaryUz"
              rows={2}
              required
            />
            <FormTextarea
              label="Executive Summary (EN)"
              name="summaryEn"
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Arxitektura Oqimi (UZ)"
              name="architectureUz"
              placeholder="[Client] ➔ [eBPF] ➔ [LLM RAG]"
              required
            />
            <FormField
              label="Architecture Pipeline (EN)"
              name="architectureEn"
              placeholder="[Client] ➔ [eBPF] ➔ [LLM RAG]"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MarkdownEditor
              label="Batafsil Case Study (UZ Markdown)"
              name="contentUz"
              defaultValue="### Muammo va Yechim\nLoyiha tafsilotlari..."
            />
            <MarkdownEditor
              label="Detailed Case Study (EN Markdown)"
              name="contentEn"
              defaultValue="### Problem & Architecture\nDetailed write-up..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Texnologiyalar (Tags)"
              name="tags"
              placeholder="PyTorch, Kubernetes, eBPF, Go"
              required
            />
            <FormField
              label="GitHub URL"
              name="githubUrl"
              placeholder="https://github.com/..."
            />
            <FormField
              label="Live Demo URL"
              name="liveUrl"
              placeholder="https://..."
            />
          </div>

          <ImageUploader name="imageUrl" />

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <input
                type="checkbox"
                name="featured"
                defaultChecked
                className="rounded border-white/20"
              />
              <span>Bosh sahifada (Featured) ko&apos;rsatish</span>
            </label>
            <Button type="submit" variant="primary">
              <Plus className="h-4 w-4" />
              <span>Loyihani Saqlash</span>
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* Existing Projects List */}
      <GlassCard variant="default" padding="lg" className="space-y-4">
        <h3 className="font-mono text-base font-bold text-white">
          Mavjud Loyihalar ({projects.length})
        </h3>
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="cyber">{p.category}</Badge>
                  <span className="font-mono text-xs text-slate-400">
                    /{p.slug} • {p.views} views
                  </span>
                </div>
                <p className="font-bold text-white">{p.titleUz}</p>
                <p className="text-xs text-slate-400">{p.metrics}</p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await deleteProjectAction(p.id);
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
