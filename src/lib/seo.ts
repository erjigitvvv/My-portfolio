import type { Metadata } from "next";

interface SeoProps {
  title: string;
  description: string;
  locale?: string;
  path?: string;
}

export function constructMetadata({
  title,
  description,
  locale = "uz",
  path = "",
}: SeoProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = "Sardorbek Alimov // AI • Cybersecurity • DevOps";
  const fullTitle = `${title} | ${siteName}`;
  const url = `${siteUrl}/${locale}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        uz: `${siteUrl}/uz${path}`,
        en: `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: locale === "en" ? "en_US" : "uz_UZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
