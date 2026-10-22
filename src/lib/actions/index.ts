"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import prisma from "../db";
import { getClientIp, rateLimit } from "../rate-limit";
import { ADMIN_COOKIE_NAME, getAdminSession } from "../auth";
import {
  certificateSchema,
  postSchema,
  profileSchema,
  projectSchema,
  resourceSchema,
  skillSchema,
  speakingSchema,
} from "../validators";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized: Admin session required");
  }
  return session;
}

// 1. Auth Actions (login is handled by POST /api/auth, which is rate-limited)
export async function logoutAdminAction() {
  cookies().delete(ADMIN_COOKIE_NAME);
  revalidatePath("/admin");
  return { ok: true };
}

/** Invalidate every cached public page (cheap: this is a low-write CMS). */
function revalidateSite() {
  revalidatePath("/", "layout");
}

function clientIp() {
  return getClientIp(headers());
}

// 2. Public Interactive Actions
export async function incrementPostReactionAction(slug: string, type: "view" | "like") {
  const windowMs = type === "like" ? 60 * 60 * 1000 : 60 * 1000;
  if (!rateLimit(`post:${type}:${clientIp()}:${slug}`, 1, windowMs).allowed) {
    return { ok: false };
  }
  try {
    const updated = await prisma.post.update({
      where: { slug },
      data: type === "like" ? { likes: { increment: 1 } } : { views: { increment: 1 } },
    });
    return { ok: true, views: updated.views, likes: updated.likes };
  } catch {
    return { ok: false };
  }
}

export async function incrementProjectViewAction(slug: string) {
  if (!rateLimit(`project:view:${clientIp()}:${slug}`, 1, 60 * 1000).allowed) {
    return { ok: false };
  }
  try {
    await prisma.project.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function incrementResourceDownloadAction(id: string) {
  if (!rateLimit(`resource:dl:${clientIp()}:${id}`, 3, 60 * 1000).allowed) {
    return { ok: false };
  }
  try {
    const res = await prisma.resource.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });
    return { ok: true, downloads: res.downloads };
  } catch {
    return { ok: false };
  }
}

// 3. Admin CRUD Actions
export async function createProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const raw = {
    slug: String(formData.get("slug") || "")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-"),
    titleUz: String(formData.get("titleUz") || ""),
    titleEn: String(formData.get("titleEn") || ""),
    summaryUz: String(formData.get("summaryUz") || ""),
    summaryEn: String(formData.get("summaryEn") || ""),
    contentUz: String(formData.get("contentUz") || ""),
    contentEn: String(formData.get("contentEn") || ""),
    architectureUz: String(formData.get("architectureUz") || ""),
    architectureEn: String(formData.get("architectureEn") || ""),
    category: String(formData.get("category") || "AI"),
    tags: String(formData.get("tags") || ""),
    metrics: String(formData.get("metrics") || ""),
    imageUrl: String(formData.get("imageUrl") || ""),
    githubUrl: String(formData.get("githubUrl") || ""),
    liveUrl: String(formData.get("liveUrl") || ""),
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
  };

  const parsed = projectSchema.parse(raw);
  await prisma.project.create({
    data: {
      ...parsed,
      title_uz: parsed.titleUz,
      title_en: parsed.titleEn,
      summary_uz: parsed.summaryUz,
      summary_en: parsed.summaryEn,
      description_uz: parsed.contentUz,
      description_en: parsed.contentEn,
      coverImage: parsed.imageUrl,
      repoUrl: parsed.githubUrl,
    },
  });

  revalidatePath("/uz");
  revalidatePath("/en");
  revalidatePath("/uz/projects");
  revalidatePath("/en/projects");
  revalidatePath("/admin/projects");
  revalidateSite();
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/uz");
  revalidatePath("/en");
  revalidatePath("/uz/projects");
  revalidatePath("/en/projects");
  revalidatePath("/admin/projects");
  revalidateSite();
}

export async function createPostAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const raw = {
    slug: String(formData.get("slug") || "")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-"),
    titleUz: String(formData.get("titleUz") || ""),
    titleEn: String(formData.get("titleEn") || ""),
    excerptUz: String(formData.get("excerptUz") || ""),
    excerptEn: String(formData.get("excerptEn") || ""),
    contentUz: String(formData.get("contentUz") || ""),
    contentEn: String(formData.get("contentEn") || ""),
    category: String(formData.get("category") || "AI Research"),
    tags: String(formData.get("tags") || ""),
    readTime: Number(formData.get("readTime") || 6),
    published: formData.get("published") !== "false",
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
  };

  const parsed = postSchema.parse(raw);
  await prisma.post.create({
    data: {
      ...parsed,
      title_uz: parsed.titleUz,
      title_en: parsed.titleEn,
      excerpt_uz: parsed.excerptUz,
      excerpt_en: parsed.excerptEn,
      content_uz: parsed.contentUz,
      content_en: parsed.contentEn,
      readingTime: parsed.readTime,
    },
  });

  revalidatePath("/uz");
  revalidatePath("/en");
  revalidatePath("/uz/blog");
  revalidatePath("/en/blog");
  revalidatePath("/admin/blog");
  revalidateSite();
}

export async function deletePostAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/uz/blog");
  revalidatePath("/en/blog");
  revalidatePath("/admin/blog");
  revalidateSite();
}

