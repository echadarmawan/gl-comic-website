import { google } from "googleapis";
import { Comic } from "@/types/Comic";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME!;

export async function fetchComicsFromGoogleSheet(): Promise<Comic[]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:Z`,
  });

  const rows = response.data.values ?? [];

  if (rows.length <= 1) {
    return [];
  }

  const headers = rows[0];

  return rows.slice(1).map((row) => {
    const record: Record<string, string> = {};

    headers.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });

    const comic: Comic = {
      id: Number(record.id),
      title: record.title,
      author: record.author,
      artist: record.artist,
      genres: record.genres
        ? record.genres.split(",").map((g) => g.trim())
        : [],
      type: record.type,
      chapters: record.chapters,
      release: Number(record.release),
      status: record.status,
      summary: record.summary,
      tags: record.tags
        ? record.tags.split(",").map((t) => t.trim())
        : [],
      read: record.read,
      image: record.image,
    };

    return comic;
  });
}