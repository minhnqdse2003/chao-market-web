// app/robots.ts

import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Robots {
    headers();
    const baseUrl = process.env.NEXTAUTH_URL;

    if (!baseUrl) {
        throw new Error(
            'Missing NEXTAUTH_URL environment variable. Cannot generate robots.txt'
        );
    }

    return {
        rules: [
            {
                userAgent: '*', // Rule applies to all web crawlers (bots)

                // This is the key part:
                // 'allow: "/"' means crawlers are permitted to access the entire site,
                // starting from the root directory. This IS the "allow all" command.
                allow: '/',

                // The 'disallow' rules below act as exceptions to the general 'allow' rule.
                disallow: [
                    '/_next/', // Don't crawl Next.js internal build/asset folders.
                    '/api/', // Don't crawl API routes as they aren't pages.
                    // Add any other specific paths you want to block here, e.g., '/admin/'
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemaps/sitemap.xml`,
    };
}
