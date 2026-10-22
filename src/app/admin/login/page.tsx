"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      const cb = searchParams.get("callbackUrl");
      // only same-site admin paths are allowed (prevents open redirect)
      router.push(cb && cb.startsWith("/admin") && !cb.startsWith("//") ? cb : "/admin");
      router.refresh();
    } catch {
      setError("Authentication server unreachable");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15 shadow-[0_0_30px_rgba(0,245,212,0.25)]">
            <Shield className="h-7 w-7 text-emerald-400" />
          </div>
          <Badge variant="cyber" pulse>
            ZERO-TRUST ADMIN PORTAL
          </Badge>
          <h1 className="text-2xl font-extrabold text-white">
            Command Center Authentication
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Authorized AI & SecOps Personnel Only
          </p>
        </div>

        <GlassCard variant="cyber" padding="lg">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-slate-300">
                Root Admin Email
              </label>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-2.5 font-mono text-sm text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-slate-300">
                Master Passphrase
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-2.5 font-mono text-sm text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-rose-500/40 bg-rose-500/15 p-3 font-mono text-xs text-rose-300">
                ⚠️ {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              <Lock className="h-4 w-4" />
              <span>{loading ? "Verifying Token..." : "Authenticate & Enter"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

          </form>
        </GlassCard>

        <div className="text-center">
          <Link
            href="/uz"
            className="font-mono text-xs text-slate-400 hover:text-emerald-400"
          >
            ← Public Portfolioga Qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  // useSearchParams() requires a Suspense boundary for static prerendering.
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
