// app/sitemap.ts
import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { headers } from 'next/headers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    headers();
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/chao-solutions`,
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
            url: `${baseUrl}/auth/sign-up`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    try {
        const postsData = await db
            .select({
                slug: posts.slug,
                createdAt: posts.createdAt,
            })
            .from(posts)
            .orderBy(desc(posts.createdAt))
            .limit(1000);

        const dynamicPages: MetadataRoute.Sitemap = postsData.map(post => {
            const lastModified = post.createdAt;

            return {
                url: `${baseUrl}/chao-insights/${post.slug}`,
                lastModified: lastModified
                    ? new Date(lastModified).toISOString()
                    : new Date().toISOString(),
                changeFrequency: 'weekly',
                priority: 0.7,
            };
        });

        console.log('Dynamic Pages: ', dynamicPages);

        return [...staticPages, ...dynamicPages];
    } catch (error) {
        console.error('⚠️ Sitemap generation warning:', error);
        return staticPages;
    }
}
