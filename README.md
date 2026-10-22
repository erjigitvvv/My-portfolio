# ✨ Erjigit — Senior Full-Stack Software Engineer & Solutions Architect

[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

An ultra-modern, high-performance personal portfolio engineered for **Erjigit** (`erjigitvvv`), showcasing 5+ years of experience in distributed microservices, scalable cloud architectures, and modern reactive web development.

---

## 🚀 Live Highlights & Features

- **⚡ Blazing Fast Architecture**: Built with React 19, TypeScript, Vite 8, and Tailwind CSS v4 with sub-second production builds.
- **🌓 Adaptive Theme Engine**: Native Dark/Light theme with persistent `localStorage` and system `prefers-color-scheme` synchronization.
- **🧭 Scroll-Spy Navigation**: Auto-updating header indicator as sections scroll into view with a smooth mobile drawer.
- **💻 Interactive Live Terminal**: Interactive showcase displaying engineering runtime configs, telemetry metrics, and environment variables.
- **🛠️ Mastered Tech Matrix**: Interactive category filtering (Frontend, Backend, Databases, Cloud & DevOps) with real-time keyword search.
- **💼 Career & Impact Timeline**: Quantifiable outcomes and achievements across leading engineering roles.
- **📂 Deep Project Showcase**: Categorized cards with live metrics, architecture modals, GitHub repo links, and live previews.
- **📬 Interactive Contact Hub**: Direct copy-to-clipboard email integration, Telegram instant chat, and validated contact submission form.
- **♿ First-Class Accessibility & SEO**: Semantic HTML5, ARIA compliance, Open Graph metadata, and responsive layout across all viewports.

---

## 🧱 Architectural Directory Structure

```text
portfolio-project/
├── public/
│   └── favicon.svg                 # Custom SVG branding icon
├── src/
│   ├── assets/                     # Static media and graphics
│   ├── components/
│   │   ├── layout/                 # Layout primitives
│   │   │   ├── Navbar.tsx          # Dynamic scroll-spy navigation header
│   │   │   ├── Footer.tsx          # Comprehensive footer & sitemap
│   │   │   └── BackToTop.tsx       # Floating scroll-to-top trigger
│   │   ├── sections/               # Core portfolio sections
│   │   │   ├── HeroSection.tsx     # Hero with animated terminal & metrics
│   │   │   ├── AboutSection.tsx    # Philosophy & engineering background
│   │   │   ├── SkillsSection.tsx   # Interactive skill tabs & search
│   │   │   ├── ExperienceSection.tsx # Chronological career journey
│   │   │   ├── ProjectsSection.tsx # Featured works & modal inspection
│   │   │   └── ContactSection.tsx  # Direct channels & inquiry form
│   │   └── ui/                     # Reusable design system primitives
│   │       ├── Badge.tsx           # Status & tech pill badges
│   │       ├── Button.tsx          # Accessible button & anchor component
│   │       ├── Icons.tsx           # Scalable SVG brand icons
│   │       └── SectionHeader.tsx   # Unified section heading typography
│   ├── context/
│   │   └── ThemeContext.tsx        # Dark/Light theme provider & hook
│   ├── data/
│   │   └── portfolioData.ts        # Centralized personal & project dataset
│   ├── hooks/
│   │   ├── useCopyToClipboard.ts   # Clipboard copy helper with feedback
│   │   └── useScrollSpy.ts         # Viewport section tracker
│   ├── types/
│   │   └── portfolio.ts            # Strict TypeScript interfaces
│   ├── App.tsx                     # Main layout & component assembler
│   ├── index.css                   # Tailwind v4 imports & glassmorphism
│   └── main.tsx                    # React DOM entry point
├── index.html                      # HTML template with SEO & Open Graph
├── vite.config.ts                  # Vite & Tailwind compiler configuration
├── tsconfig.json                   # TypeScript project configuration
└── package.json                    # Dependencies and build scripts
```

---

## 🛠️ Quick Start & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** / **pnpm** / **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/erjigitvvv/My-portfolio-.git
   cd My-portfolio-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment

The output in `dist/` can be deployed instantly to:
- **Vercel**: Connect your GitHub repository for automated zero-config deployments.
- **GitHub Pages**: Deploy static `dist/` artifacts via GitHub Actions.
- **Cloudflare Pages / Netlify**: Standard static site hosting with global CDN caching.

---

## 👤 Author

**Erjigit**
- GitHub: [@erjigitvvv](https://github.com/erjigitvvv)
- Telegram: [@erjigitvvv](https://t.me/erjigitvvv)
- Email: erjigit.dev@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
