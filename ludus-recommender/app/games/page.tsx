import prisma from "@/lib/prisma";
import { GamesList } from "@/components/games/GamesList";

async function getAllGames() {
  return prisma.game.findMany({
    select: {
  id: true,
  number: true,
  name: true,
  cover: true,

  platform: true,

  loveRank: true,
  difficultyRank: true,

  year: true,

  love: true,
  difficulty: true,
  pride: true,
  achievement: true,
  list: true,
  total: true,

  date: true,

  igdbId: true,
  slug: true,
  summary: true,

  genres: true,
  platforms: true,
  themes: true,
  gameModes: true,
  keywords: true,

  developer: true,
  publisher: true,

  releaseDate: true,
},
  });
}

export default async function GamesPage() {
  const games = await getAllGames();

  const typedGames = games.map((game) => ({
  ...game,

  genres: (game.genres ?? []) as { id: number; name: string }[],
  platforms: (game.platforms ?? []) as { id: number; name: string }[],
  themes: (game.themes ?? []) as { id: number; name: string }[],
  gameModes: (game.gameModes ?? []) as { id: number; name: string }[],
  keywords: (game.keywords ?? []) as { id: number; name: string }[],
}));

  return <GamesList games={typedGames} />;
}