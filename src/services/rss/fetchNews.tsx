import Parser from 'rss-parser';
import { NewsSourceType } from '@/app/(user-layout)/market-data/markets/components/vietnam-stock-market-news';

export interface RSSItem {
    title: string;
    link: string;
    pubDate?: string;
    contentSnippet?: string;
    imageUrl?: string;
}

interface Source {
    url: string;
    name: string;
}

const parser = new Parser();
const CORS_PROXY = 'https://chao-market-proxy.vercel.app/raw?url=';

// A helper function to extract the image URL using a fallback strategy
const getImageUrl = (item: Parser.Item): string | undefined => {
    // 1. Prioritize the standard 'enclosure' tag (works for Tuoi Tre)
    if (item.enclosure?.url) {
        return item.enclosure.url;
    }

    // 2. Fallback: Search for an <img> tag in the 'content' (works for VNA)
    if (item.content) {
        const match = item.content.match(/<img.*?src=['"](.*?)['"]/);
        if (match && match[1]) {
            return match[1];
        }
    }

    // 3. If no image found, return undefined
    return undefined;
};

// Updated generic fetch function
const fetchRssFeed = async (
    rssUrl: string,
    sourceName: string
): Promise<RSSItem[]> => {
    try {
        const proxyUrl = CORS_PROXY + rssUrl;
        const feed = await parser.parseURL(proxyUrl);

        // Map the items, using our new helper function for the image
        const items = feed.items.slice(0, 10).map(item => ({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate,
            contentSnippet: item.contentSnippet,
            imageUrl: getImageUrl(item),
        }));

        console.log(`${sourceName}: ${JSON.stringify(items, null, 2) || '[]'}`);

        return items;
    } catch (error) {
        console.error(`Error fetching ${sourceName} RSS via proxy:`, error);
        return [];
    }
};

const newsSources: Record<NewsSourceType, Source> = {
    'vna-en-economy': {
        url: 'https://rss.app/feeds/nzYKuxLk8jATKh6U.xml',
        name: 'VNA EN Economy',
    },
    'vna-en-politics': {
        url: 'https://rss.app/feeds/Ae0kuuTXAH3KWTiR.xml',
        name: 'VNA EN Law',
    },
    'vna-vi-economy': {
        url: 'https://rss.app/feeds/gXDzCPgXgJGoJFJq.xml',
        name: 'VNA VI Economy',
    },
    'vna-vi-politics': {
        url: 'https://rss.app/feeds/vQeLRqawmDH9FN6v.xml',
        name: 'VNA VI Politics',
    },
    'tuoitre-business': {
        url: 'https://tuoitre.vn/rss/kinh-doanh.rss',
        name: 'Tuoi Tre Business',
    },
    'tuoitre-news': {
        url: 'https://tuoitre.vn/rss/thoi-su.rss',
        name: 'Tuoi Tre News',
    },
};

// The main server action remains clean and unchanged
export async function fetchNewsFeed(type: NewsSourceType): Promise<RSSItem[]> {
    const source = newsSources[type];

    if (!source) {
        console.error(`Unknown news type: ${type}`);
        return [];
    }

    return await fetchRssFeed(source.url, source.name);
}
