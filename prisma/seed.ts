import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${derivedKey}`;
}

async function main() {
  console.log("🚀 Stage 1 Seed: Initializing bilingual database & hashed admin user...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@cyberai.dev";
  const adminPassword = process.env.ADMIN_PASSWORD || "CyberAdmin2026!Secure";
  const hashed = hashPassword(adminPassword);

  // 1. User (Single Admin User with hashed password)
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: hashed, name: "Erjigitov Mirhamid (Admin)", role: "SUPERADMIN" },
    create: {
      email: adminEmail,
      name: "Erjigitov Mirhamid (Admin)",
      passwordHash: hashed,
      role: "SUPERADMIN",
    },
  });

  // 2. Profile (Single row)
  const headlineUz = "AI Muhandis • Kiberxavfsizlik Arxitektori • Senior DevSecOps";
  const headlineEn = "AI Engineer • Cybersecurity Architect • Senior DevSecOps";
  const bioUz =
    "Avtonom AI agentlar, Zero-Trust tarmoq himoyasi va yuqori yuklamali Kubernetes bulutli infratuzilmalarini loyihalovchi muhandis.";
  const bioEn =
    "Engineering autonomous AI agents, Zero-Trust security architectures, and mission-critical Kubernetes cloud infrastructure at scale.";
  const aboutUz = `Men Erjigitov Mirhamid — 6+ yillik tajribaga ega AI muhandisi, Kiberxavfsizlik tadqiqotchisi va DevSecOps arxitektoriman. Mening asosiy maqsadim — sun'iy intellekt tizimlarini (LLM, RAG, MLOps) kiber-hujumlarga chidamli, avtomatlashtirilgan va yuqori tezlikda ishlovchi bulutli infratuzilmada qurishdir.`;
  const aboutEn = `I am Erjigitov Mirhamid — an AI Engineer, Cybersecurity Architect, and DevSecOps Specialist with 6+ years of hands-on experience designing resilient systems across Autonomous AI (LLMs, RAG pipelines, MLOps), Offensive/Defensive Security (Zero-Trust, Pentesting, eBPF), and Cloud-Native Infrastructure (Kubernetes, Terraform, GitOps).`;

  const specialtiesUz = JSON.stringify([
    "01 / Avtonom AI & RAG Tizimlari",
    "02 / Kiberxavfsizlik & Pentest (OSCP)",
    "03 / Zero-Trust Kubernetes (CKS)",
    "04 / DevSecOps & Bulutli Arxitektura",
  ]);
  const specialtiesEn = JSON.stringify([
    "01 / Autonomous AI & RAG Systems",
    "02 / Offensive Security & Pentesting",
    "03 / Zero-Trust Kubernetes (CKS)",
    "04 / DevSecOps & Cloud Architecture",
  ]);
  const avatarConfigJson = JSON.stringify({
    style: "3d-clay-vinyl",
    hasBeanie: true,
    eyeRadius: 8,
    blushColor: "#F2A98C",
  });

  const profileData = {
    name: "Erjigitov Mirhamid",
    heroLine1_uz: "MIRHAMID",
    heroLine1_en: "MIRHAMID",
    heroLine2_uz: "ERJIGITOV *26",
    heroLine2_en: "ERJIGITOV *26",
    availability_uz: "Loyihalarga ochiq*",
    availability_en: "Open to work*",
    rolePill_uz: "AI • KIBERXAVFSIZLIK • DEVOPS",
    rolePill_en: "AI • CYBERSECURITY • DEVOPS",
    headline_uz: headlineUz,
    headline_en: headlineEn,
    bio_uz: bioUz,
    bio_en: bioEn,
    about_uz: aboutUz,
    about_en: aboutEn,
    specialties_uz: specialtiesUz,
    specialties_en: specialtiesEn,
    avatarConfig: avatarConfigJson,
    avatarUrl: "/avatar.svg",
    cvUrl_uz: "/cv-uz.pdf",
    cvUrl_en: "/cv-en.pdf",
    email: "mirhamid@cyberai.dev",
    phone: "+998 (90) 123-45-67",
    location: "Tashkent, Uzbekistan • Remote Worldwide",
    githubUrl: "https://github.com/mirhamid-erjigitov",
    linkedinUrl: "https://linkedin.com/in/mirhamid-erjigitov",
    telegramUrl: "https://t.me/mirhamid_erjigitov",
    pgpKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: Erjigitov Mirhamid <mirhamid@cyberai.dev>
Comment: Fingerprint: 4F9A 82C1 E77B 091D 33A4  98C2 B110 77E5 MIRH A260

mQINBGX9CyberAI0BEAC9x7vK2pL9mN4qR8tW1yZ3aB5cD7eF9gH1iJ3kL5mN7oP9
=x9Qz
-----END PGP PUBLIC KEY BLOCK-----`,
    uptimeStatus: "99.98% • Zero-Trust Verified",
  };

  await prisma.profile.upsert({
    where: { id: "main" },
    update: profileData,
    create: { id: "main", ...profileData },
  });

  // Clear child tables for idempotent seed
  await prisma.project.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.speaking.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.page.deleteMany();
  await prisma.media.deleteMany();
  await prisma.setting.deleteMany();

  // 3. Skills
  const skillPyTorch = await prisma.skill.create({
    data: {
      name: "PyTorch, LangChain & Multi-Agent RAG",
      category: "AI",
      level: 96,
      icon: "Brain",
      order: 1,
      descriptionUz: "Korporativ LLM agentlar, Vector DB (pgvector, Qdrant), Fine-tuning (LoRA) va vLLM inference.",
      descriptionEn: "Enterprise LLM agents, Vector DBs (pgvector, Qdrant), Fine-tuning (LoRA), and vLLM inference.",
    },
  });

  const skillSec = await prisma.skill.create({
    data: {
      name: "Offensive Security, OSCP & Linux eBPF",
      category: "CYBERSECURITY",
      level: 95,
      icon: "ShieldAlert",
      order: 2,
      descriptionUz: "Web/API/Cloud pentesting, Red Teaming, Cilium/Falco eBPF va Zero-Trust mTLS arxitekturasi.",
      descriptionEn: "Web/API/Cloud penetration testing, Red Team operations, Cilium/Falco eBPF, and Zero-Trust mTLS.",
    },
  });

  const skillK8s = await prisma.skill.create({
    data: {
      name: "Kubernetes (CKS/CKA), Terraform & ArgoCD GitOps",
      category: "DEVOPS",
      level: 97,
      icon: "Server",
      order: 3,
      descriptionUz: "High-availability K8s klasterlar, Helm, Istio/Cilium, ArgoCD GitOps va GPU auto-scaling.",
      descriptionEn: "High-availability Kubernetes clusters, Helm, Istio/Cilium mesh, ArgoCD GitOps, and GPU scaling.",
    },
  });

  // 4. Projects (Connected many-to-many with Skill)
  await prisma.project.create({
    data: {
      slug: "sentinel-ai-soc-autonomous-agent",
      title_uz: "Sentinel-AI: Avtonom Kiberxavfsizlik (SOC) va Threat Hunting Agenti",
      title_en: "Sentinel-AI: Autonomous SOC & Threat Hunting Multi-Agent System",
      summary_uz: "SIEM loglarini real-vaqtda tahlil qiluvchi va Kubernetes podlarini avtomatik izolyatsiya qiluvchi LLM + eBPF tizimi.",
      summary_en: "Real-time SIEM log analyzer powered by fine-tuned LLMs and eBPF telemetry that autonomously isolates compromised K8s pods.",
      description_uz: "### Muammo va Yechim\neBPF yadrosi va Multi-Agent RAG yordamida MITRE ATT&CK bo'yicha real-vaqtda hujumlarni aniqlash.",
      description_en: "### Problem & Solution\nCombines Linux kernel eBPF telemetry with Multi-Agent RAG mapped to MITRE ATT&CK.",
      coverImage: "/projects/sentinel-ai.svg",
      gallery: JSON.stringify(["/projects/sentinel-ai.svg"]),
      category: "CYBERSECURITY",
      liveUrl: "https://sentinel-demo.cyberai.dev",
      repoUrl: "https://github.com/cyberai-architect/sentinel-ai-soc",
      featured: true,
      order: 1,
      published: true,
      skills: {
        connect: [{ id: skillPyTorch.id }, { id: skillSec.id }, { id: skillK8s.id }],
      },
      titleUz: "Sentinel-AI: Avtonom Kiberxavfsizlik (SOC) va Threat Hunting Agenti",
      titleEn: "Sentinel-AI: Autonomous SOC & Threat Hunting Multi-Agent System",
      summaryUz: "SIEM loglarini real-vaqtda tahlil qiluvchi va Kubernetes podlarini avtomatik izolyatsiya qiluvchi LLM + eBPF tizimi.",
      summaryEn: "Real-time SIEM log analyzer powered by fine-tuned LLMs and eBPF telemetry that autonomously isolates compromised K8s pods.",
      contentUz: "### Muammo va Yechim\neBPF yadrosi va Multi-Agent RAG yordamida MITRE ATT&CK bo'yicha real-vaqtda hujumlarni aniqlash.",
      contentEn: "### Problem & Solution\nCombines Linux kernel eBPF telemetry with Multi-Agent RAG mapped to MITRE ATT&CK.",
      architectureUz: "[Linux Kernel eBPF] ➔ [Kafka] ➔ [Multi-Agent LLM RAG] ➔ [K8s Auto-Quarantine]",
      architectureEn: "[Linux Kernel eBPF] ➔ [Kafka] ➔ [Multi-Agent LLM RAG] ➔ [K8s Auto-Quarantine]",
      tags: "PyTorch, LangGraph, eBPF, Falco, Kubernetes, Go",
      metrics: "68% Faster MTTD | 99.4% Threat Recall | <15ms Inference",
      githubUrl: "https://github.com/cyberai-architect/sentinel-ai-soc",
      views: 1420,
    },
  });

  await prisma.project.create({
    data: {
      slug: "aegis-kube-zero-trust-gitops-platform",
      title_uz: "AegisKube: Multi-Region Zero-Trust Kubernetes va MLOps Infratuzilmasi",
      title_en: "AegisKube: Multi-Region Zero-Trust Kubernetes & MLOps Platform",
      summary_uz: "Terraform, ArgoCD, Istio mTLS va HashiCorp Vault asosida qurilgan GPU klaster platformasi.",
      summary_en: "Declarative multi-region Kubernetes platform with strict mTLS, HashiCorp Vault, and GPU auto-scaling.",
      description_uz: "### Arxitektura\n100% GitOps va Sigstore Cosign konteyner imzolash orqali himoyalangan bulutli klaster.",
      description_en: "### Architecture\n100% GitOps platform with Sigstore Cosign container signing and Karpenter GPU scaling.",
      coverImage: "/projects/aegiskube.svg",
      gallery: JSON.stringify(["/projects/aegiskube.svg"]),
      category: "DEVOPS",
      liveUrl: "https://aegiskube.cyberai.dev",
      repoUrl: "https://github.com/cyberai-architect/aegis-kube-gitops",
      featured: true,
      order: 2,
      published: true,
      skills: {
        connect: [{ id: skillK8s.id }, { id: skillSec.id }],
      },
      titleUz: "AegisKube: Multi-Region Zero-Trust Kubernetes va MLOps Infratuzilmasi",
      titleEn: "AegisKube: Multi-Region Zero-Trust Kubernetes & MLOps Platform",
      summaryUz: "Terraform, ArgoCD, Istio mTLS va HashiCorp Vault asosida qurilgan GPU klaster platformasi.",
      summaryEn: "Declarative multi-region Kubernetes platform with strict mTLS, HashiCorp Vault, and GPU auto-scaling.",
      contentUz: "### Arxitektura\n100% GitOps va Sigstore Cosign konteyner imzolash orqali himoyalangan bulutli klaster.",
      contentEn: "### Architecture\n100% GitOps platform with Sigstore Cosign container signing and Karpenter GPU scaling.",
      architectureUz: "[GitHub Actions + Trivy] ➔ [ArgoCD] ➔ [EKS K8s + Cilium mTLS] ➔ [Prometheus]",
      architectureEn: "[GitHub Actions + Trivy] ➔ [ArgoCD] ➔ [EKS K8s + Cilium mTLS] ➔ [Prometheus]",
      tags: "Kubernetes, Terraform, ArgoCD, Cilium, Vault, AWS",
      metrics: "99.99% Uptime | -42% Cloud GPU Cost | 100% GitOps",
      githubUrl: "https://github.com/cyberai-architect/aegis-kube-gitops",
      views: 980,
    },
  });

  // 5. Tags & Posts (Connected many-to-many)
  const tagLlmSec = await prisma.tag.create({
    data: { slug: "llm-security", name_uz: "LLM Xavfsizligi", name_en: "LLM Security" },
  });
  const tagEbpf = await prisma.tag.create({
    data: { slug: "ebpf-k8s", name_uz: "eBPF va Kubernetes", name_en: "eBPF & Kubernetes" },
  });

  await prisma.post.create({
    data: {
      slug: "securing-enterprise-rag-against-indirect-prompt-injection",
      title_uz: "Korporativ RAG va AI Agentlarni Indirect Prompt Injection Hujumlaridan Himoyalash",
      title_en: "Securing Enterprise RAG & AI Agents Against Indirect Prompt Injection",
      excerpt_uz: "OWASP LLM Top-10 ro'yxatidagi #1 xavf — Indirect Prompt Injection va uni ONNX klassifikatorlar bilan to'xtatish.",
      excerpt_en: "Deep technical breakdown of Indirect Prompt Injection in RAG pipelines and how to build multi-layered guardrails.",
      content_uz: "## RAG Tizimlaridagi Xavf\nONNX DeBERTa-v3 va kriptografik kontekst chegaralari orqali himoyalash.",
      content_en: "## The Hidden Threat in Enterprise RAG\nDefending vector pipelines with edge ONNX classifiers and privilege separation.",
      readingTime: 8,
      published: true,
      tagsRelation: {
        connect: [{ id: tagLlmSec.id }],
      },
      titleUz: "Korporativ RAG va AI Agentlarni Indirect Prompt Injection Hujumlaridan Himoyalash",
      titleEn: "Securing Enterprise RAG & AI Agents Against Indirect Prompt Injection",
      excerptUz: "OWASP LLM Top-10 ro'yxatidagi #1 xavf — Indirect Prompt Injection va uni ONNX klassifikatorlar bilan to'xtatish.",
      excerptEn: "Deep technical breakdown of Indirect Prompt Injection in RAG pipelines and how to build multi-layered guardrails.",
      contentUz: "## RAG Tizimlaridagi Xavf\nONNX DeBERTa-v3 va kriptografik kontekst chegaralari orqali himoyalash.",
      contentEn: "## The Hidden Threat in Enterprise RAG\nDefending vector pipelines with edge ONNX classifiers and privilege separation.",
      category: "Cybersecurity / CTF",
      tags: "LLM Security, OWASP, RAG, Python",
      readTime: 8,
      views: 1840,
      likes: 142,
      featured: true,
    },
  });

  await prisma.post.create({
    data: {
      slug: "ebpf-cilium-zero-trust-kubernetes-security",
      title_uz: "Linux eBPF va Cilium Yordamida Kubernetes Klasterlarida Zero-Trust Xavfsizlik",
      title_en: "Zero-Trust Kubernetes Security at Kernel Speed with Linux eBPF & Cilium",
      excerpt_uz: "eBPF yadrosidan foydalanib tarmoq tezligini oshirish va konteyner ichidagi xakerlik harakatlarini bloklash.",
      excerpt_en: "Replacing legacy iptables with eBPF for real-time kernel-level container intrusion prevention.",
      content_uz: "## Nima uchun eBPF?\nLinux yadrosida Cilium va Tetragon orqali L7 va syscall xavfsizligi.",
      content_en: "## Why eBPF?\nKernel-speed L7 network policies and syscall filtering with Cilium Tetragon.",
      readingTime: 10,
      published: true,
      tagsRelation: {
        connect: [{ id: tagEbpf.id }],
      },
      titleUz: "Linux eBPF va Cilium Yordamida Kubernetes Klasterlarida Zero-Trust Xavfsizlik",
      titleEn: "Zero-Trust Kubernetes Security at Kernel Speed with Linux eBPF & Cilium",
      excerptUz: "eBPF yadrosidan foydalanib tarmoq tezligini oshirish va konteyner ichidagi xakerlik harakatlarini bloklash.",
      excerptEn: "Replacing legacy iptables with eBPF for real-time kernel-level container intrusion prevention.",
      contentUz: "## Nima uchun eBPF?\nLinux yadrosida Cilium va Tetragon orqali L7 va syscall xavfsizligi.",
      contentEn: "## Why eBPF?\nKernel-speed L7 network policies and syscall filtering with Cilium Tetragon.",
      category: "DevOps & Cloud",
      tags: "Kubernetes, eBPF, Cilium, Zero-Trust",
      readTime: 10,
      views: 1520,
      likes: 118,
      featured: true,
    },
  });

  // 6. Experience
  await prisma.experience.create({
    data: {
      type: "work",
      organization: "AegisCloud AI & SecOps Labs",
      role_uz: "Lead AI & DevSecOps Architect",
      role_en: "Lead AI & DevSecOps Architect",
      description_uz: "Avtonom AI SOC agentlari va 120+ mikroservisli Zero-Trust Kubernetes klasterini boshqarish.",
      description_en: "Architected autonomous AI SOC agents and multi-region Zero-Trust Kubernetes clusters.",
      startDate: "2024",
      endDate: "Present",
      order: 1,
      company: "AegisCloud AI & SecOps Labs",
      roleUz: "Lead AI & DevSecOps Architect",
      roleEn: "Lead AI & DevSecOps Architect",
      period: "2024 — Present",
      location: "Remote / London, UK",
      descriptionUz: "Avtonom AI SOC agentlari va 120+ mikroservisli Zero-Trust Kubernetes klasterini boshqarish.",
      descriptionEn: "Architected autonomous AI SOC agents and multi-region Zero-Trust Kubernetes clusters.",
      technologies: "Kubernetes, PyTorch, LangGraph, Cilium eBPF, Terraform",
      current: true,
    },
  });

  // 7. Certificate
  await prisma.certificate.create({
    data: {
      title_uz: "Certified Kubernetes Security Specialist (CKS)",
      title_en: "Certified Kubernetes Security Specialist (CKS)",
      issuer: "Cloud Native Computing Foundation (CNCF)",
      issueDate: "2025",
      image: "/certs/cks.svg",
      credentialUrl: "https://www.cncf.io/certification/cks/",
      order: 1,
      titleUz: "Certified Kubernetes Security Specialist (CKS)",
      titleEn: "Certified Kubernetes Security Specialist (CKS)",
      credentialId: "LF-CKS-994821",
      category: "DEVOPS",
      verified: true,
    },
  });

  await prisma.certificate.create({
    data: {
      title_uz: "Offensive Security Certified Professional (OSCP)",
      title_en: "Offensive Security Certified Professional (OSCP)",
      issuer: "OffSec",
      issueDate: "2024",
      image: "/certs/oscp.svg",
      credentialUrl: "https://www.offsec.com/courses/pen-200/",
      order: 2,
      titleUz: "Offensive Security Certified Professional (OSCP)",
      titleEn: "Offensive Security Certified Professional (OSCP)",
      credentialId: "OS-10492841",
      category: "CYBERSECURITY",
      verified: true,
    },
  });

  // 8. Resource
  await prisma.resource.create({
    data: {
      title_uz: "Zero-Trust Kubernetes Hardening Blueprint (Terraform + Cilium)",
      title_en: "Zero-Trust Kubernetes Hardening Blueprint (Terraform + Cilium)",
      description_uz: "Production K8s klasterlarini CKS va CIS Benchmark standartlari bo'yicha himoyalash shablonlari.",
      description_en: "Production-ready Terraform modules, Cilium mTLS policies, and Falco rules aligned with CIS Benchmarks.",
      url: "https://github.com/cyberai-architect/k8s-zero-trust-blueprint",
      category: "tool",
      order: 1,
      published: true,
      titleUz: "Zero-Trust Kubernetes Hardening Blueprint (Terraform + Cilium)",
      titleEn: "Zero-Trust Kubernetes Hardening Blueprint (Terraform + Cilium)",
      descriptionUz: "Production K8s klasterlarini CKS va CIS Benchmark standartlari bo'yicha himoyalash shablonlari.",
      descriptionEn: "Production-ready Terraform modules, Cilium mTLS policies, and Falco rules aligned with CIS Benchmarks.",
      type: "TEMPLATE",
      downloadUrl: "/resources/k8s-zero-trust-blueprint.zip",
      downloads: 640,
    },
  });

  // 9. Speaking
  await prisma.speaking.create({
    data: {
      titleUz: "Avtonom AI Agentlar Davrida Kiberxavfsizlik: Hujum va Himoya",
      titleEn: "Cybersecurity in the Era of Autonomous AI Agents: Offense & Defense",
      eventUz: "Central Asia CyberSec & AI Summit 2026",
      eventEn: "Central Asia CyberSec & AI Summit 2026",
      date: "2026-05-14",
      location: "Tashkent, Uzbekistan",
      type: "KEYNOTE",
      slidesUrl: "https://speakerdeck.com/cyberai-architect",
      videoUrl: "https://youtube.com",
      descriptionUz: "LLM agentlar qanday qilib avtonom pentest o'tkazishi va ularga qarshi eBPF + AI Firewall himoyasi.",
      descriptionEn: "Keynote exploring how autonomous LLM agents transform red-teaming and kernel-level eBPF defenses.",
    },
  });

  // 10. Page (Editable Privacy Policy page per Section 4 & Section 6)
  await prisma.page.create({
    data: {
      key: "privacy",
      title_uz: "Maxfiylik Siyosati va Kiberxavfsizlik Standarti",
      title_en: "Privacy Policy & Zero-Trust Security Posture",
      content_uz: "## 1. Zero-Tracking\nUshbu platforma uchinchi tomon reklama trekerlaridan foydalanmaydi.",
      content_en: "## 1. Zero-Tracking\nThis platform does not use third-party ad trackers or invasive cookies.",
    },
  });

  // 11. Setting (SEO & Notification channels per Section 5 & Section 6)
  await prisma.setting.create({
    data: {
      key: "site_config",
      value: JSON.stringify({
        seoTitle_uz: "Erjigitov Mirhamid — AI, Kiberxavfsizlik va DevOps Portfolio",
        seoTitle_en: "Erjigitov Mirhamid — AI, Cybersecurity & DevOps Portfolio",
        telegramNotifications: true,
        emailNotifications: true,
      }),
    },
  });

  await prisma.contactMessage.create({
    data: {
      name: "Alex Mercer (CTO @ FinTech Core)",
      email: "a.mercer@fintechcore.io",
      subject: "Enterprise RAG Security Audit & Kubernetes Review",
      category: "SECURITY_AUDIT",
      message: "Salom! Bank AI-assistentimiz va Kubernetes infratuzilmamiz uchun Zero-Trust audit bo'yicha hamkorlik qilmoqchimiz.",
      encrypted: true,
      isRead: false,
      ip: "127.0.0.1",
    },
  });

  console.log("✅ Stage 1 Seed completed: All models populated with hashed admin user!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
