import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Validate environment variables
        if (
            !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
            !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
            !process.env.GOOGLE_SHEETS_SPREADSHEET_ID
        ) {
            return NextResponse.json(
                { error: 'Missing environment variables' },
                { status: 500 }
            );
        }

        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const range = 'TimeLine!A1:G'; // Fetch data from TimeLine sheet (7 columns)

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
        /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
        console.error(
            'Error fetching Google Sheet data:',
            error.message,
            error.stack
        );
        return NextResponse.json(
            { error: 'Failed to fetch data', details: error.message },
            { status: 500 }
        );
    }
}
