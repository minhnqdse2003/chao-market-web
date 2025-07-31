// app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXTAUTH_URL;

    // Ensure the base URL is available, otherwise the sitemap URL will be incomplete
    if (!baseUrl) {
        // You can return a default robots configuration or null
        // Returning null will prevent the robots.txt file from being generated.
        // It's better to throw an error during build to catch missing env vars.
        throw new Error(
            'Missing NEXTAUTH_URL environment variable. Cannot generate robots.txt'
        );
    }

    return {
        rules: [
            {
                userAgent: '*', // This rule applies to all bots
                allow: '/', // Allow crawling of all pages by default
                disallow: [
                    // But disallow crawling of these specific paths
                    '/_next/', // Next.js internal files
                    '/api/', // API routes
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`, // The full URL to your sitemap
    };
}
