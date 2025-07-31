// app/sitemap.ts
// --- STATIC TEST VERSION ---

import { MetadataRoute } from 'next';

// NOTICE: The function is no longer 'async'
export default function sitemap(): MetadataRoute.Sitemap {
    // FOR TESTING: We are hardcoding the base URL to eliminate
    // the environment variable as a potential point of failure.
    const baseUrl = 'https://chao-market.vercel.app';

    // We are only returning a few known-good, simple static pages.
    // No fetching, no try-catch, no dynamic data.
    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/home`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date().toISOString(),
        },
    ];
}
