# Portfolio — Dizayn va animatsiya spetsifikatsiyasi

> `PROJECT_SPEC.md` ning hamrohi. Ikkalasini ham o'qi. Vizual masalalarda shu fayl ustun.
> Egasining namuna rasmi faqat USLUB uchun ilhom manbai (xona setkasi, poster shrift, pill yorliqlar, 3D personaj). Uning matnlari, logotiplari va suv belgisini nusxalama.
> Til qoidasi: kod va nomlar inglizcha, foydalanuvchiga ko'rinadigan matnlar uz/en, menga javoblar o'zbekcha.

## 1. Vizual til va ranglar

### 1.1 Namunadan olinadigan uslub
- **Fon:** och kulrang, bir nuqtali perspektiv "xona" setkasi (chiziqlar markazga yaqin yo'qolish nuqtasiga yig'iladi). Qorong'i mavzuda: deyarli qora fon va xira kulrang chiziqlar.
- **Shrift:** juda qalin, zich, katta harfli (uppercase) poster shrifti + kichik mono/grotesk yorliqlar. Bepul nomzodlar (Google Fonts): Archivo (ExtraBold/Black, o'zgaruvchan kenglik), Bricolage Grotesque, Unbounded. MUHIM: tanlashdan oldin o'zbek lotin harflari (oʻ, gʻ, ʻ belgisi U+02BB/U+02BC, ’) to'g'ri chiqishini tekshir.
- **Detallar:** holat nuqtali pill teglar, qavsli yorliqlar `(PORTFOLIO)`, sahifa hisoblagichi `01/12`, yulduzcha `*`, qo'lda chizilgan strelkalar, doodle "qo'l/yulduz" stikeri, pastda 4 ta qisqa ixtisoslik qatori, ingichka vertikal chiziqlar.
- **Glass qatlam:** nav bar, kartalar, modallar va admin setka USTIDA yarim shaffof shisha ko'rinishida (`backdrop-blur`, shaffof oq/qora, 1px chegara). Hero esa poster uslubida qoladi.

### 1.2 Tavsiya etilgan palitra: "Mint Grid" (asosiy)
Namunaga yaqin, qora kiyimli avatar bilan yaxshi uyg'unlashadi. Qoida 60/30/10: 60% qog'oz rangi, 30% qora (matn va shrift), 10% aksent.

| Token | Och mavzu | Qorong'i mavzu | Qayerda ishlatiladi |
|---|---|---|---|
| `--bg` | `#EDEEEC` | `#0C0D0C` | sahifa foni |
| `--ink` | `#0B0B0B` | `#F2F3F1` | asosiy matn, sarlavhalar |
| `--muted` | `#5C605C` | `#9A9F99` | ikkinchi darajali matn |
| `--line` | `#C9CCC8` | `#2A2D2A` | setka chiziqlari, ajratgichlar |
| `--glass` | `rgba(255,255,255,0.55)` | `rgba(255,255,255,0.06)` | glass kartalar foni |
| `--glass-border` | `rgba(255,255,255,0.70)` | `rgba(255,255,255,0.12)` | glass chegarasi |
| `--accent` | `#3DBE74` | `#4FD98A` | pill foni, faol holat, stikerlar |
| `--accent-ink` | `#0B0B0B` | `#0B0B0B` | aksent ustidagi matn |
| `--accent-text` | `#177A43` | `#4FD98A` | yashil rangdagi matn va havolalar |
| `--peach` | `#F2A98C` | `#F2A98C` | ikkinchi aksent: yonoq, yumshoq dog'lar, kichik stikerlar |

Qoidalar:
- Yashil faqat to'ldirish (pill, faol holat, stiker) uchun; yashil rangli oddiy matn faqat `--accent-text` bilan (och fonda `#3DBE74` matn sifatida kontrast yetmaydi).
- Yashil pill ustidagi matn doim qora (`--accent-ink`).
- Avatar orqasida yumshoq yumaloq dog': yashil (15% shaffoflik) yoki shaftoli rang.
- Glass: `backdrop-filter: blur(16px)`, soya `0 8px 32px rgba(0,0,0,0.08)` (qorong'i mavzuda kuchsizroq).
- Semantik ranglar: muvaffaqiyat = `--accent`, xato `#E5484D`, ogohlantirish `#F5A524`, ma'lumot `#3B82F6`.
- Hex qiymatlari taxminiy: namunadan ko'z tomchisi (eyedropper) bilan aniqlashtir va AA kontrastni tekshir.

### 1.3 Muqobil palitralar (kerak bo'lsa faqat o'zgaruvchilar almashtiriladi)

**"Cyber Night"** — kiberxavfsizlik ruhi, asosan qorong'i:
`--bg #0A0F0D`, `--ink #E8F1EC`, `--accent #00E58A` (neon yashil), ikkinchi aksent `#35D0FF` (havorang), `--line #1E2824`, glass `rgba(255,255,255,0.06)`.

**"Cobalt Pop"** — energiyali, zamonaviy:
`--bg #F1F1EE`, `--ink #0B0B0B`, `--accent #2F5BFF` (elektrik ko'k, ustidagi matn oq), ikkinchi aksent `#E8FF59` (limon), `--line #CFCFCA`.

### 1.4 Boshqa tokenlar
Pill radiusi `999px`, kartalar `24px`; oraliq, blur va soya CSS o'zgaruvchilarida; mavzu `[data-theme="light|dark"]` orqali almashadi.

## 2. Umumiy elementlar
- **Yuqori panel:** chapda pill `● 01/12  PORTFOLIO`, markazda nav (glass pill konteyner), o'ngda til almashtirgich `UZ | EN` va mavzu almashtirgich. Sahifa hisoblagichi har sahifada o'zgaradi.
- **Nav havolalari:** Home, About, Skills, Projects, Blog, Certificates, Resources, Speaking, Contact (mobilda to'liq ekranli menyuga yig'iladi; Privacy footerda).
- **Mini avatar:** Bosh sahifadan tashqari har sahifada header logotipi o'rnida kichik avatar. U ham xuddi shu animatsiya dvigatelidan foydalanadi (4-bo'lim).
- **Footer:** katta marquee (yuguruvchi qator), ijtimoiy pillar, maxfiylik havolasi, til/mavzu, mualliflik.
- **Perspektiv setka:** SVG/CSS; yo'qolish nuqtasi kursor bilan biroz siljiydi (parallax, ekranning ±2% gacha).
- **Sahifa o'tishlari:** qisqa slide/fade; navigatsiyada avatar bosh qimirlatadi.
- **Ixtiyoriy maxsus kursor:** kichik nuqta + halqa, havolalar ustida kattalashadi va yorliq ko'rsatadi. Sensorli qurilmalarda va animatsiyani kamaytirish yoqilganda o'chiq.

## 3. Avatar

### 3.1 Yondashuv (MVP): 3D ko'rinishli qatlamli 2D
Tayyor 3D uslubidagi personaj rasmi + kod bilan boshqariladigan yuz qismlari. Yengil (< 200 KB), bepul hostingda ishlaydi, hamma joyda ishlaydi.

Qatlamlar (hammasi bitta konteyner ichida, bir xil koordinata tizimida):
1. `avatar-body.webp` — bosh, quloqlar, soch/shapka, bo'yin, yelkalar; **ko'z va qoshlar olib tashlangan** (silliq teri).
2. Ko'zlar — SVG: oq yaltiroq nuqtali qora yumaloq ovallar; chap/o'ng guruh alohida (qisish, ko'z qisish, kattalashtirish uchun).
3. Nigoh — butun ko'z guruhi nishon tomon siljiydi (kichik radius ichida, yumshoq).
4. Qoshlar — SVG yumaloq chiziqlar, har biri alohida aylanadi/siljiydi (ko'tarish, chimirish, qiyshaytirish).
5. Og'iz — yo'q bo'lsa tayyor tabassumni saqlab, scale/squash bilan animatsiya qil; yoki 3–4 ta og'iz sprayti (tabassum, ochiq tabassum, "o", yarim tabassum) almashtir. Boshlanishiga tayyor tabassum yetadi.
6. Yonoq qizilligi — ikkita yumshoq radial gradient; xursand/ko'z qisish paytida shaffofligi oshadi.
7. Stikerlar — avatar yonidagi qo'l/yulduz/strelka SVG'lari, hover/bosishda tebranadi.

### 3.2 Asset talablari
- Shaffof PNG/WebP, old tomondan, yelkadan yuqori, manba 2048×2048 → ko'rsatiladigan o'lchamda WebP/AVIF ≤ 200 KB (2× variant bilan).
- Ikki variant: shapkali va shapkasiz (keyinroq almashtirgich, ixtiyoriy).
- Yuz qismlarining o'rni bitta konfig faylda (`avatar.config.ts`) konteyner foizlarida saqlanadi, shunda o'lcham o'zgarsa ham to'g'ri turadi.
- Ikki tilda `alt` matn; avatar bezak sifatida (`aria-hidden`), faqat sahifadagi yagona rasm bo'lsa istisno.

## 4. Animatsiya xatti-harakatlari (yagona dvigatel)
Bitta `requestAnimationFrame` sikli, kursor holati [-1, 1] ga normallashtiriladi, qiymatlar yumshatiladi (lerp ≈ 0.12). Faqat `transform` va `opacity` animatsiya qilinadi.

## 5. Sahifalar dizayni
Bosh sahifa, Haqimda, Ko'nikmalar, Loyihalar, Blog, Sertifikatlar, Resurslar, Chiqishlar, Aloqa, Maxfiylik, 404, Admin.

## 6. Qulaylik (accessibility) va sifat
- Ikkala mavzuda ham AA kontrast (yashil ustidagi matn qora; yashil rangli matn uchun `--accent-text`).
- Barcha animatsiyalar `prefers-reduced-motion` orqali o'chirilishi mumkin; hech narsa faqat hover'ga bog'liq emas.
- To'liq klaviatura navigatsiyasi, ko'rinadigan fokus halqalari; nav hover reaksiyalari fokusda ham ishlaydi.
- 360 px dan moslashuvchan: hero ustma-ust joylashadi (avatar matn ustida yoki orqasida), display shrift `clamp()` bilan o'lchanadi.
- Lighthouse 90+; avatar va setka LCP/CLS'ni yomonlashtirmasligi kerak.

## 7. AI vositasi uchun promptlar

**2a-bosqich — Dizayn tizimi**
"PROJECT_SPEC.md va DESIGN_SPEC.md ni o'qi. Faqat 2a-bosqichni bajar: tokenlar (1.2-bo'limdagi 'Mint Grid' palitrasi CSS o'zgaruvchilarida, och/qorong'i), shriftlar (o'zbek lotin harflarini tekshir), kursor parallaxli perspektiv setka foni, glass komponentlar, pillar, stikerlar, yuqori panel, nav, marqueeli footer, mavzu va til almashtirgichlar, sahifa hisoblagichi. Kontent placeholder bo'lsin. To'xta va qanday sinashni ayt."

**2b-bosqich — Avatar dvigateli**
"Faqat 2b-bosqichni bajar: DESIGN_SPEC.md ning 3–4-bo'limlari bo'yicha qatlamli Avatar komponenti va animatsiya dvigatelini `/public/avatar/` dagi assetlarim bilan qur (ular tayyor bo'lguncha oddiy placeholder bosh ishlat). Nigoh ergashishi, pirpirash, nafas olish, bosh qiyshayishi, nav hover reaksiyalari, bosish reaksiyalari, uyqusirash, sensorli qurilma varianti, reduced-motion qo'llab-quvvatlashi va headerdagi mini avatarni amalga oshir. Istalgan sahifa (Contact forma, 404) ifodani boshqarishi uchun `useAvatar()` hook'ini taqdim et. To'xta va qanday sinashni ayt."

**Keyin** PROJECT_SPEC.md dagi 3–7-bosqichlarni davom ettir, har sahifani shu fayldagi 5-bo'lim bo'yicha qur.
