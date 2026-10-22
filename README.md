# 🚀 Bilingual Dynamic Portfolio & CMS (Next.js 14 + Prisma + next-intl + ClayGlass UI)

Full-stack bilingual (`/uz` and `/en`) personal portfolio, security research blog, and headless admin CMS built according to `PROJECT_SPEC.md` and `DESIGN_SPEC.md`.

---

## 🌟 Key Features & Architecture

1. **Bilingual i18n (`/uz` & `/en`):**
   - Built with `next-intl` routing. Every database model (`Profile`, `Project`, `Post`, `Certificate`, `Resource`, `Talk`, `Page`, etc.) supports bilingual `_uz` and `_en` fields.
2. **ClayGlass Design System:**
   - Perfect fusion of Claymorphism (tactile soft 3D extruded surfaces with inner shadows) and Glassmorphism (`backdrop-filter: blur(24px)`, translucent borders, interactive card sheens).
   - Mint Grid & Cyber Night color palettes with `[data-theme="light|dark"]` switching.
3. **Advanced Scroll Animations:**
   - **Parallax Scrolling:** Background and foreground depth effects.
   - **Scroll-Triggered Reveal (`ScrollReveal`):** Smooth fade-in-up, scale, and blur entrance animations.
   - **Scroll-Linked Progress Animation:** Top viewport reading progress bar (`ScrollProgressBar`).
   - **Horizontal / Sticky Scroll (`HorizontalScroll`):** Sticky horizontal case studies and galleries.
4. **Protected Admin CMS (`/admin`):**
   - Secure Auth.js credentials provider with hashed password authentication.
   - Full CRUD management for Projects, Blog Posts, Skills, Experiences, Certificates, Resources, Speaking, and Messages.
5. **Secure Contact & Telegram Webhook:**
   - Form validation with Zod, honeypot protection, rate limiting, and instant Telegram bot notifications.
6. **Robust SEO & Security Headers:**
   - Dynamic `sitemap.xml`, `robots.txt`, RSS feed (`/rss.xml`), and JSON-LD structured data.
   - Strict security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).

---

## ⚡ Quick Start & Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
- **Local SQLite Testing:** `DATABASE_URL="file:./dev.db"` works out of the box.
- **Production PostgreSQL:** Use a connection string from Neon or Supabase (`postgresql://...`) and update `prisma/schema.prisma` provider to `"postgresql"`.

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database & Seed Bilingual Content
```bash
npx prisma db push
npm run db:seed
```
This creates the admin user and seeds bilingual sample records across all Section-6 database models.

### 4. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🚢 Vercel Production Deployment Checklist

1. **Repository Push:** Push your code to a GitHub repository.
2. **Vercel Project Import:** Import the repository into Vercel.
3. **Environment Variables:** Set the following variables in Vercel Project Settings:
   - `DATABASE_URL`: Your production PostgreSQL connection string (Neon / Supabase).
   - `AUTH_SECRET`: A secure random secret string.
   - `NEXT_PUBLIC_SITE_URL`: Your live production domain (e.g. `https://yourdomain.com`).
   - `TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID` (Optional: for contact form alerts).
4. **Build Command:** `prisma generate && next build`
5. **Domain Mapping:** Connect your custom domain in Vercel.
