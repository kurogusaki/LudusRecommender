"use client";
import { useState } from "react";
import Link from "next/link";
import { toSlug } from "@/lib/slug";
import { GameRow } from "@/components/games/GamesList";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

// ─── Helpers ──────────────────────────────────────────────────

function getPlayStatus(loveRank: string | null): { label: string; color: string } {
  if (!loveRank) return { label: "Unrated", color: "var(--muted)" };
  if (loveRank === "S" || loveRank === "A") return { label: "Loved", color: "#7ec8a4" };
  if (loveRank === "B") return { label: "Enjoyed", color: "var(--accent)" };
  if (loveRank === "C") return { label: "Mixed", color: "#7aaedc" };
  return { label: "Disliked", color: "#dc7a7a" };
}

export function toKebabCase(text: string) {
  return text
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Rank config ─────────────────────────────────────────────

const RANK_COLORS: Record<string, string> = {
  S: "#f0c040",
  A: "#c9a84c",
  B: "#7ec8a4",
  C: "#7aaedc",
  D: "#b07adc",
  F: "#dc7a7a",
};


// ─── Sub-components ───────────────────────────────────────────

function RankBadge({ rank, label }: { rank: string | null; label: string }) {
  if (!rank) return null;
  const color = RANK_COLORS[rank] ?? "var(--muted)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
      <span
        style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "1.5rem",
          color,
          lineHeight: 1,
          textShadow: `0 0 12px ${color}55`,
        }}
      >
        {rank}
      </span>
      <span
        style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "0.6rem",
          color: "var(--muted)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}
function DifficultyPips({ rank }: { rank: string | null }) {
  const order = ["F", "D", "C", "B", "A", "S"];
  const level = rank ? order.indexOf(rank) + 1 : 0;
  return (
    <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {order.map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: "0.75rem",
            lineHeight: 1,
            opacity: i < level ? 1 : 0.2,
          }}
        >
          💀
        </span>
      ))}
    </div>
  );
}

export default function GameCard({ game, index }: { game: GameRow; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { label: statusLabel, color: statusColor } = getPlayStatus(game.loveRank);
  const slug = toSlug(game.name, game.platform);

  return (
    <Link href={`/games/${slug}`} style={{ textDecoration: "none" }}>
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--border)" : "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "3rem 4.5rem",
        display: "grid",
        gridTemplateColumns: "110px 1fr auto",
        gap: "2rem",
        alignItems: "center",
        transition: "background 0.15s",
      }}
    >
      {/* Game Cover */}
      <Image
      src={game.cover ?? "/covers/default.webp"}
      alt={`${game.name} cover`}
      width={110}
      height={165}
      style={{
        borderRadius: "8px",
        objectFit: "cover",
        boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
        flexShrink: 0,
      }}
      />

      {/* Main info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <span
          style={{
            fontFamily: "var(--font-ui), sans-serif",
            fontSize: "2rem",
            color: "var(--text)",
            letterSpacing: "0.03em",
          }}
        >
          {game.name}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {game.platform && <Badge label={game.platform} />}
          <span
            style={{
              fontFamily: "var(--font-ui), sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: statusColor,
            }}
          >
            ● {statusLabel}
          </span>
          {game.year && (
            <span
              style={{
                fontFamily: "var(--font-ui), sans-serif",
                fontSize: "0.72rem",
                color: "var(--muted)",
                letterSpacing: "0.08em",
              }}
            >
              {game.year}
            </span>
          )}
          <DifficultyPips rank={game.difficultyRank} />
        </div>
      </div>

      {/* Right: ranks + score */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <RankBadge rank={game.loveRank} label="Love" />
        <RankBadge rank={game.difficultyRank} label="Diff" />
        {game.total != null && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.2rem" }}>
            <span
              style={{
                fontFamily: "var(--font-ui), sans-serif",
                fontSize: "1.25rem",
                color: "var(--accent)",
                lineHeight: 1,
              }}
            >
              {game.total.toFixed(1)}
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui), sans-serif",
                fontSize: "0.6rem",
                color: "var(--muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Score
            </span>
          </div>
        )}
      </div>
    </article>
    </Link>
  );
}