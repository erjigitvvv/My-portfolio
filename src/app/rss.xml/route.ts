import { NextResponse } from "next/server";
import { getPosts, getProfile } from "@/lib/queries";

export const revalidate = 3600;

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [posts, profile] = await Promise.all([getPosts(true), getProfile()]);

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.titleEn}]]></title>
      <link>${siteUrl}/en/blog/${post.slug}</link>
      <guid>${siteUrl}/en/blog/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerptEn}]]></description>
      <category>${esc(post.category)}</category>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${esc(profile.name)} // Engineering &amp; Security Blog</title>
    <link>${siteUrl}</link>
    <description>${esc(profile.bio_en)}</description>
    <language>en-us</language>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
