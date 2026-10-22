import React from "react";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AICommandTerminal } from "@/components/ui/AICommandTerminal";
import { ScrollProgressBar } from "@/components/ui/ScrollReveal";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

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
    <SmoothScrollProvider>
      <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]">
        {/* Top Scroll Progress Bar */}
        <ScrollProgressBar />

        <Header locale={locale} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-16 sm:px-6 overflow-visible">
          {children}
        </main>
        <Footer locale={locale} />
        <AICommandTerminal locale={locale} />
      </div>
    </SmoothScrollProvider>
  );
}
