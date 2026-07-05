import "dotenv/config";

import { PrismaClient } from "@prisma/client";

import {
  getAccessToken,
  searchGame,
  mapIGDBGame,
} from "../lib/igdb";

const prisma = new PrismaClient();

async function main() {
  const token = await getAccessToken();

  const games = await prisma.game.findMany();

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    try {
      console.log(`\n[${i + 1}/${games.length}] ${game.name}`);

      const result = await searchGame(game.name.trim(), token);

      if (!result) {
        console.log("❌ No IGDB match");
        continue;
      }

      console.log(`✅ ${result.name}`);

      const metadata = mapIGDBGame(result);

      await prisma.game.update({
        where: {
          id: game.id,
        },
        data: metadata,
      });
    
      if (game.igdbId) {
        console.log("⏭ Already synced");
        continue;
      }

      console.log("✔ Metadata synced");
    } catch (err) {
      console.error(`Failed: ${game.name}`, err);
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });