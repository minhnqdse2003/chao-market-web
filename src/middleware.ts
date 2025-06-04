import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export default withAuth(
    async function middleware(request: NextRequest) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });
        console.log(`Middleware: \n` + JSON.stringify(token));
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Protect dashboard routes
                if (req.nextUrl.pathname.startsWith('/dashboard')) {
                    return !!token;
                }

                // Protect API routes (except auth routes)
                if (
                    req.nextUrl.pathname.startsWith('/api') &&
                    !req.nextUrl.pathname.startsWith('/api/auth')
                ) {
                    return !!token;
                }

                return true;
            },
        },
    }
);

export const config = {
    matcher: ['/dashboard', '/api/:path*'],
};
