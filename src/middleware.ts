import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/auth/signin', '/auth/signup'];

export default withAuth(
    async function middleware(request: NextRequest) {
        const token = await getToken({
            req: request,
        });
        const { pathname } = request.nextUrl;

        const isAuthRoute = AUTH_ROUTES.includes(pathname);
        const isAuthenticated = !!token;

        if (pathname === '/') {
            return NextResponse.redirect(
                new URL(
                    isAuthenticated ? '/dashboard' : '/auth/signin',
                    request.url
                )
            );
        }

        if (isAuthenticated && isAuthRoute) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (!isAuthenticated && !isAuthRoute && !pathname.startsWith('/api')) {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Protect dashboard routes
                if (req.nextUrl.pathname.startsWith('/dashboard')) {
                    return !!token;
                }

                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
        '/api/:path*',
    ],
};
