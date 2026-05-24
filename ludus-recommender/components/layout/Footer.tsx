"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      padding: "2rem 1.5rem",
      textAlign: "center",
    }}>
      <div style={{
        maxWidth: "80rem",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        {/* Title */}
        <span style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "1rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}>
          Ludus Recommender
        </span>

        {/* Tagline */}
        <span style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "0.9rem",
          color: "var(--muted)",
          fontStyle: "italic",
        }}>
          A personal game tracking & recommendation system
        </span>

        {/* Footer links with dividers */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          marginTop: "0.5rem",
        }}>
          {[
            { href: "/contact", label: "Contact Us" },
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" },
          ].map(({ href, label }, index) => (
            <div key={href} style={{ display: "flex", alignItems: "center" }}>
              {index > 0 && (
                <span style={{
                  width: "1px",
                  height: "1.25rem",
                  background: "var(--border)",
                  display: "inline-block",
                  margin: "0 1.5rem",
                }} />
              )}
              <Link href={href} style={{
                fontFamily: "var(--font-jersey25)",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Copyright */}
        <span style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "0.8rem",
          color: "var(--border)",
          marginTop: "0.5rem",
        }}>
          © {new Date().getFullYear()} — Personal Project
        </span>
      </div>
    </footer>
  );
}