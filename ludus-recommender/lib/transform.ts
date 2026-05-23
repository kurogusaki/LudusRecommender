import { Game, Rank } from "@/types";

const VALID_RANKS = ["S", "A", "B", "C", "D", "F"];

// ─── Primitives ───────────────────────────────────────────────

function trimOrNull(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed && trimmed !== "" ? trimmed : null;
}

function toNumberOrNull(value: string | undefined): number | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const num = Number(trimmed);
  return isNaN(num) ? null : num;
}

// ─── Validators ───────────────────────────────────────────────

function validateRank(value: string | undefined, field: string): Rank {
  const trimmed = value?.trim().toUpperCase();
  if (!trimmed) return "" as Rank;
  if (!VALID_RANKS.includes(trimmed)) {
    console.warn(`Invalid rank "${value}" in field "${field}" — skipping`);
    return "" as Rank;
  }
  return trimmed as Rank;
}

function validateScore(
  value: string | undefined,
  field: string,
  min: number,
  max: number
): number | null {
  const num = toNumberOrNull(value);
  if (num === null) return null;
  if (num < min || num > max) {
    console.warn(
      `Score "${value}" in field "${field}" is out of range (${min}–${max}) — flagging as null`
    );
    return null;
  }
  return num;
}

// ─── Row validator ────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateGameRow(raw: Partial<Game>): ValidationResult {
  if (!raw.name || raw.name.trim() === "") {
    return { valid: false, reason: "Missing game name" };
  }
  return { valid: true };
}

// ─── Transformer ──────────────────────────────────────────────

export interface TransformedGame {
  // Tab 1 — Plats
  number:         number | null;
  name:           string;
  date:           string | null;
  platform:       string | null;
  // Tab 2 — Love/Difficulty ranks
  loveRank:       Rank;
  difficultyRank: Rank;
  // Tab 3 — Plat Rankings scores
  year:           number | null;
  love:           number | null;    // 1–5
  difficulty:     number | null;    // 1–5
  pride:          number | null;    // -1–5 (penalty for MP trophies)
  achievement:    number | null;    // 0–5 (0 = rarity > 50%)
  list:           number | null;    // 1–5
  total:          number | null;
}



export function transformGame(raw: Game): TransformedGame | null {

    
  const { valid, reason } = validateGameRow(raw);
  if (!valid) {
    console.warn(`Skipping row — ${reason}:`, raw);
    return null;
  }

  return {
    // Tab 1
    number:         toNumberOrNull(raw.number),
    name:           raw.name.trim(),
    date:           trimOrNull(raw.date),
    platform:       trimOrNull(raw.platform),
    // Tab 2
    loveRank:       validateRank(raw.loveRank, "loveRank"),
    difficultyRank: validateRank(raw.difficultyRank, "difficultyRank"),
    // Tab 3
    year:           toNumberOrNull(raw.year),
    love:           validateScore(raw.love, "love", 0, 5),
    difficulty:     validateScore(raw.difficulty, "difficulty", 0, 5),
    pride:          validateScore(raw.pride, "pride", -1, 5),
    achievement:    validateScore(raw.achievement, "achievement", 0, 5),
    list:           validateScore(raw.list, "list", 0, 5),
    total:          toNumberOrNull(raw.total),
  };
}

export function transformGames(rawGames: Game[]): TransformedGame[] {
  return rawGames
    .map(transformGame)
    .filter((g): g is TransformedGame => g !== null);
}