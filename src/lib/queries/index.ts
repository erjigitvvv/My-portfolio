import prisma from "../db";

export async function getProfile() {
  try {
    let profile = await prisma.profile.findUnique({ where: { id: "main" } });
    if (!profile) {
      const headlineUz = "AI Muhandis • Kiberxavfsizlik Arxitektori • Senior DevSecOps";
      const headlineEn = "AI Engineer • Cybersecurity Architect • Senior DevSecOps";
      const bioUz =
        "Avtonom AI agentlar, Zero-Trust tarmoq himoyasi va yuqori yuklamali Kubernetes bulutli infratuzilmalarini loyihalovchi muhandis.";
      const bioEn =
        "Engineering autonomous AI agents, Zero-Trust security architectures, and mission-critical Kubernetes cloud infrastructure at scale.";
      profile = await prisma.profile.create({
        data: {
          id: "main",
          name: "Erjigitov Mirhamid",
          heroLine1_uz: "MIRHAMID",
          heroLine1_en: "MIRHAMID",
          heroLine2_uz: "ERJIGITOV *26",
          heroLine2_en: "ERJIGITOV *26",
          headline_uz: headlineUz,
          headline_en: headlineEn,
          bio_uz: bioUz,
          bio_en: bioEn,
          email: "mirhamid@cyberai.dev",
          location: "Tashkent, Uzbekistan • Remote Worldwide",
          socials: JSON.stringify({
            github: "https://github.com/mirhamid-erjigitov",
            linkedin: "https://linkedin.com/in/mirhamid-erjigitov",
            telegram: "https://t.me/mirhamid_erjigitov",
          }),
          fullName: "Erjigitov Mirhamid",
          roleUz: headlineUz,
          roleEn: headlineEn,
          bioUz,
          bioEn,
          aboutUz: bioUz,
          aboutEn: bioEn,
          phone: "+998 (90) 123-45-67",
          githubUrl: "https://github.com/mirhamid-erjigitov",
          linkedinUrl: "https://linkedin.com/in/mirhamid-erjigitov",
          telegramUrl: "https://t.me/mirhamid_erjigitov",
          pgpKey: "4F9A 82C1 E77B 091D 33A4 98C2 B110 77E5 MIRH A260",
        },
      });
    }
    return profile;
  } catch (error) {
    console.error("getProfile error:", error);
    return {
      id: "main",
      name: "Erjigitov Mirhamid",
      heroLine1_uz: "MIRHAMID",
      heroLine1_en: "MIRHAMID",
      heroLine2_uz: "ERJIGITOV *26",
      heroLine2_en: "ERJIGITOV *26",
      headline_uz: "AI Muhandis • Kiberxavfsizlik Arxitektori • Senior DevSecOps",
      headline_en: "AI Engineer • Cybersecurity Architect • Senior DevSecOps",
      bio_uz:
        "Avtonom AI agentlar, Zero-Trust tarmoq himoyasi va yuqori yuklamali Kubernetes bulutli infratuzilmalarini loyihalovchi muhandis.",
      bio_en:
        "Engineering autonomous AI agents, Zero-Trust security architectures, and mission-critical Kubernetes cloud infrastructure at scale.",
      avatarUrl: "/avatar.svg",
      cvUrl_uz: "/cv-uz.pdf",
      cvUrl_en: "/cv-en.pdf",
      email: "mirhamid@cyberai.dev",
      location: "Tashkent, Uzbekistan",
      socials: "{}",
      fullName: "Erjigitov Mirhamid",
      roleUz: "AI Muhandis • Kiberxavfsizlik Arxitektori • Senior DevSecOps",
      roleEn: "AI Engineer • Cybersecurity Architect • Senior DevSecOps",
      bioUz: "Avtonom AI agentlar va Zero-Trust xavfsizlik arxitekturasi.",
      bioEn: "Autonomous AI agents and Zero-Trust security architecture.",
      aboutUz: "AI muhandisligi, Kiberxavfsizlik va DevSecOps bo'yicha 6+ yillik tajriba.",
      aboutEn: "6+ years of experience across AI Engineering, Cybersecurity, and DevSecOps.",
      resumeUrlUz: "/cv-uz.pdf",
      resumeUrlEn: "/cv-en.pdf",
      phone: "+998 (90) 123-45-67",
      githubUrl: "https://github.com/mirhamid-erjigitov",
      linkedinUrl: "https://linkedin.com/in/mirhamid-erjigitov",
      telegramUrl: "https://t.me/mirhamid_erjigitov",
      pgpKey: "4F9A 82C1 E77B 091D 33A4 98C2 B110 77E5 MIRH A260",
      uptimeStatus: "99.98% • Zero-Trust Active",
      yearsExp: 6,
      projectsCount: 44,
      certsCount: 12,
      securityAudits: 88,
      updatedAt: new Date(),
    };
  }
}

export async function getSkills(category?: string) {
  try {
    return await prisma.skill.findMany({
      where: category && category !== "ALL" ? { category } : undefined,
      include: { projects: true },
      orderBy: [{ order: "asc" }, { level: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getExperiences() {
  try {
    return await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getProjects(category?: string, featuredOnly = false) {
  try {
    return await prisma.project.findMany({
      where: {
        ...(category && category !== "ALL" ? { category } : {}),
        ...(featuredOnly ? { featured: true } : {}),
      },
      include: { skills: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findUnique({
      where: { slug },
      include: { skills: true },
    });
  } catch {
    return null;
  }
}

export async function getPosts(publishedOnly = true) {
  try {
    return await prisma.post.findMany({
      where: publishedOnly ? { published: true } : undefined,
      include: { tagsRelation: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug },
      include: { tagsRelation: true },
    });
  } catch {
    return null;
  }
}

export async function getCertificates() {
  try {
    return await prisma.certificate.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getResources() {
  try {
    return await prisma.resource.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getSpeakings() {
  try {
    return await prisma.speaking.findMany({
      orderBy: { date: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getPageByKey(key: string) {
  try {
    return await prisma.page.findUnique({
      where: { key },
    });
  } catch {
    return null;
  }
}

export async function getContactMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getDashboardStats() {
  try {
    const [
      projectsCount,
      postsCount,
      skillsCount,
      certsCount,
      resourcesCount,
      speakingCount,
      messagesCount,
      unreadMessagesCount,
      projects,
      posts,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.post.count(),
      prisma.skill.count(),
      prisma.certificate.count(),
      prisma.resource.count(),
      prisma.speaking.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.project.findMany({ select: { views: true } }),
      prisma.post.findMany({ select: { views: true, likes: true } }),
    ]);

    const totalProjectViews = projects.reduce((acc, p) => acc + p.views, 0);
    const totalPostViews = posts.reduce((acc, p) => acc + p.views, 0);
    const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0);

    return {
      projectsCount,
      postsCount,
      skillsCount,
      certsCount,
      resourcesCount,
      speakingCount,
      messagesCount,
      unreadMessagesCount,
      totalViews: totalProjectViews + totalPostViews,
      totalLikes,
    };
  } catch {
    return {
      projectsCount: 0,
      postsCount: 0,
      skillsCount: 0,
      certsCount: 0,
      resourcesCount: 0,
      speakingCount: 0,
      messagesCount: 0,
      unreadMessagesCount: 0,
      totalViews: 0,
      totalLikes: 0,
    };
  }
}
