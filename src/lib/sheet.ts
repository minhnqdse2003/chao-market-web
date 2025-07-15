import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const range = 'Sheet1!A1:D'; // Adjust range based on your sheet

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
            range,
        });

        const rows = response.data.values;
        if (rows && rows.length) {
            const headers = rows[0];
            const data = rows.slice(1).map(row => {
                return headers.reduce(
                    (obj, header, index) => {
                        obj[header] = row[index] || '';
                        return obj;
                    },
                    {} as Record<string, string>
                );
            });
            return NextResponse.json(data);
        }
        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching Google Sheet data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}
