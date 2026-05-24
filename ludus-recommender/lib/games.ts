import { getSheetData } from "./sheets";
import { transformGames, TransformedGame } from "./transform";
import { Game, Rank } from "@/types";

function isValidRow(row: string[], gameColIndex: number): boolean {
  return row.length > gameColIndex && row[gameColIndex]?.trim() !== "";
}

export async function getAllGames(): Promise<TransformedGame[]> {
  const [platsRows, loveRows, rankingRows] = await Promise.all([
    getSheetData("Plats!A2:D1000"),
    getSheetData("Love/Difficulty!A2:D1000"),
    getSheetData("Plat Rankings!A2:H1000"),
  ]);

  // Helper function to extract year from date string like "26/Aug/2013"
  function extractYear(dateStr: string): string {
    const parts = dateStr.split("/");
    return parts[parts.length - 1] ?? "";
  }

  const loveMap = new Map<string, string[]>();
  for (const row of loveRows) {
    if (isValidRow(row, 1)) {
      const number = row[0]?.trim() || "";
      const name = row[1].trim();
      const key = `${name}|${number}`;
      loveMap.set(key, row);
    }
  }

  const rankingMap = new Map<string, string[]>();
  for (const row of rankingRows) {
    if (isValidRow(row, 1)) {
      const year = row[0]?.trim() || "";
      const name = row[1].trim();
      const key = `${name}|${year}`;
      rankingMap.set(key, row);
    }
  }

  const rawGames: Game[] = [];

  for (const row of platsRows) {
    if (!isValidRow(row, 1)) continue;

    const number = row[0]?.trim() || "";
    const name = row[1].trim();
    const dateStr = row[2]?.trim() || "";
    const year = extractYear(dateStr);

    const loveKey = `${name}|${number}`;
    const rankingKey = `${name}|${year}`;

    const love = loveMap.get(loveKey) ?? [];
    const ranking = rankingMap.get(rankingKey) ?? [];

    rawGames.push({
      number,
      name,
      date: dateStr,
      platform: row[3] ?? "",
      loveRank: (love[2] ?? "") as Rank,
      difficultyRank: (love[3] ?? "") as Rank,
      year,
      love: ranking[2] ?? "",
      difficulty: ranking[3] ?? "",
      pride: ranking[4] ?? "",
      achievement: ranking[5] ?? "",
      list: ranking[6] ?? "",
      total: ranking[7] ?? "",
    });
  }

  return transformGames(rawGames);
}