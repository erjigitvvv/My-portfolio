import React from "react";
import type { Metadata } from "next";
import { PerspectiveGrid } from "@/components/ui/PerspectiveGrid";
import { MacOSCursor } from "@/components/ui/MacOSCursor";
import "./globals.css";

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
      suppressHydrationWarning
    >
      <body className="relative min-h-screen overflow-x-hidden antialiased font-sans">
        <MacOSCursor />
        <PerspectiveGrid />
        {children}
      </body>
    </html>
  );
}

