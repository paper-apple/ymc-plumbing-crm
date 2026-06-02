import { google } from "googleapis";

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const sheets = google.sheets({
  version: "v4",
  auth,
});

export async function appendJobRow(
  values: string[]
) {
  await sheets.spreadsheets.values.append({
    spreadsheetId:
      process.env.GOOGLE_SHEET_ID,

    range: "Sheet1!A:G",

    valueInputOption: "RAW",

    requestBody: {
      values: [values],
    },
  });
}