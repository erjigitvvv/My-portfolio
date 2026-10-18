# 🚀 Bilingual Dynamic Portfolio (Next.js + Prisma + next-intl)

Full-stack bilingual (`/uz` and `/en`) personal portfolio & CMS built according to [PROJECT_SPEC.md](./PROJECT_SPEC.md).

---

## ⚡ Stage 1 — Foundation Setup & Run Instructions

### 1. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
- **Local Testing Default:** `DATABASE_URL="file:./dev.db"` works out-of-the-box without requiring an external database server.
- **Neon / Supabase PostgreSQL:** Replace `DATABASE_URL` in `.env` with your Neon/Supabase connection string (`postgresql://...`) and change `provider = "postgresql"` in `prisma/schema.prisma`.

### 2. Install Dependencies
```bash
npm install
```

### 3. Push Prisma Schema & Seed Bilingual Content
```bash
npx prisma db push --force-reset
npm run db:seed
```
This creates the single Admin `User` (with a salted `scrypt` password hash) and seeds bilingual (`_uz` / `_en`) sample records across all 14 models defined in Section 6 of `PROJECT_SPEC.md`:
- `User`, `Profile`, `Project` (with `Skill` relations), `Post` (with `Tag` relations), `Tag`, `Skill`, `Experience`, `Certificate`, `Resource`, `Talk`, `Message`, `Page` (`privacy`), `Media`, and `Setting`.

### 4. Start Development Server
```bash
npm run dev
```

### 5. How to Test Stage 1
1. **i18n Routing (`/uz` and `/en`):**
   - Open `http://localhost:3000/uz` (Uzbek) and `http://localhost:3000/en` (English).
   - Verify `/` automatically redirects to `/uz`.
2. **Admin Auth & Hashed Credentials (`/admin/login`):**
   - Open `http://localhost:3000/admin` — verify unauthenticated requests are redirected to `/admin/login`.
   - Log in with the seeded admin credentials from `.env`:
     - **Email:** `admin@cyberai.dev`
     - **Password:** `CyberAdmin2026!Secure`
   - Verify `/api/auth/session` returns `{ authenticated: true, user: { ... } }`.
3. **Database Inspection (Prisma Studio):**
   - Run `npx prisma studio` to inspect all 14 seeded tables (`User`, `Profile`, `Project`, `Post`, `Tag`, `Skill`, `Experience`, `Certificate`, `Resource`, `Talk`, `Message`, `Page`, `Media`, `Setting`).
