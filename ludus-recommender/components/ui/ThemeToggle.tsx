"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        fontFamily: "var(--font-ui), sans-serif",
        fontSize: "0.85rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--muted)",
        background: "none",
        border: "1px solid var(--border)",
        padding: "0.3rem 0.75rem",
        cursor: "pointer",
        transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = "var(--accent)";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = "var(--muted)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
}