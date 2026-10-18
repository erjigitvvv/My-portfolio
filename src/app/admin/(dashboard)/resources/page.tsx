import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { getResources } from "@/lib/queries";
import { createResourceAction, deleteResourceAction } from "@/lib/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField, FormSelect } from "@/components/admin/Form";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <div className="space-y-8">
      <GlassCard variant="devops" padding="lg">
        <h2 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
          <Plus className="h-5 w-5 text-emerald-400" />
          <span>Yangi Resurs yoki Shablon Qo&apos;shish</span>
        </h2>

        <form action={createResourceAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Nomi (UZ)"
              name="titleUz"
              placeholder="Zero-Trust K8s Blueprint"
              required
            />
            <FormField
              label="Title (EN)"
              name="titleEn"
              placeholder="Zero-Trust K8s Blueprint"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Tavsif (UZ)"
              name="descriptionUz"
              placeholder="Terraform va Cilium shablonlari..."
              required
            />
            <FormField
              label="Description (EN)"
              name="descriptionEn"
              placeholder="Terraform and Cilium hardening templates..."
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormSelect
              label="Turi (Type)"
              name="type"
              options={[
                { value: "TEMPLATE", label: "TEMPLATE" },
                { value: "TOOL", label: "TOOL" },
                { value: "CHEATSHEET", label: "CHEATSHEET" },
                { value: "GUIDE", label: "GUIDE" },
              ]}
            />
            <FormSelect
              label="Yo'nalish (Category)"
              name="category"
              options={[
                { value: "DEVOPS", label: "DEVOPS" },
                { value: "CYBERSECURITY", label: "CYBERSECURITY" },
                { value: "AI", label: "AI" },
              ]}
            />
            <FormField
              label="GitHub / Resource URL"
              name="url"
              placeholder="https://github.com/..."
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Plus className="h-4 w-4" />
              <span>Resursni Saqlash</span>
            </Button>
          </div>
        </form>
      </GlassCard>

      <GlassCard variant="default" padding="lg" className="space-y-3">
        <h3 className="font-mono text-base font-bold text-white">
          Resurslar ({resources.length})
        </h3>
        {resources.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="devops">{r.type}</Badge>
                <span className="font-bold text-white">{r.titleEn}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{r.descriptionUz}</p>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteResourceAction(r.id);
              }}
            >
              <Button type="submit" variant="danger" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </form>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
