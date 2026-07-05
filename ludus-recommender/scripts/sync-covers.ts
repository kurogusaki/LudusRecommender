import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
import {
  getAccessToken,
  searchGame,
  getCoverUrl,
} from "../lib/igdb";

const prisma = new PrismaClient();

async function downloadCover(url: string, filename: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  const coversDir = path.join(process.cwd(), "public", "covers");

  await mkdir(coversDir, { recursive: true });

  await writeFile(
    path.join(coversDir, filename),
    buffer
  );
}

async function main() {
  const token = await getAccessToken();

  const games = await prisma.game.findMany();

  for (let i = 0; i < games.length; i++) {
  const game = games[i];

  try{
  console.log(`\n[${i + 1}/${games.length}] ${game.name}`);

    if (game.cover) {
  console.log(`⏭ Skipping ${game.name}`);
  continue;
}
  console.log(`Searching: ${game.name}`);

  const result = await searchGame(game.name.trim(), token);

  if (!result) {
    console.log("❌ No match found");
    continue;
  }

  console.log(`✅ Found: ${result.name}`);

  const cover = result.cover;

  if (!cover) {
    console.log("⚠️ Found game but no cover available");
    continue;
  }

  const imageId = cover.image_id;

  const coverUrl = getCoverUrl(imageId);

  await downloadCover(
    coverUrl,
    `${game.id}.webp`
  );

  await prisma.game.update({
  where: {
    id: game.id,
  },
  data: {
    cover: `/covers/${game.id}.webp`,
  },
});

  console.log(`Downloaded ${game.name} -> ${game.id}.webp`);
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