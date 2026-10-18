import React from "react";
import { Save } from "lucide-react";
import { getProfile } from "@/lib/queries";
import { updateProfileAction } from "@/lib/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { FormField, FormTextarea } from "@/components/admin/Form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const profile = await getProfile();

  return (
    <GlassCard variant="cyber" padding="lg">
      <h1 className="text-xl font-bold text-white font-mono mb-6">
        Profile, Telemetry & PGP Key Configuration
      </h1>

      <form action={updateProfileAction} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="To'liq Ism (Full Name)"
            name="fullName"
            defaultValue={profile.fullName}
            required
          />
          <FormField
            label="Tizim Statusi (Live Uptime Badge)"
            name="uptimeStatus"
            defaultValue={profile.uptimeStatus}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Mutaxassislik (Role UZ)"
            name="roleUz"
            defaultValue={profile.roleUz}
            required
          />
          <FormField
            label="Specialization (Role EN)"
            name="roleEn"
            defaultValue={profile.roleEn}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormTextarea
            label="Qisqa Bio (Hero UZ)"
            name="bioUz"
            rows={2}
            defaultValue={profile.bioUz}
            required
          />
          <FormTextarea
            label="Short Bio (Hero EN)"
            name="bioEn"
            rows={2}
            defaultValue={profile.bioEn}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormTextarea
            label="Batafsil Men Haqimda (About UZ)"
            name="aboutUz"
            rows={4}
            defaultValue={profile.aboutUz}
            required
          />
          <FormTextarea
            label="Detailed Biography (About EN)"
            name="aboutEn"
            rows={4}
            defaultValue={profile.aboutEn}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            label="Email"
            name="email"
            defaultValue={profile.email}
            required
          />
          <FormField
            label="Telefon"
            name="phone"
            defaultValue={profile.phone}
            required
          />
          <FormField
            label="Joylashuv (Location)"
            name="location"
            defaultValue={profile.location}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            label="GitHub URL"
            name="githubUrl"
            defaultValue={profile.githubUrl}
          />
          <FormField
            label="LinkedIn URL"
            name="linkedinUrl"
            defaultValue={profile.linkedinUrl}
          />
          <FormField
            label="Telegram URL"
            name="telegramUrl"
            defaultValue={profile.telegramUrl}
          />
        </div>

        <FormTextarea
          label="PGP Public Key Block"
          name="pgpKey"
          rows={5}
          defaultValue={profile.pgpKey}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="lg">
            <Save className="h-4 w-4" />
            <span>Sozlamalarni Saqlash</span>
          </Button>
        </div>
      </form>
    </GlassCard>
  );
}
