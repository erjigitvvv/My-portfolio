import React from "react";

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-mono text-xs font-medium text-slate-300">
        {label} {required && <span className="text-emerald-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/15 bg-slate-950/65 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
      />
    </div>
  );
}

export function FormSelect({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-mono text-xs font-medium text-slate-300">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-white/15 bg-slate-950/85 px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-slate-900">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FormTextarea({
  label,
  name,
  rows = 3,
  placeholder,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-mono text-xs font-medium text-slate-300">
        {label} {required && <span className="text-emerald-400">*</span>}
      </label>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/15 bg-slate-950/65 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
      />
    </div>
  );
}
