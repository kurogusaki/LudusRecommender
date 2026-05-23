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

  const loveMap = new Map<string, string[]>();
  for (const row of loveRows) {
    if (isValidRow(row, 1)) loveMap.set(row[1].trim(), row);
  }

  const rankingMap = new Map<string, string[]>();
  for (const row of rankingRows) {
    if (isValidRow(row, 1)) rankingMap.set(row[1].trim(), row);
  }

  const rawGames: Game[] = [];

  for (const row of platsRows) {
    if (!isValidRow(row, 1)) continue;

    const name = row[1].trim();
    const love = loveMap.get(name) ?? [];
    const ranking = rankingMap.get(name) ?? [];

    rawGames.push({
      number:         row[0]     ?? "",
      name,
      date:           row[2]     ?? "",
      platform:       row[3]     ?? "",
      loveRank:       (love[2]   ?? "") as Rank,
      difficultyRank: (love[3]   ?? "") as Rank,
      year:           ranking[0] ?? "",
      love:           ranking[2] ?? "",
      difficulty:     ranking[3] ?? "",
      pride:          ranking[4] ?? "",
      achievement:    ranking[5] ?? "",
      list:           ranking[6] ?? "",
      total:          ranking[7] ?? "",
    });
  }

  return transformGames(rawGames);
}