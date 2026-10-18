import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  email: z.string().email("To'g'ri email manzil kiriting"),
  subject: z.string().min(3, "Mavzu kamida 3 ta belgidan iborat bo'lishi kerak"),
  category: z.enum(["PROJECT", "SECURITY_AUDIT", "AI_CONSULTING", "SPEAKING"]).default("PROJECT"),
  message: z.string().min(10, "Xabar matni kamida 10 ta belgidan iborat bo'lishi kerak"),
  encrypted: z.boolean().optional().default(false),
});

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
