"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import prisma from "../db";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getAdminSession,
  verifyAdminCredentials,
} from "../auth";
import {
  certificateSchema,
  contactSchema,
  postSchema,
  projectSchema,
  resourceSchema,
  skillSchema,
  speakingSchema,
} from "../validators";
import { sendContactNotification } from "../notify";

function requireAdmin() {
  const session = getAdminSession();
  if (!session) {
    throw new Error("Unauthorized: Admin session required");
  }
  return session;
}

// 1. Auth Actions
export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const session = await verifyAdminCredentials(email, password);
  if (!session) {
    return { ok: false, error: "Email yoki parol noto'g'ri!" };
  }

  const token = createSessionToken(session);
  cookies().set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { ok: true };
}

export async function logoutAdminAction() {
  cookies().delete(ADMIN_COOKIE_NAME);
  revalidatePath("/admin");
  return { ok: true };
}

// 2. Public Interactive Actions
export async function submitContactAction(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message || "Ma'lumotlar xato kiritildi",
    };
  }

  const msg = await prisma.contactMessage.create({
    data: parsed.data,
  });

  await prisma.message.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      body: parsed.data.message,
      isRead: false,
    },
  });

  await sendContactNotification(parsed.data);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");

  return { ok: true, id: msg.id };
}

export async function incrementPostReactionAction(slug: string, type: "view" | "like") {
  try {
    const updated = await prisma.post.update({
      where: { slug },
      data: type === "like" ? { likes: { increment: 1 } } : { views: { increment: 1 } },
    });
    revalidatePath(`/uz/blog/${slug}`);
    revalidatePath(`/en/blog/${slug}`);
    return { ok: true, views: updated.views, likes: updated.likes };
  } catch {
    return { ok: false };
  }
}

export async function incrementProjectViewAction(slug: string) {
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
  try {
    const res = await prisma.resource.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });
    revalidatePath("/uz/resources");
    revalidatePath("/en/resources");
    return { ok: true, downloads: res.downloads };
  } catch {
    return { ok: false };
  }
}

// 3. Admin CRUD Actions
export async function createProjectAction(formData: FormData): Promise<void> {
  requireAdmin();
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
}

export async function deleteProjectAction(id: string): Promise<void> {
  requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/uz");
  revalidatePath("/en");
  revalidatePath("/uz/projects");
  revalidatePath("/en/projects");
  revalidatePath("/admin/projects");
}

export async function createPostAction(formData: FormData): Promise<void> {
  requireAdmin();
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
}

export async function deletePostAction(id: string): Promise<void> {
  requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/uz/blog");
  revalidatePath("/en/blog");
  revalidatePath("/admin/blog");
}

export async function createSkillAction(formData: FormData): Promise<void> {
  requireAdmin();
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
}

export async function deleteSkillAction(id: string): Promise<void> {
  requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/uz/skills");
  revalidatePath("/en/skills");
  revalidatePath("/admin/skills");
}

export async function createCertificateAction(formData: FormData): Promise<void> {
  requireAdmin();
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
}

export async function deleteCertificateAction(id: string): Promise<void> {
  requireAdmin();
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/uz/certificates");
  revalidatePath("/en/certificates");
  revalidatePath("/admin/certificates");
}

export async function createResourceAction(formData: FormData): Promise<void> {
  requireAdmin();
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
}

export async function deleteResourceAction(id: string): Promise<void> {
  requireAdmin();
  await prisma.resource.delete({ where: { id } });
  revalidatePath("/uz/resources");
  revalidatePath("/en/resources");
  revalidatePath("/admin/resources");
}

export async function createSpeakingAction(formData: FormData): Promise<void> {
  requireAdmin();
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
  await prisma.talk.create({
    data: {
      title_uz: parsed.titleUz,
      title_en: parsed.titleEn,
      description_uz: parsed.descriptionUz,
      description_en: parsed.descriptionEn,
      eventName: parsed.eventEn,
      date: parsed.date,
      location: parsed.location,
      slidesUrl: parsed.slidesUrl,
      videoUrl: parsed.videoUrl,
    },
  });

  revalidatePath("/uz/speaking");
  revalidatePath("/en/speaking");
  revalidatePath("/admin/speaking");
}

export async function deleteSpeakingAction(id: string): Promise<void> {
  requireAdmin();
  await prisma.speaking.delete({ where: { id } });
  revalidatePath("/uz/speaking");
  revalidatePath("/en/speaking");
  revalidatePath("/admin/speaking");
}

export async function markMessageReadAction(id: string): Promise<void> {
  requireAdmin();
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessageAction(id: string): Promise<void> {
  requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function updateProfileAction(formData: FormData): Promise<void> {
  requireAdmin();
  const fullName = String(formData.get("fullName") || "");
  const roleUz = String(formData.get("roleUz") || "");
  const roleEn = String(formData.get("roleEn") || "");
  const bioUz = String(formData.get("bioUz") || "");
  const bioEn = String(formData.get("bioEn") || "");

  await prisma.profile.update({
    where: { id: "main" },
    data: {
      name: fullName,
      headline_uz: roleUz,
      headline_en: roleEn,
      bio_uz: bioUz,
      bio_en: bioEn,
      fullName,
      roleUz,
      roleEn,
      bioUz,
      bioEn,
      aboutUz: String(formData.get("aboutUz") || ""),
      aboutEn: String(formData.get("aboutEn") || ""),
      location: String(formData.get("location") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      githubUrl: String(formData.get("githubUrl") || ""),
      linkedinUrl: String(formData.get("linkedinUrl") || ""),
      telegramUrl: String(formData.get("telegramUrl") || ""),
      uptimeStatus: String(formData.get("uptimeStatus") || ""),
      pgpKey: String(formData.get("pgpKey") || ""),
    },
  });
  revalidatePath("/uz");
  revalidatePath("/en");
  revalidatePath("/uz/about");
  revalidatePath("/en/about");
  revalidatePath("/admin/settings");
}
