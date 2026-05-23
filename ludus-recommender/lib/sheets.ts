import { google } from "googleapis";

const sheets = google.sheets({
  version: "v4",
  auth: process.env.GOOGLE_SHEETS_API_KEY,
});

export async function getSheetData(range: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range, 
  });

  return response.data.values;
}

// Example usage: getSheetData("TabName!StartCell:EndCell")