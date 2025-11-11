'use server';

import { db } from '@/lib/db';
import { metaData } from '@/db/schema'; // ← import your table
import { eq, desc } from 'drizzle-orm';

interface RssConfigProps {
    type: string;
    localized: {
        en: {
            title: string;
            rss: { url: string; name: string; sourceName?: string };
        };
        vi: {
            title: string;
            rss: { url: string; name: string; sourceName?: string };
        };
    };
}

export type MarketConfigProps = {
    tabs: Array<RssConfigProps>;
    financialNews: Array<RssConfigProps>;
    socials: Array<RssConfigProps>;
};

// Optional: Define a stricter type for your config (recommended!)
export type MetaDataConfig = {
    homeBanner: Array<{
        en: {
            title: string;
            description: string;
            link: string;
            imgUrl: string;
        };
        vi: {
            title: string;
            description: string;
            link: string;
            imgUrl: string;
        };
    }>;
    market: MarketConfigProps;
};

export const getMetaDataConfig = async (): Promise<{
    success: boolean;
    data?: MetaDataConfig;
    error?: string;
}> => {
    try {
        const [latest] = await db
            .select({
                content: metaData.content,
                version: metaData.version,
                createdAt: metaData.createdAt,
            })
            .from(metaData)
            .where(eq(metaData.isPublished, true))
            .orderBy(desc(metaData.version), desc(metaData.createdAt))
            .limit(1);

        if (!latest) {
            return {
                success: false,
                error: 'No published metadata config found',
            };
        }

        return {
            success: true,
            data: latest.content as MetaDataConfig,
        };
    } catch (error) {
        console.error('Failed to fetch metadata config:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};
