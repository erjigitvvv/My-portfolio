import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { getSkills } from "@/lib/queries";
import { createSkillAction, deleteSkillAction } from "@/lib/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField, FormSelect } from "@/components/admin/Form";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div className="space-y-8">
      <GlassCard variant="devops" padding="lg">
        <h2 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
          <Plus className="h-5 w-5 text-emerald-400" />
          <span>Yangi Ko&apos;nikma (Tech Radar Skill) Qo&apos;shish</span>
        </h2>

        <form action={createSkillAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Texnologiya Nomi"
              name="name"
              placeholder="Cilium eBPF & Tetragon"
              required
            />
            <FormSelect
              label="Yo'nalish"
              name="category"
              options={[
                { value: "AI", label: "AI & MLOps" },
                { value: "CYBERSECURITY", label: "Cybersecurity" },
                { value: "DEVOPS", label: "DevOps & Cloud" },
                { value: "CORE", label: "Core Programming" },
              ]}
            />
            <FormField
              label="Daraja (1-100%)"
              name="level"
              type="number"
              defaultValue={95}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Tavsif (O'zbekcha)"
              name="descriptionUz"
              placeholder="Linux yadrosi darajasida tarmoq va xavfsizlik..."
              required
            />
            <FormField
              label="Description (English)"
              name="descriptionEn"
              placeholder="Kernel-level networking and runtime security..."
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Plus className="h-4 w-4" />
              <span>Saqlash</span>
            </Button>
          </div>
        </form>
      </GlassCard>

      <GlassCard variant="default" padding="lg" className="space-y-3">
        <h3 className="font-mono text-base font-bold text-white">
          Tech Radar Ro&apos;yxati ({skills.length})
        </h3>
        {skills.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="cyber">{s.category}</Badge>
                <span className="font-bold text-white">{s.name}</span>
                <span className="font-mono text-xs text-emerald-400">
                  {s.level}%
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{s.descriptionUz}</p>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteSkillAction(s.id);
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
