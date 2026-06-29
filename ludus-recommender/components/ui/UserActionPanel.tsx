"use client";
import { isLoggedIn } from "@/lib/auth-placeholder";

interface UserActionPanelProps {
  gameName: string;
}

export default function UserActionPanel({ gameName }: UserActionPanelProps) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        My Library
      </p>

      {isLoggedIn ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--background)",
              background: "var(--accent)",
              border: "none",
              padding: "0.75rem 1.5rem",
              cursor: "pointer",
              width: "100%",
            }}
          >
            + Add to Library
          </button>
          <button
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              background: "transparent",
              border: "1px solid var(--accent)",
              padding: "0.75rem 1.5rem",
              cursor: "pointer",
              width: "100%",
            }}
          >
            ✎ Write a Review
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jersey25)",
                fontSize: "0.9rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--background)",
                background: "var(--accent)",
                padding: "0.75rem 1.5rem",
                flex: 1,
                textAlign: "center",
              }}
            >
              + Add to Library
            </div>
            <div
              style={{
                fontFamily: "var(--font-jersey25)",
                fontSize: "0.9rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                background: "transparent",
                border: "1px solid var(--accent)",
                padding: "0.75rem 1.5rem",
                flex: 1,
                textAlign: "center",
              }}
            >
              ✎ Write a Review
            </div>
          </div>
          <p
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "0.75rem",
              color: "var(--muted)",
              letterSpacing: "0.08em",
            }}
          >
            <a href="/login" style={{ color: "var(--accent)", textDecoration: "none" }}>
              Log in
            </a>{" "}
            to track {gameName} in your library
          </p>
        </div>
      )}
    </div>
  );
}