import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req) {
    const { email, action } = await req.json();
    const folderId = '1Q37m7Fr9gkmMKEKjxK5jyM7QlL_2015T';

    try {
        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const drive = google.drive({ version: 'v3', auth });

        if (action === 'add') {
            await drive.permissions.create({
                fileId: folderId,
                requestBody: {
                    role: 'reader',
                    type: 'user',
                    emailAddress: email,
                },
            });
            return NextResponse.json({ message: `Access granted to ${email}` });
        }

        if (action === 'remove') {
            const list = await drive.permissions.list({
                fileId: folderId,
                fields: 'permissions(id, emailAddress)',
            });
            const perm = list.data.permissions.find(
                p => p.emailAddress === email
            );
            if (perm) {
                await drive.permissions.delete({
                    fileId: folderId,
                    permissionId: perm.id,
                });
                return NextResponse.json({
                    message: `Access removed from ${email}`,
                });
            }
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
