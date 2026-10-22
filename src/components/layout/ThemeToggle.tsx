"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * ThemeToggle component switching [data-theme="light|dark"] and .dark class
 * (DESIGN_SPEC.md Section 1.4 & 2)
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_theme") as "light" | "dark" | null;
    const initial = saved || "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("portfolio_theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="spatial-ornament flex h-9 w-9 items-center justify-center text-[var(--ink)] transition-all duration-300 hover:border-[var(--accent)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-[var(--accent)]" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
