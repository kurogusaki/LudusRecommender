"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/games", label: "Games" },
    { href: "/recommendations", label: "Recommendations" },
    { href: "/analytics", label: "Analytics" },
  ];

  const authLinks = [
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header style={{
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "0 1.25rem",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "1.5rem",
          fontWeight: 400,
          color: "var(--accent)",
          textDecoration: "none",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Ludus
        </Link>

        {/* Main nav + auth links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {/* Main links */}
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "1rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "color 0.2s",
              color: isActive(href) ? "var(--accent)" : "var(--muted)",
              borderBottom: isActive(href) ? "2px solid var(--accent)" : "2px solid transparent",
              paddingBottom: "2px",
            }}
            onMouseEnter={e => {
              if (!isActive(href)) e.currentTarget.style.color = "var(--accent-light)";
            }}
            onMouseLeave={e => {
              if (!isActive(href)) e.currentTarget.style.color = "var(--muted)";
            }}
            >
              {label}
            </Link>
          ))}

          {/* Divider */}
          <span style={{
            width: "1px",
            height: "1.25rem",
            background: "var(--border)",
          }} />

          {/* Auth links */}
          {authLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "1rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "color 0.2s",
              color: isActive(href) ? "var(--accent)" : "var(--muted)",
              borderBottom: isActive(href) ? "2px solid var(--accent)" : "2px solid transparent",
              paddingBottom: "2px",
            }}
            onMouseEnter={e => {
              if (!isActive(href)) e.currentTarget.style.color = "var(--accent-light)";
            }}
            onMouseLeave={e => {
              if (!isActive(href)) e.currentTarget.style.color = "var(--muted)";
            }}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}