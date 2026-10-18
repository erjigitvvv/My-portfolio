import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { getSpeakings } from "@/lib/queries";
import { createSpeakingAction, deleteSpeakingAction } from "@/lib/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField, FormSelect } from "@/components/admin/Form";

export const dynamic = "force-dynamic";

export default async function AdminSpeakingPage() {
  const speakings = await getSpeakings();

  return (
    <div className="space-y-8">
      <GlassCard variant="ai" padding="lg">
        <h2 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
          <Plus className="h-5 w-5 text-emerald-400" />
          <span>Yangi Konferensiya / Ma&apos;ruza Qo&apos;shish</span>
        </h2>

        <form action={createSpeakingAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Ma'ruza Mavzusi (UZ)"
              name="titleUz"
              placeholder="Avtonom AI Agentlar Xavfsizligi"
              required
            />
            <FormField
              label="Talk Title (EN)"
              name="titleEn"
              placeholder="Securing Autonomous AI Agents"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Tadbir Nomi (UZ)"
              name="eventUz"
              placeholder="CyberSec Summit 2026"
              required
            />
            <FormField
              label="Event Name (EN)"
              name="eventEn"
              placeholder="CyberSec Summit 2026"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Sana (Date)"
              name="date"
              placeholder="2026-09-15"
              required
            />
            <FormField
              label="Manzil (Location)"
              name="location"
              placeholder="Tashkent / Hybrid"
              required
            />
            <FormSelect
              label="Format (Type)"
              name="type"
              options={[
                { value: "KEYNOTE", label: "KEYNOTE" },
                { value: "WORKSHOP", label: "WORKSHOP" },
                { value: "PANEL", label: "PANEL" },
                { value: "WEBINAR", label: "WEBINAR" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Tavsif (UZ)"
              name="descriptionUz"
              placeholder="Ma'ruza haqida qisqacha..."
              required
            />
            <FormField
              label="Description (EN)"
              name="descriptionEn"
              placeholder="Brief overview of the talk..."
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Plus className="h-4 w-4" />
              <span>Ma&apos;ruzani Saqlash</span>
            </Button>
          </div>
        </form>
      </GlassCard>

      <GlassCard variant="default" padding="lg" className="space-y-3">
        <h3 className="font-mono text-base font-bold text-white">
          Ma&apos;ruzalar ({speakings.length})
        </h3>
        {speakings.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="ai">{t.type}</Badge>
                <span className="font-bold text-white">{t.titleUz}</span>
              </div>
              <p className="font-mono text-xs text-slate-400 mt-1">
                {t.eventUz} • {t.date} • {t.location}
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteSpeakingAction(t.id);
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
