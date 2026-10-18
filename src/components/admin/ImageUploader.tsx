"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export function ImageUploader({
  name = "imageUrl",
  label = "Loyiha yoki Maqola Rasmi (Upload yoki URL)",
  defaultValue = "",
}: {
  name?: string;
  label?: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setUrl(data.url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block font-mono text-xs font-medium text-slate-300">
        {label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/projects/sentinel-ai.svg yoki https://..."
          className="w-full rounded-xl border border-white/15 bg-slate-950/65 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
        />
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2.5 font-mono text-xs font-medium text-emerald-300 hover:bg-emerald-500/25 shrink-0">
          <UploadCloud className="h-4 w-4" />
          <span>{uploading ? "Yuklanmoqda..." : "Fayl Tanlash"}</span>
          <input
            type="file"
            accept="image/*,.svg"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      {url && (
        <p className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" /> Tanlangan manzil: {url}
        </p>
      )}
    </div>
  );
}
