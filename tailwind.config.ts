import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        glass: "var(--glass)",
        "glass-border": "var(--glass-border)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "accent-text": "var(--accent-text)",
        peach: "var(--peach)",
        cyber: {
          bg: "var(--bg)",
          surface: "var(--glass)",
          emerald: "var(--accent)",
          violet: "#8B5CF6",
          blue: "#3B82F6",
          amber: "#F5A524",
          rose: "#E5484D",
        },
      },
      borderRadius: {
        pill: "999px",
        card: "24px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Archivo", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
