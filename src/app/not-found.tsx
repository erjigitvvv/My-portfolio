import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <GlassCard variant="cyber" padding="lg" className="max-w-lg text-center space-y-5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-400">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
          ERROR 404 // ZERO-TRUST PERIMETER
        </p>
        <h1 className="text-3xl font-extrabold text-white">
          Node Not Found in Cluster
        </h1>
        <p className="text-sm text-slate-300">
          Siz qidirayotgan sahifa mavjud emas yoki xavfsizlik protokoli orqali ko&apos;chirilgan.
        </p>
        <div className="pt-2">
          <Link href="/uz">
            <Button variant="primary">
              <ArrowLeft className="h-4 w-4" />
              <span>Bosh sahifaga qaytish</span>
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
