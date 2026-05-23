import { getSheetData } from "@/lib/sheets";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getSheetData("Plats!A1:D16");
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sheet data" },
      { status: 500 }
    );
  }
}