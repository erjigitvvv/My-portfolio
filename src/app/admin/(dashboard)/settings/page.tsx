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
        Profile, Hero &amp; PGP Key Configuration
      </h1>

      <form action={updateProfileAction} className="space-y-6">
        {/* ---------- Hero section (public landing) ---------- */}
        <fieldset className="space-y-4 rounded-2xl border border-white/10 p-4">
          <legend className="px-2 font-mono text-xs text-emerald-400">HERO (bosh sahifa)</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Hero 1-qator (UZ)" name="heroLine1_uz" defaultValue={profile.heroLine1_uz} required />
            <FormField label="Hero line 1 (EN)" name="heroLine1_en" defaultValue={profile.heroLine1_en} required />
            <FormField label="Hero 2-qator (UZ)" name="heroLine2_uz" defaultValue={profile.heroLine2_uz} required />
            <FormField label="Hero line 2 (EN)" name="heroLine2_en" defaultValue={profile.heroLine2_en} required />
            <FormField label="Holat yorlig'i (UZ) — yashil pill" name="availability_uz" defaultValue={profile.availability_uz} required />
            <FormField label="Availability pill (EN)" name="availability_en" defaultValue={profile.availability_en} required />
            <FormField label="Rol pill (UZ)" name="rolePill_uz" defaultValue={profile.rolePill_uz} required />
            <FormField label="Role pill (EN)" name="rolePill_en" defaultValue={profile.rolePill_en} required />
          </div>
        </fieldset>

        {/* ---------- Identity ---------- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="To'liq Ism (Full Name)" name="name" defaultValue={profile.name} required />
          <FormField label="Tizim Statusi (Live Uptime Badge)" name="uptimeStatus" defaultValue={profile.uptimeStatus} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Mutaxassislik (Headline UZ)" name="headline_uz" defaultValue={profile.headline_uz} required />
          <FormField label="Specialization (Headline EN)" name="headline_en" defaultValue={profile.headline_en} required />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormTextarea label="Qisqa Bio (Hero UZ)" name="bio_uz" rows={2} defaultValue={profile.bio_uz} required />
          <FormTextarea label="Short Bio (Hero EN)" name="bio_en" rows={2} defaultValue={profile.bio_en} required />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormTextarea label="Batafsil Men Haqimda (About UZ)" name="about_uz" rows={4} defaultValue={profile.about_uz} />
          <FormTextarea label="Detailed Biography (About EN)" name="about_en" rows={4} defaultValue={profile.about_en} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Email" name="email" type="email" defaultValue={profile.email} required />
          <FormField label="Telefon" name="phone" defaultValue={profile.phone} />
          <FormField label="Joylashuv (Location)" name="location" defaultValue={profile.location} required />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="GitHub URL" name="githubUrl" defaultValue={profile.githubUrl} />
          <FormField label="LinkedIn URL" name="linkedinUrl" defaultValue={profile.linkedinUrl} />
          <FormField label="Telegram URL" name="telegramUrl" defaultValue={profile.telegramUrl} />
        </div>

        <FormTextarea label="PGP Public Key Block" name="pgpKey" rows={5} defaultValue={profile.pgpKey} />

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