export async function createSkillAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const raw = {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || "AI"),
    level: Number(formData.get("level") || 90),
    icon: String(formData.get("icon") || "Cpu"),
    descriptionUz: String(formData.get("descriptionUz") || ""),
    descriptionEn: String(formData.get("descriptionEn") || ""),
  };
  const parsed = skillSchema.parse(raw);
  await prisma.skill.create({ data: parsed });

  revalidatePath("/uz/skills");
  revalidatePath("/en/skills");
  revalidatePath("/admin/skills");
  revalidateSite();
}

export async function deleteSkillAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/uz/skills");
  revalidatePath("/en/skills");
  revalidatePath("/admin/skills");
  revalidateSite();
}

export async function createCertificateAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const raw = {
    titleUz: String(formData.get("titleUz") || ""),
    titleEn: String(formData.get("titleEn") || ""),
    issuer: String(formData.get("issuer") || ""),
    issueDate: String(formData.get("issueDate") || ""),
    credentialId: String(formData.get("credentialId") || ""),
    credentialUrl: String(formData.get("credentialUrl") || ""),
    category: String(formData.get("category") || "CYBERSECURITY"),
  };
  const parsed = certificateSchema.parse(raw);
  await prisma.certificate.create({
    data: {
      ...parsed,
      title_uz: parsed.titleUz,
      title_en: parsed.titleEn,
    },
  });

  revalidatePath("/uz/certificates");
  revalidatePath("/en/certificates");
  revalidatePath("/admin/certificates");
  revalidateSite();
}

export async function deleteCertificateAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/uz/certificates");
  revalidatePath("/en/certificates");
  revalidatePath("/admin/certificates");
  revalidateSite();
}

export async function createResourceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const raw = {
    titleUz: String(formData.get("titleUz") || ""),
    titleEn: String(formData.get("titleEn") || ""),
    descriptionUz: String(formData.get("descriptionUz") || ""),
    descriptionEn: String(formData.get("descriptionEn") || ""),
    type: String(formData.get("type") || "TEMPLATE"),
    category: String(formData.get("category") || "DEVOPS"),
    url: String(formData.get("url") || ""),
    downloadUrl: String(formData.get("downloadUrl") || ""),
  };
  const parsed = resourceSchema.parse(raw);
  await prisma.resource.create({
    data: {
      ...parsed,
      title_uz: parsed.titleUz,
      title_en: parsed.titleEn,
      description_uz: parsed.descriptionUz,
      description_en: parsed.descriptionEn,
    },
  });

  revalidatePath("/uz/resources");
  revalidatePath("/en/resources");
  revalidatePath("/admin/resources");
  revalidateSite();
}

export async function deleteResourceAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.resource.delete({ where: { id } });
  revalidatePath("/uz/resources");
  revalidatePath("/en/resources");
  revalidatePath("/admin/resources");
  revalidateSite();
}

export async function createSpeakingAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const raw = {
    titleUz: String(formData.get("titleUz") || ""),
    titleEn: String(formData.get("titleEn") || ""),
    eventUz: String(formData.get("eventUz") || ""),
    eventEn: String(formData.get("eventEn") || ""),
    date: String(formData.get("date") || ""),
    location: String(formData.get("location") || ""),
    type: String(formData.get("type") || "KEYNOTE"),
    slidesUrl: String(formData.get("slidesUrl") || ""),
    videoUrl: String(formData.get("videoUrl") || ""),
    descriptionUz: String(formData.get("descriptionUz") || ""),
    descriptionEn: String(formData.get("descriptionEn") || ""),
  };
  const parsed = speakingSchema.parse(raw);
  await prisma.speaking.create({ data: parsed });

  revalidatePath("/uz/speaking");
  revalidatePath("/en/speaking");
  revalidatePath("/admin/speaking");
  revalidateSite();
}

export async function deleteSpeakingAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.speaking.delete({ where: { id } });
  revalidatePath("/uz/speaking");
  revalidatePath("/en/speaking");
  revalidatePath("/admin/speaking");
  revalidateSite();
}

export async function markMessageReadAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessageAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function updateProfileAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const str = (key: string) => String(formData.get(key) ?? "");

  // Every field (hero lines, availability pill, role pill, ...) is editable and
  // validated, so the public Hero reflects exactly what the admin saved.
  const parsed = profileSchema.parse({
    name: str("name"),
    heroLine1_uz: str("heroLine1_uz"),
    heroLine1_en: str("heroLine1_en"),
    heroLine2_uz: str("heroLine2_uz"),
    heroLine2_en: str("heroLine2_en"),
    availability_uz: str("availability_uz"),
    availability_en: str("availability_en"),
    rolePill_uz: str("rolePill_uz"),
    rolePill_en: str("rolePill_en"),
    headline_uz: str("headline_uz"),
    headline_en: str("headline_en"),
    bio_uz: str("bio_uz"),
    bio_en: str("bio_en"),
    about_uz: str("about_uz"),
    about_en: str("about_en"),
    email: str("email"),
    phone: str("phone"),
    location: str("location"),
    githubUrl: str("githubUrl"),
    linkedinUrl: str("linkedinUrl"),
    telegramUrl: str("telegramUrl"),
    uptimeStatus: str("uptimeStatus"),
    pgpKey: str("pgpKey"),
  });

  await prisma.profile.update({ where: { id: "main" }, data: parsed });

  revalidatePath("/uz");
  revalidatePath("/en");
  revalidatePath("/uz/about");
  revalidatePath("/en/about");
  revalidatePath("/uz/contact");
  revalidatePath("/en/contact");
  revalidatePath("/rss.xml");
  revalidatePath("/admin/settings");
  revalidateSite();
}
