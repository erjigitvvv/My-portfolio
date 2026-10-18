import { NextResponse } from "next/server";
import { getPosts, getProfile } from "@/lib/queries";

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
      <category>${post.category}</category>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${profile.fullName} // Engineering &amp; Security Blog</title>
    <link>${siteUrl}</link>
    <description>${profile.bioEn}</description>
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
