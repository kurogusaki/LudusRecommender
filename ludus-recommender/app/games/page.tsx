import prisma from "@/lib/prisma";
import { GamesList } from "@/components/games/GamesList";

async function getAllGames() {
  return prisma.game.findMany({
    select: {
      id: true,
      name: true,
      cover: true,
      platform: true,
      loveRank: true,
      difficultyRank: true,
      total: true,
      date: true,
      year: true,
    },
  });
}

export default async function GamesPage() {
  const games = await getAllGames();
  return <GamesList games={games} />;
}