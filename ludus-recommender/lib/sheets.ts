import { google } from "googleapis";

const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
const sheetId = process.env.GOOGLE_SHEET_ID;

if (!apiKey) throw new Error("Missing GOOGLE_SHEETS_API_KEY in .env");
if (!sheetId) throw new Error("Missing GOOGLE_SHEET_ID in .env");

const sheets = google.sheets({
  version: "v4",
  auth: apiKey,
});

export async function getSheetData(range: string): Promise<string[][]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });

  return (response.data.values as string[][]) ?? [];
}

// Example usage: getSheetData("TabName!StartCell:EndCell")