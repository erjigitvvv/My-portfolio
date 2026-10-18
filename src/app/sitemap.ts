import type { MetadataRoute } from "next";
import { getProjects, getPosts } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locales = ["uz", "en"];
  const staticRoutes = [
    "",
    "/about",
    "/skills",
    "/projects",
    "/blog",
    "/certificates",
    "/resources",
    "/speaking",
    "/contact",
    "/privacy",
  ];

  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }

    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  return entries;
}
