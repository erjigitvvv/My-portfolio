# Portfolio sayt — Loyiha spetsifikatsiyasi

> Bu faylni loyiha papkasining ildiziga `PROJECT_SPEC.md` nomi bilan qo'y va AI vositangning qoidalar fayliga (`CLAUDE.md`, `.cursorrules` va h.k.) shu faylni hamda `DESIGN_SPEC.md` ni o'qishni yoz.
> AI uchun qoida: avval shu faylni o'qi. Bir vaqtda FAQAT BITTA bosqichni bajar. Har bosqichdan keyin to'xta, nima o'zgarganini qisqa yoz va qanday sinashni ayt. Men "davom et" demaguncha keyingi bosqichga o'tma.
> Til qoidasi: kod, o'zgaruvchi nomlari, fayl nomlari, commit xabarlari va kod izohlari inglizcha. Foydalanuvchiga ko'rinadigan barcha matnlar ikki tilli (uz/en). Menga javoblar o'zbekcha bo'lsin.

## 1. Maqsad
To'liq dynamic, ikki tilli (o'zbekcha + inglizcha) shaxsiy portfolio sayt. Vazifalari: ish topish (IT / kiberxavfsizlik), freelance mijozlar jalb qilish, shaxsiy brend va kontent. Barcha kontent admin paneldan boshqariladi, kod ichida qattiq yozilgan matn bo'lmasligi kerak.

