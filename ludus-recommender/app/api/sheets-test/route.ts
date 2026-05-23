import { getAllGames } from "@/lib/games";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const games = await getAllGames();
    return NextResponse.json({
      success: true,
      count: games.length,
      games,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch and transform games" },
      { status: 500 }
    );
  }
}