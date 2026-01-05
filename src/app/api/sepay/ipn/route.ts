import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const apiKey = req.headers.get('X-Secret-Key');
        if (apiKey !== process.env.SEPAY_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();

        return NextResponse.json({ body: body }, { status: 200 });
    } catch (error) {
        console.error('SePay Webhook Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