## 2. Texnologiyalar (hammasi bepul tarifda)
- Next.js (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- PostgreSQL (Neon yoki Supabase) + Prisma ORM
- Auth.js (credentials, bitta admin foydalanuvchi)
- `/uz` va `/en` yo'nalishi uchun next-intl
- Validatsiya uchun Zod, markdown uchun react-markdown (sanitizatsiya bilan)
- Fayllar uchun Supabase Storage yoki Vercel Blob
- Resend (email) + Telegram bot: kontakt xabarlari uchun bildirishnoma
- Hosting: Vercel. Kod GitHub'da.

## 3. Dizayn
To'liq vizual til, animatsiyali avatar, ranglar palitrasi va sahifalar dizayni `DESIGN_SPEC.md` da berilgan. Vizual masalalarda u shu fayldan ustun turadi. Qisqasi: perspektiv setka ustidagi poster uslubidagi hero va 3D ko'rinishdagi animatsiyali avatar, kartalar/nav/admin uchun glassmorphism, och va qorong'i mavzu, mobile-first, `prefers-reduced-motion` hurmat qilinadi.

## 4. Ommaviy sahifalar (har biri `/uz` va `/en` ostida)
| Yo'l | Sahifa | Ma'lumot manbai |
|---|---|---|
| `/` | Bosh sahifa: hero, qisqa haqimda, tanlangan loyihalar, so'nggi maqolalar, ko'nikmalar, aloqa chaqiruvi | Profile, Project, Post, Skill |
| `/about` | Haqimda, tajriba/ta'lim timeline, CV yuklab olish | Profile, Experience |
| `/skills` | Ko'nikmalar kategoriya bo'yicha, loyihalarga bog'langan | Skill |
| `/projects` | Loyihalar ro'yxati, kategoriya/teg filtri | Project |
| `/projects/[slug]` | Loyiha tafsiloti | Project |
| `/blog` | Maqolalar ro'yxati, teglar va qidiruv | Post, Tag |
| `/blog/[slug]` | Maqola (markdown, o'qish vaqti, kod bloklari) | Post |
| `/certificates` | Sertifikatlar galereyasi, tekshirish havolalari | Certificate |
| `/resources` | Kitob, kurs, vosita tavsiyalari kategoriya bo'yicha | Resource |
| `/speaking` | Chiqishlar va tadbirlar (kelgusi va o'tgan) | Talk |
| `/contact` | Aloqa formasi + ijtimoiy havolalar | Message, Profile |
| `/privacy` | Maxfiylik siyosati (adminda tahrirlanadi) | Page |
| 404 | Maxsus "topilmadi" sahifasi | statik |

Qo'shimcha: `/sitemap.xml`, `/robots.txt`, `/rss.xml` (blog uchun).

IXTIYORIY (faqat egasi tasdiqlasa): freelance uchun `/services` sahifasi (Service modeli: title, description, jarayon bosqichlari, narx izohi, order).

## 5. Admin panel (`/admin`, himoyalangan)
login, dashboard (o'qilmagan xabarlar, so'nggi o'zgarishlar, tashrif statistikasi), profil, loyihalar, maqolalar (markdown muharrir, draft/published), ko'nikmalar, tajriba, sertifikatlar, resurslar, chiqishlar, xabarlar (o'qilgan/o'qilmagan/o'chirish), media kutubxona, sahifalar (maxfiylik va h.k.), sozlamalar (SEO standartlari, bildirishnoma kanallari).

## 6. Ma'lumotlar bazasi sxemasi (Prisma)
Odam o'qiydigan barcha matn maydonlari ikki tilli: `_uz` va `_en` ustunlari.

- **User**: id, email, passwordHash, createdAt (bitta admin, seed orqali yaratiladi, ommaviy ro'yxatdan o'tish yo'q)
- **Profile** (bitta qator): name, headline_uz/en, bio_uz/en, heroLine1_uz/en, heroLine2_uz/en, availability_uz/en (yashil pill matni), rolePill_uz/en, specialties_uz/en (4 ta elementli massiv), avatarConfig (JSON), avatarUrl, cvUrl_uz/en, email, location, socials (JSON)
- **Project**: id, slug, title_uz/en, summary_uz/en, description_uz/en (markdown), coverImage, gallery[], category, liveUrl, repoUrl, featured, order, published, createdAt; Skill bilan ko'p-ko'pga bog'langan
- **Post**: id, slug, title_uz/en, excerpt_uz/en, content_uz/en (markdown), coverImage, readingTime, published, publishedAt; Tag bilan ko'p-ko'pga bog'langan
- **Tag**: id, slug, name_uz/en
- **Skill**: id, name, category, level (1–5), icon, order
- **Experience**: id, type (work/education), organization, role_uz/en, description_uz/en, startDate, endDate, order
- **Certificate**: id, title_uz/en, issuer, issueDate, image, credentialUrl, order
- **Resource**: id, title_uz/en, description_uz/en, url, category (book/course/tool/article), order, published
- **Talk**: id, title_uz/en, description_uz/en, eventName, date, location, slidesUrl, videoUrl, image, published
- **Message**: id, name, email, subject, body, isRead, ip, createdAt
- **Page**: id, key (masalan `privacy`), title_uz/en, content_uz/en (markdown), updatedAt
- **Media**: id, url, alt_uz/en, type, size, createdAt
- **Setting**: key, value (JSON)

## 7. Arxitektura qoidalari
- Ommaviy sahifalar: server tomonida render, ma'lumot `src/lib/queries/*` orqali olinadi va keshlanadi. Admin o'zgartirsa on-demand revalidation (`revalidatePath` / tag) ishlaydi.
- Admin yozuvlari: forma → Zod validatsiya → `src/lib/actions/*` dagi Server Action → sessiya tekshiruvi → baza → revalidate.
- Kontakt forma: Zod → honeypot + IP bo'yicha rate limit → Message saqlash → Telegram/email bildirishnoma.
- Fayl yuklash: tur va hajm serverda tekshiriladi, storage'ga saqlanadi, Media jadvaliga yoziladi.
- Papka tuzilmasi: `src/app/[locale]/(public)/...`, `src/app/admin/...`, `src/app/api/...`, `src/components/{ui,layout,sections,admin}`, `src/lib/{db,auth,queries,actions,validators,notify,seo}.ts`, `messages/{uz,en}.json`, `prisma/{schema.prisma,seed.ts}`.

## 8. Xavfsizlik (majburiy)
- Admin yo'llari middleware'da VA har bir Server Action ichida tekshiriladi.
- Parollar hash qilinadi (argon2 yoki bcrypt). Ommaviy ro'yxatdan o'tish yo'q.
- Har bir kirish Zod bilan tekshiriladi, ko'rsatiladigan markdown sanitizatsiya qilinadi.
- Kontakt formada rate limit va honeypot; ixtiyoriy Cloudflare Turnstile.
- Maxfiy kalitlar faqat `.env` va Vercel muhit o'zgaruvchilarida; repoga faqat `.env.example` qo'shiladi.
- Xavfsizlik sarlavhalari (CSP, HSTS, X-Frame-Options). Yuklanadigan fayl turi va hajmi cheklanadi.

## 9. SEO va unumdorlik
Har til uchun alohida metadata, Open Graph, `hreflang`, sitemap, robots, RSS, maqola va loyihalar uchun JSON-LD, `next/image`, lokal shriftlar. Maqsad: Lighthouse 90+.

## 10. Muhit o'zgaruvchilari
`DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (faqat seed uchun), `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `RESEND_API_KEY`, storage kalitlari.

## 11. Bosqichlar (AI'ga birma-bir beriladigan promptlar)

**1-bosqich — Poydevor**
"PROJECT_SPEC.md ni o'qi. Faqat 1-bosqichni bajar: Next.js + TypeScript + Tailwind loyihasini yarat, 6-bo'limdagi to'liq sxema bilan Prisma sozla, Neon/Supabase bazasiga ulan, `/uz` va `/en` uchun next-intl sozla, bitta admin uchun Auth.js sozla, seed skripti yoz (admin foydalanuvchi + ikki tilli namunaviy kontent), `.env.example` va ishga tushirish ko'rsatmasi bilan README qo'sh. To'xta va qanday sinashni ayt."

**2a-bosqich — Dizayn tizimi** va **2b-bosqich — Avatar dvigateli**
Promptlar `DESIGN_SPEC.md` ning 7-bo'limida.

**3-bosqich — Admin panel**
"Faqat 3-bosqichni bajar: login va 5-bo'limdagi barcha admin bo'limlarni to'liq CRUD bilan qur: markdown muharrir, media yuklash, draft/published, tartiblash. 8-bo'limdagi xavfsizlik qoidalariga amal qil. To'xta va qanday sinashni ayt."

**4-bosqich — Ommaviy sahifalar**
"Faqat 4-bosqichni bajar: 4-bo'limdagi barcha ommaviy sahifalarni bazadan o'qiydigan qilib qur, filtr va qidiruv bilan, admin o'zgartirsa sahifa yangilansin. Dizayn uchun `DESIGN_SPEC.md` ning 5-bo'limiga amal qil. To'xta va qanday sinashni ayt."

**5-bosqich — Aloqa va bildirishnoma**
"Faqat 5-bosqichni bajar: validatsiya, honeypot, rate limit, bazaga saqlash, Telegram + email bildirishnoma, admin xabarlar bo'limi bilan integratsiyali kontakt forma. To'xta va qanday sinashni ayt."

**6-bosqich — Sayqallash**
"Faqat 6-bosqichni bajar: SEO (metadata, hreflang, sitemap, robots, RSS, JSON-LD), animatsiyalar, rasm optimizatsiyasi, accessibility tekshiruvi, xavfsizlik sarlavhalari, Lighthouse tekshiruvi. Ballarni yoz va muammolarni tuzat."

**7-bosqich — Ishga tushirish**
"Faqat 7-bosqichni bajar: production muhit o'zgaruvchilari, Vercel deploy ro'yxati, o'z domenini ulash qadamlari, yakuniy tekshiruv ro'yxati. Kontent to'qib chiqarma: haqiqiy kontentni men admin paneldan kiritaman."

## 12. AI uchun ishlash qoidalari
- Bosqichlarni o'tkazib yuborma: bir sessiya, bir bosqich.
- Kod tipli (typed), kichik va faqat noaniq joylarda izohli bo'lsin.
- Bu spetsifikatsiyada biror narsa noaniq yoki yetishmasa, taxmin qilma, menga so'ra.
- Maxfiy kalitlarni hech qachon commit qilma. Bazaga tegishli kontentni kod ichiga yozma.
- Har bosqichdan keyin: o'zgargan fayllar ro'yxati, qanday ishga tushirish, qanday sinash va ma'lum cheklovlarni yoz.
