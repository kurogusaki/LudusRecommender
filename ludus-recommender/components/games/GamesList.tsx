"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────

export interface GameRow {
  id: string;
  name: string;
  platform: string | null;
  loveRank: string | null;
  difficultyRank: string | null;
  total: number | null;
  date: string | null;
  year: number | null;
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

// ─── Helpers ──────────────────────────────────────────────────

function getPlayStatus(loveRank: string | null): { label: string; color: string } {
  if (!loveRank) return { label: "Unrated", color: "var(--muted)" };
  if (loveRank === "S" || loveRank === "A") return { label: "Loved", color: "#7ec8a4" };
  if (loveRank === "B") return { label: "Enjoyed", color: "var(--gold)" };
  if (loveRank === "C") return { label: "Mixed", color: "#7aaedc" };
  return { label: "Disliked", color: "#dc7a7a" };
}

// ─── Sub-components ───────────────────────────────────────────

function RankBadge({ rank, label }: { rank: string | null; label: string }) {
  if (!rank) return null;
  const color = RANK_COLORS[rank] ?? "var(--muted)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
      <span
        style={{
          fontFamily: "var(--font-jersey25)",
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
          fontFamily: "var(--font-jersey25)",
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
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {order.map((_, i) => (
        <span
          key={i}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "1px",
            background: i < level ? "var(--gold)" : "var(--border)",
            display: "inline-block",
          }}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
        gap: "1.5rem",
        border: "1px dashed var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          border: "2px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 12h.01" />
          <path d="M7 12h.01" />
          <path d="M17 12h.01" />
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-jersey25)",
            fontSize: "1.25rem",
            color: "var(--text)",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
          }}
        >
          No Games Found
        </p>
        <p
          style={{
            fontFamily: "var(--font-jersey25)",
            fontSize: "0.9rem",
            color: "var(--muted)",
            maxWidth: "28rem",
            lineHeight: 1.7,
          }}
        >
          Your library is empty. Sync your Google Sheet to populate the games database.
        </p>
      </div>
    </div>
  );
}

function GameCard({ game, index }: { game: GameRow; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { label: statusLabel, color: statusColor } = getPlayStatus(game.loveRank);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1c1c1f" : "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "3rem 3.5rem",
        display: "grid",
        gridTemplateColumns: "2.5rem 1fr auto",
        gap: "1.25rem",
        alignItems: "center",
        transition: "background 0.15s",
      }}
    >
      {/* Index */}
      <span
        style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "0.8rem",
          color: "var(--border)",
          letterSpacing: "0.05em",
          textAlign: "right",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Main info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <span
          style={{
            fontFamily: "var(--font-jersey25)",
            fontSize: "2rem",
            color: "var(--text)",
            letterSpacing: "0.03em",
          }}
        >
          {game.name}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {game.platform && (
            <span
              style={{
                fontFamily: "var(--font-jersey25)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                border: "1px solid var(--border)",
                padding: "0.15rem 0.5rem",
              }}
            >
              {game.platform}
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--font-jersey25)",
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
                fontFamily: "var(--font-jersey25)",
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
                fontFamily: "var(--font-jersey25)",
                fontSize: "1.25rem",
                color: "var(--gold)",
                lineHeight: 1,
              }}
            >
              {game.total.toFixed(1)}
            </span>
            <span
              style={{
                fontFamily: "var(--font-jersey25)",
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
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────

export function GamesList({ games }: { games: GameRow[] }) {
  return (
    <div style={{ padding: "4rem 0", display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.5rem",
            }}
          >
            Catalogue
          </p>
          <h1
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--text)",
              letterSpacing: "0.05em",
              lineHeight: 1.1,
            }}
          >
            Games Library
          </h1>
        </div>

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "0.75rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.15rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "2rem",
              color: "var(--gold)",
              lineHeight: 1,
            }}
          >
            {games.length}
          </span>
          <span
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {games.length === 1 ? "Game" : "Games"}
          </span>
        </div>
      </div>

      {/* Legend */}
      {games.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "2rem",
            padding: "0.75rem 1.5rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Ranks:
          </span>
          {Object.entries(RANK_COLORS).map(([rank, color]) => (
            <span
              key={rank}
              style={{
                fontFamily: "var(--font-jersey25)",
                fontSize: "0.75rem",
                color,
                letterSpacing: "0.1em",
              }}
            >
              {rank}
            </span>
          ))}
          <span
            style={{
              width: "1px",
              height: "1rem",
              background: "var(--border)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Difficulty pips: low → high
          </span>
        </div>
      )}

      {/* Games list */}
      {games.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            border: "1px solid var(--border)",
            background: "var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          {games.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}