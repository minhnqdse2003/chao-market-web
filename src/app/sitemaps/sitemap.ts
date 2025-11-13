// app/sitemap.ts
import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/our-solutions`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/auth/login`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/auth/signup`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    try {
        // Fetch posts for dynamic news-event pages
        const postsData = await db
            .select({
                slug: posts.slug,
                createdAt: posts.createdAt,
            })
            .from(posts)
            .orderBy(desc(posts.createdAt))
            .limit(1000);

        // Generate dynamic pages
        const dynamicPages: MetadataRoute.Sitemap = postsData.map(post => {
            const lastModified = post.createdAt;

            return {
                url: `${baseUrl}/news-event/${post.slug}`,
                lastModified: lastModified
                    ? new Date(lastModified).toISOString()
                    : new Date().toISOString(),
                changeFrequency: 'weekly',
                priority: 0.7,
            };
        });

        return [...staticPages, ...dynamicPages];
    } catch (error) {
        console.error('⚠️ Sitemap generation warning:', error);
        return staticPages;
    }
}
