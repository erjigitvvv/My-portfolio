import React from "react";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AICommandTerminal } from "@/components/ui/AICommandTerminal";
import { ScrollProgressBar } from "@/components/ui/ScrollReveal";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden">
      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Ambient Liquid Glass Morphing Blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="animate-liquid-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div
          className="animate-liquid-blob absolute top-1/3 -right-28 h-[28rem] w-[28rem] rounded-full bg-[var(--peach)]/15 blur-3xl"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="animate-liquid-blob absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl"
          style={{ animationDelay: "-10s" }}
        />
      </div>

      <Header locale={locale} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-20 sm:px-6">
        {children}
      </main>
      <Footer locale={locale} />
      <AICommandTerminal locale={locale} />
    </div>
  );
}

