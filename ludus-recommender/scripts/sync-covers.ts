import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAccessToken(): Promise<string> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Twitch credentials in .env");
  }

  const response = await fetch(
    "https://id.twitch.tv/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`OAuth failed: ${response.status}`);
  }

  const data = await response.json();

  return data.access_token;
}

async function searchGame(gameName: string, token: string) {
  const clientId = process.env.TWITCH_CLIENT_ID!;

  const query = `
    search "${gameName}";
    fields name,cover.image_id,first_release_date;
    limit 1;
  `;

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error(`IGDB request failed: ${response.status}`);
  }

  return response.json();
}

function getCoverUrl(imageId: string): string {
  return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.webp`;
}

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

  if (result.length === 0) {
    console.log(`❌ No match found`);
    continue;
  }

  console.log(`✅ Found: ${result[0].name}`);

  const cover = result[0].cover;

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

main().catch(console.error);