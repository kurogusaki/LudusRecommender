import prisma from "./prisma";
import { getAllGames } from "./games";

export async function syncGamesFromSheet(): Promise<{
  success: boolean;
  processed: number;
  inserted: number;
  updated: number;
  skipped: number;
  error?: string;
}> {
  let processed = 0;
  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  let success = true;
  let errorMessage: string | undefined;

  try {
    const games = await getAllGames();

    for (const game of games) {
      try {
        // Check if game already exists
       const existing = await prisma.game.findUnique({
        where: {
          name_platform: {
            name: game.name,
            platform: game.platform ?? "",
          },
        },
      });

        await prisma.game.upsert({
          where: { 
            name_platform: { 
              name: game.name, 
              platform: game.platform ?? "",
          }
        },
          update: {
            number:         game.number,
            date:           game.date,
            platform:       game.platform,
            loveRank:       game.loveRank || null,
            difficultyRank: game.difficultyRank || null,
            year:           game.year,
            love:           game.love,
            difficulty:     game.difficulty,
            pride:          game.pride,
            achievement:    game.achievement,
            list:           game.list,
            total:          game.total,
          },
          create: {
            name:           game.name,
            number:         game.number,
            date:           game.date,
            platform:       game.platform,
            loveRank:       game.loveRank || null,
            difficultyRank: game.difficultyRank || null,
            year:           game.year,
            love:           game.love,
            difficulty:     game.difficulty,
            pride:          game.pride,
            achievement:    game.achievement,
            list:           game.list,
            total:          game.total,
          },
        });

        existing ? updated++ : inserted++;
        processed++;
      } catch (rowError) {
        console.warn(`Skipping game "${game.name}":`, rowError);
        skipped++;
      }
    }
  } catch (err) {
    success = false;
    errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Sync failed:", errorMessage);
  }

  // ─── Log the sync run ────────────────────────────────────
  await prisma.syncLog.create({
    data: {
      recordsProcessed: processed,
      recordsSkipped:   skipped,
      success,
      error:            errorMessage ?? null,
    },
  });

  return { success, processed, inserted, updated, skipped, error: errorMessage };
}