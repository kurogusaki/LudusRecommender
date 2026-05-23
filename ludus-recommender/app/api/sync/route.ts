import { syncGamesFromSheet } from "@/lib/sync";
import { NextRequest, NextResponse } from "next/server";

const SYNC_SECRET = process.env.SYNC_SECRET;

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("x-sync-secret");

    if (!SYNC_SECRET) {
      return NextResponse.json(
        { success: false, error: "SYNC_SECRET not configured on server" },
        { status: 500 }
      );
    }

    if (authHeader !== SYNC_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await syncGamesFromSheet();
    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected server error";
    console.error("Sync route error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}