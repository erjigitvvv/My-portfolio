import { z } from "zod";

// Fields used only for anti-spam; they are stripped before anything touches the DB.
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak")
    .max(100, "Ism juda uzun (max 100)"),
  email: z
    .string()
    .trim()
    .email("To'g'ri email manzil kiriting")
    .max(200, "Email juda uzun"),
  subject: z
    .string()
    .trim()
    .min(3, "Mavzu kamida 3 ta belgidan iborat bo'lishi kerak")
    .max(200, "Mavzu juda uzun (max 200)"),
  category: z.enum(["PROJECT", "SECURITY_AUDIT", "AI_CONSULTING", "SPEAKING"]).default("PROJECT"),
  message: z
    .string()
    .trim()
    .min(10, "Xabar matni kamida 10 ta belgidan iborat bo'lishi kerak")
    .max(5000, "Xabar juda uzun (max 5000)"),
  encrypted: z.boolean().optional().default(false),
  // --- anti-spam (never persisted) ---
  website: z.string().optional().default(""), // honeypot: real users leave it empty
  formStartedAt: z.number().optional(), // epoch ms when the form was rendered
});

export type ContactInput = z.infer<typeof contactSchema>;

export const projectSchema = z.object({
  slug: z.string().min(3),
  titleUz: z.string().min(3),
  titleEn: z.string().min(3),
  summaryUz: z.string().min(10),
  summaryEn: z.string().min(10),
  contentUz: z.string().min(10),
  contentEn: z.string().min(10),
  architectureUz: z.string().min(5),
  architectureEn: z.string().min(5),
  category: z.enum(["AI", "CYBERSECURITY", "DEVOPS"]),
  tags: z.string().min(2),
  metrics: z.string().min(2),
  imageUrl: z.string().optional().default(""),
  githubUrl: z.string().optional().default(""),
  liveUrl: z.string().optional().default(""),
  featured: z.boolean().optional().default(true),
});

export const postSchema = z.object({
  slug: z.string().min(3),
  titleUz: z.string().min(3),
  titleEn: z.string().min(3),
  excerptUz: z.string().min(10),
  excerptEn: z.string().min(10),
  contentUz: z.string().min(20),
  contentEn: z.string().min(20),
  category: z.string().min(2),
  tags: z.string().min(2),
  readTime: z.coerce.number().min(1).default(5),
  published: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
});

export const skillSchema = z.object({
  name: z.string().min(2),
  category: z.enum(["AI", "CYBERSECURITY", "DEVOPS", "CORE"]),
  level: z.coerce.number().min(1).max(100),
  icon: z.string().default("Cpu"),
  descriptionUz: z.string().min(5),
  descriptionEn: z.string().min(5),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2),
  heroLine1_uz: z.string().trim().min(1).max(40),
  heroLine1_en: z.string().trim().min(1).max(40),
  heroLine2_uz: z.string().trim().min(1).max(40),
  heroLine2_en: z.string().trim().min(1).max(40),
  availability_uz: z.string().trim().min(1).max(60),
  availability_en: z.string().trim().min(1).max(60),
  rolePill_uz: z.string().trim().min(1).max(80),
  rolePill_en: z.string().trim().min(1).max(80),
  headline_uz: z.string().trim().min(2),
  headline_en: z.string().trim().min(2),
  bio_uz: z.string().trim().min(2),
  bio_en: z.string().trim().min(2),
  about_uz: z.string().trim().default(""),
  about_en: z.string().trim().default(""),
  email: z.string().trim().email(),
  phone: z.string().trim().default(""),
  location: z.string().trim().min(2),
  githubUrl: z.string().trim().default(""),
  linkedinUrl: z.string().trim().default(""),
  telegramUrl: z.string().trim().default(""),
  uptimeStatus: z.string().trim().default(""),
  pgpKey: z.string().trim().default(""),
});

export const certificateSchema = z.object({
  titleUz: z.string().min(3),
  titleEn: z.string().min(3),
  issuer: z.string().min(2),
  issueDate: z.string().min(2),
  credentialId: z.string().min(2),
  credentialUrl: z.string().min(5),
  category: z.enum(["AI", "CYBERSECURITY", "DEVOPS"]),
});

export const resourceSchema = z.object({
  titleUz: z.string().min(3),
  titleEn: z.string().min(3),
  descriptionUz: z.string().min(5),
  descriptionEn: z.string().min(5),
  type: z.enum(["TOOL", "TEMPLATE", "CHEATSHEET", "GUIDE"]),
  category: z.enum(["AI", "CYBERSECURITY", "DEVOPS"]),
  url: z.string().min(3),
  downloadUrl: z.string().optional().default(""),
});

export const speakingSchema = z.object({
  titleUz: z.string().min(3),
  titleEn: z.string().min(3),
  eventUz: z.string().min(3),
  eventEn: z.string().min(3),
  date: z.string().min(3),
  location: z.string().min(2),
  type: z.enum(["KEYNOTE", "WORKSHOP", "PANEL", "WEBINAR"]),
  slidesUrl: z.string().optional().default(""),
  videoUrl: z.string().optional().default(""),
  descriptionUz: z.string().min(5),
  descriptionEn: z.string().min(5),
});
