import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { getCertificates } from "@/lib/queries";
import { createCertificateAction, deleteCertificateAction } from "@/lib/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField, FormSelect } from "@/components/admin/Form";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const certs = await getCertificates();

  return (
    <div className="space-y-8">
      <GlassCard variant="cyber" padding="lg">
        <h2 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
          <Plus className="h-5 w-5 text-emerald-400" />
          <span>Yangi Sertifikat Qo&apos;shish</span>
        </h2>

        <form action={createCertificateAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Sertifikat Nomi (UZ)"
              name="titleUz"
              placeholder="Certified Kubernetes Security Specialist (CKS)"
              required
            />
            <FormField
              label="Certificate Title (EN)"
              name="titleEn"
              placeholder="Certified Kubernetes Security Specialist (CKS)"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <FormField
              label="Tashkilot (Issuer)"
              name="issuer"
              placeholder="CNCF / OffSec"
              required
            />
            <FormField
              label="Sana (Year)"
              name="issueDate"
              placeholder="2026"
              required
            />
            <FormField
              label="Credential ID"
              name="credentialId"
              placeholder="LF-CKS-99120"
              required
            />
            <FormSelect
              label="Yo'nalish"
              name="category"
              options={[
                { value: "CYBERSECURITY", label: "Cybersecurity" },
                { value: "DEVOPS", label: "DevOps & Cloud" },
                { value: "AI", label: "AI & ML" },
              ]}
            />
          </div>

          <FormField
            label="Tasdiqlash Havolasi (Verify URL)"
            name="credentialUrl"
            placeholder="https://..."
            required
          />

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Plus className="h-4 w-4" />
              <span>Sertifikatni Saqlash</span>
            </Button>
          </div>
        </form>
      </GlassCard>

      <GlassCard variant="default" padding="lg" className="space-y-3">
        <h3 className="font-mono text-base font-bold text-white">
          Sertifikatlar ({certs.length})
        </h3>
        {certs.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="cyber">{c.category}</Badge>
                <span className="font-bold text-white">{c.titleEn}</span>
              </div>
              <p className="font-mono text-xs text-slate-400 mt-1">
                {c.issuer} • {c.issueDate} • ID: {c.credentialId}
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteCertificateAction(c.id);
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
