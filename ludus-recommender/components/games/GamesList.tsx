"use client";

import { useMemo, useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import GameCard from "@/components/ui/GameCard";

// ─── Types ────────────────────────────────────────────────────

export interface GameRow {
  id: string;
  name: string;
  cover: string | null;
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

// ─── Main export ──────────────────────────────────────────────

export function GamesList({ games }: { games: GameRow[] }) {
  const [searchQuery, setSearchQuery] = useState("");

const filteredGames = useMemo(() => {
  const query = searchQuery.trim().toLowerCase();

  if (!query) return games;

  return games.filter((game) => {
    return (
      game.name.toLowerCase().includes(query)
    );
  });
}, [games, searchQuery]);
  return (
    <div style={{ padding: "4rem 0", display: "flex", flexDirection: "column", gap: "2rem" }}>

    <PageHeader
      eyebrow="Catalogue"
      title="Games Library"
      right={
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.15rem",
        }}>
          <span style={{
            fontFamily: "var(--font-ui), sans-serif",
            fontSize: "2rem",
            color: "var(--accent)",
            lineHeight: 1,
          }}>
            {games.length}
          </span>
          <span style={{
            fontFamily: "var(--font-ui), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}>
            {games.length === 1 ? "Game" : "Games"}
          </span>
        </div>
      }
    />
    {/* Search bar */}
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "0.85rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />

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
              fontFamily: "var(--font-ui), sans-serif",
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
                fontFamily: "var(--font-ui), sans-serif",
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
              fontFamily: "var(--font-ui), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Difficulty Pips: Low → High
          </span>
        </div>
      )}

      {/* Games list */}
      {games.length === 0 ? (
          <EmptyState
            title="No Games Found"
            message="Your library is empty. Sync your Google Sheet to populate the games database."
          />
        ) : filteredGames.length === 0 ? (
          <EmptyState
            title="No Results"
            message="Try changing your search or clearing the search box."
          />
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
          {filteredGames.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}