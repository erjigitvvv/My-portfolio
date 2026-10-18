import React from "react";
import type { Metadata } from "next";
import { Archivo, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { PerspectiveGrid } from "@/components/ui/PerspectiveGrid";
import { MacOSCursor } from "@/components/ui/MacOSCursor";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Erjigitov Mirhamid // AI • Cybersecurity • DevOps Portfolio",
  description:
    "Erjigitov Mirhamid — Bilingual dynamic personal portfolio: Autonomous AI Engineering, Cybersecurity & DevOps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uz"
      data-theme="light"
      className={`${archivo.variable} ${jakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen overflow-x-hidden antialiased">
        <MacOSCursor />
        <PerspectiveGrid />
        {children}
      </body>
    </html>
  );
}

