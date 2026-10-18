"use client";

import React, { useState } from "react";
import { Eye, Code2 } from "lucide-react";

export function MarkdownEditor({
  label,
  name,
  defaultValue = "",
  placeholder = "## Markdown yozing...",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [preview, setPreview] = useState(false);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs font-medium text-slate-300">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-emerald-300 hover:bg-white/10"
        >
          {preview ? (
            <>
              <Code2 className="h-3.5 w-3.5" /> Edit Markdown
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" /> Live Preview
            </>
          )}
        </button>
      </div>

      <input type="hidden" name={name} value={value} />

      {preview ? (
        <div className="min-h-[160px] rounded-xl border border-emerald-400/30 bg-slate-950/80 p-4 prose prose-invert max-w-none text-sm whitespace-pre-wrap text-slate-200">
          {value || "Preview bo'sh..."}
        </div>
      ) : (
        <textarea
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/15 bg-slate-950/65 p-3.5 font-mono text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
        />
      )}
    </div>
  );
}
