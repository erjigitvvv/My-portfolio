"use client";

import React from "react";
import { GlassCard } from "../ui/GlassCard";

interface AdminTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  title: string;
  subtitle?: string;
  columns: AdminTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
}

export function AdminTable<T>({
  title,
  subtitle,
  columns,
  data,
  keyExtractor,
}: AdminTableProps<T>) {
  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        <span className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-300">
          {data.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-200">
          <thead className="border-b border-white/10 bg-slate-950/50 font-mono text-xs uppercase text-slate-400">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3.5">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center font-mono text-xs text-slate-500"
                >
                  Hozircha ma&apos;lumot mavjud emas.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="transition hover:bg-white/[0.03]"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 align-middle">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
