"use client";

import { useMemo, useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import GameCard from "@/components/ui/GameCard";
import FilterGroup from "@/components/ui/FilterGroup";
import MultiSelect from "@/components/ui/MultiSelect";
import { CONTROL } from "@/lib/ui";

// ─── Types ────────────────────────────────────────────────────

export interface GameRow {
  id: string;

  number: number | null;

  name: string;

  cover: string | null;

  platform: string | null;

  loveRank: string | null;
  difficultyRank: string | null;

  year: number | null;

  love: number | null;
  difficulty: number | null;
  pride: number | null;
  achievement: number | null;
  list: number | null;
  total: number | null;

  date: string | null;

  igdbId: number | null;
  slug: string | null;
  summary: string | null;

  genres: { id: number; name: string }[];
  platforms: { id: number; name: string }[];
  themes: { id: number; name: string }[];
  gameModes: { id: number; name: string }[];
  keywords: { id: number; name: string }[];

  developer: string | null;
  publisher: string | null;

  releaseDate: Date | null;
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

const RANK_ORDER = ["S", "A", "B", "C", "D", "F"];

// Sub-components

const SORT_OPTIONS = [
  { value: "title-asc", label: "Title (A–Z)" },
  { value: "title-desc", label: "Title (Z–A)" },

  { value: "rating-desc", label: "Rating (Highest)" },
  { value: "rating-asc", label: "Rating (Lowest)" },

  { value: "hours-desc", label: "Hours Played (Most)" },
  { value: "hours-asc", label: "Hours Played (Least)" },

  { value: "date-desc", label: "Date Added (Newest)" },
  { value: "date-asc", label: "Date Added (Oldest)" },
];

// ─── Main export ──────────────────────────────────────────────

export function GamesList({ games }: { games: GameRow[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("title-asc");

const availablePlatforms = useMemo(() => {
  const platforms = new Set<string>();

  games.forEach((game) => {
    game.platforms?.forEach((platform) => {
      platforms.add(platform.name);
    });
  });

  return [...platforms].sort();
}, [games]);  

const availableDifficulties = useMemo(() => {
  const ranks = [
    ...new Set(
      games
        .map((game) => game.difficultyRank)
        .filter((rank): rank is string => !!rank)
    ),
  ];

  return ranks.sort(
    (a, b) => RANK_ORDER.indexOf(a) - RANK_ORDER.indexOf(b)
  );
}, [games]);

const availableGenres = useMemo(() => {
  const genres = new Set<string>();

  games.forEach((game) => {
    if (!game.genres) return;

    const list = game.genres as { id: number; name: string }[];

    list.forEach((genre) => genres.add(genre.name));
  });

  return [...genres].sort();
}, [games]);

const filteredGames = useMemo(() => {
  let filtered = [...games];

  const query = searchQuery.trim().toLowerCase();

// Platform filter
if (selectedPlatforms.length > 0) {
  filtered = filtered.filter((game) => {
    const platforms =
      game.platforms?.map((platform) => platform.name) ?? [];

    return selectedPlatforms.some((platform) =>
      platforms.includes(platform)
    );
  });
}

// Difficulty filter

if (selectedDifficulties.length > 0) {
  filtered = filtered.filter((game) => {
    return (
      game.difficultyRank &&
      selectedDifficulties.includes(game.difficultyRank)
    );
  });
}

  if (query) {
    filtered = filtered.filter((game) => {
      const genres = game.genres
        ?.map((g) => g.name.toLowerCase())
        .join(" ") ?? "";

      return (
        game.name.toLowerCase().includes(query) ||
        genres.includes(query)
      );
    });
  }

  if (selectedGenres.length > 0) {
    filtered = filtered.filter((game) => {
      const genres =
        game.genres?.map((g) => g.name) ?? [];

      return selectedGenres.some((genre) =>
        genres.includes(genre)
      );
    });
  }

  filtered.sort((a, b) => {
  switch (sortOption) {
    case "title-asc":
      return a.name.localeCompare(b.name);

    case "title-desc":
      return b.name.localeCompare(a.name);

    case "rating-desc":
      return (b.total ?? 0) - (a.total ?? 0);

    case "rating-asc":
      return (a.total ?? 0) - (b.total ?? 0);

    case "hours-desc":
      return (b.list ?? 0) - (a.list ?? 0);

    case "hours-asc":
      return (a.list ?? 0) - (b.list ?? 0);

    case "date-desc":
      return (
        new Date(b.date ?? 0).getTime() -
        new Date(a.date ?? 0).getTime()
      );

    case "date-asc":
      return (
        new Date(a.date ?? 0).getTime() -
        new Date(b.date ?? 0).getTime()
      );

    default:
      return 0;
  }
});

  return filtered;
}, [games, searchQuery, selectedGenres, selectedDifficulties, selectedPlatforms, sortOption]);
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
            height: CONTROL.height,
            padding: `0 ${CONTROL.paddingX}`,
            fontSize: CONTROL.fontSize,
            borderRadius: CONTROL.radius,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            outline: "none",
          }}
        />
  <span
    style={{
        fontFamily: "var(--font-ui), sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--muted)",
    }}
>
    Discover
</span>
      {/* FILTERS */}
      <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    alignItems: "start",
  }}
>
  <FilterGroup title="Genres">
  <MultiSelect
    placeholder="Select genres"
    options={availableGenres}
    selected={selectedGenres}
    onChange={setSelectedGenres}
  />
</FilterGroup>

<FilterGroup title="Platforms">
  <MultiSelect
    placeholder="Select platforms"
    options={availablePlatforms}
    selected={selectedPlatforms}
    onChange={setSelectedPlatforms}
  />
</FilterGroup>

  <FilterGroup title="Sort By">
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      style={{
        width: "100%",
        height: CONTROL.height,
        padding: `0 ${CONTROL.paddingX}`,
        fontSize: CONTROL.fontSize,
        borderRadius: CONTROL.radius,
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        cursor: "pointer",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text)",
        fontFamily: "var(--font-body), sans-serif",
      }}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      
    </select>

    
  </FilterGroup>

  <FilterGroup title="Difficulty">
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}
    >
      {availableDifficulties.map((difficulty) => (
        <Badge
          key={difficulty}
          label={difficulty}
          color={RANK_COLORS[difficulty]}
          active={selectedDifficulties.includes(difficulty)}
          onClick={() => {
            setSelectedDifficulties((current) =>
              current.includes(difficulty)
                ? current.filter((d) => d !== difficulty)
                : [...current, difficulty]
            );
          }}
        />
      ))}
    </div>
  </FilterGroup>
</div>
      
      {/* Legend */}
      {games.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
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