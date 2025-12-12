import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/auth/login', '/auth/sign-up'];
const PROTECTED_ROUTES = ['/account'];

export default withAuth(
    async function middleware(request: NextRequest) {
        const token = await getToken({
            req: request,
        });
        const { pathname } = request.nextUrl;
        const isAuthRoute = AUTH_ROUTES.includes(pathname);
        const isAuthenticated = !!token;

        let response = NextResponse.next();

        if (pathname === '/') {
            response = NextResponse.redirect(
                new URL(isAuthenticated ? '/home' : '/home', request.url)
            );
        } else if (isAuthenticated && isAuthRoute) {
            response = NextResponse.redirect(new URL('/home', request.url));
        }

        const currentGuestId = request.cookies.get('guestId')?.value;

        if (!isAuthenticated && !currentGuestId) {
            const newGuestId = crypto.randomUUID();

            response.cookies.set('guestId', newGuestId, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 365,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            });
        }

        return response;
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                if (
                    PROTECTED_ROUTES.some(route =>
                        req.nextUrl.pathname.startsWith(route)
                    )
                ) {
                    return !!token;
                }

                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
        '/api/:path*',
    ],
};
