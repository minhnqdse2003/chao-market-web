import Parser from 'rss-parser';
import { NewsSourceType } from '@/app/(user-layout)/market-data/markets/components/vietnam-stock-market-news';

export interface RSSItem {
    title: string;
    link: string;
    pubDate?: string;
    contentSnippet?: string;
    imageUrl?: string;
    sourceUrl?: string;
}

interface Source {
    url: string | string[];
    name: string;
    sourceName?: string;
}

const parser = new Parser();
const CORS_PROXY = '';

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
    rssUrl: string | string[],
    sourceName: string,
    sourceUrl?: string
): Promise<RSSItem[]> => {
    try {
        if (Array.isArray(rssUrl)) {
            // Handle multiple URLs
            const feeds = await Promise.all(
                rssUrl.map(async url => {
                    const proxyUrl = CORS_PROXY + url;
                    return parser.parseURL(proxyUrl);
                })
            );

            const allItems = feeds.flatMap(feed =>
                feed.items.map(item => ({
                    title: item.title || '',
                    link: item.link || '',
                    pubDate: item.pubDate,
                    contentSnippet: item.contentSnippet,
                    imageUrl: getImageUrl(item),
                }))
            );

            console.log(
                `${sourceName}: ${JSON.stringify(allItems, null, 2) || '[]'}`
            );
            return allItems;
        }

        // Handle single URL
        const proxyUrl = CORS_PROXY + rssUrl;
        const feed = await parser.parseURL(proxyUrl);
        const processSourceUrl = (src: string) => {
            if (sourceUrl) return sourceUrl;
            if (src.includes('tuoitre.vn')) return 'tuoitre.vn';
            if (src.includes('reuters.com')) return 'reuters.com';
            if (src.includes('vietstock.vn')) return 'vietstock.vn';
            if (src.includes('investing.com')) return 'investing.com';
            if (src.includes('cointelegraph.com')) return 'cointelegraph.com';
            return src;
        };

        const items = feed.items.map(item => ({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate,
            contentSnippet: item.contentSnippet,
            imageUrl: getImageUrl(item),
            sourceUrl: processSourceUrl(item.link || ''),
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
        url: 'https://rss.app/feeds/60IxVQ11XhTNVSL4.xml',
        name: 'Tuoi Tre News',
        sourceName: 'Tuoitre.vn',
    },
    'us-stock-news-en': {
        url: 'https://rss.app/feeds/IXGcQMYBSCHKqJ61.xml',
        name: 'US Stock News EN',
        sourceName: 'Reuters.com',
    },
    'us-stock-news-vi': {
        url: 'https://rss.app/feeds/D8UMWwfJGO6TM2YM.xml',
        name: 'US Stocks News VI',
        sourceName: 'Vietstock.vn',
    },
    'vietnam-stock-news-vi': {
        url: 'https://rss.app/feeds/i6RqX2QL9Z3reA7l.xml',
        name: 'VN Stock News VI',
        sourceName: 'Vietstock.vn',
    },
    'vietnam-stock-news-en': {
        url: 'https://rss.app/feeds/5JhugYpMZ3AdTjsa.xml',
        name: 'VN stock news EN',
        sourceName: 'Vietstock.vn',
    },
    'currencies-news-vi': {
        name: 'currencies news vi',
        url: 'https://rss.app/feeds/N40SMIfK1pMRWJgO.xml',
        sourceName: 'Investing.com',
    },
    'currencies-news-en': {
        url: 'https://rss.app/feeds/0UhPDk6cG1N50wtB.xml',
        name: 'currencies news en',
        sourceName: 'Investing.com',
    },
    'crypto-currency-news-vn': {
        url: 'https://rss.app/feeds/Pop8yma6o134Yzvc.xml',
        name: 'crypto currencies news VN',
        sourceName: 'Investing.com',
    },
    'crypto-currency-news-en': {
        url: 'https://rss.app/feeds/xMWMxWu6nOvVGTs3.xml',
        name: 'crypto currencies news EN',
        sourceName: 'Cointelegraph.com',
    },
    'commodities-news-vn': {
        url: 'https://rss.app/feeds/dp3J11HS6e1YhZqJ.xml',
        name: 'commodities news VN',
        sourceName: 'Investing.com',
    },
    'commodities-news-en': {
        url: 'https://rss.app/feeds/GHIZV85FraZhhO8A.xml',
        name: 'commodities news EN',
        sourceName: 'Investing.com',
    },
    'facebook-chao-market-page': {
        url: 'https://rss.app/feeds/DbZkOiJKqySE1Yac.xml',
        name: 'Facebook Chao Market Page',
    },
    'tiktok-chao-market-page': {
        url: 'https://rss.app/feeds/et05Kyvc9Tqw33Pa.xml',
        name: 'Tiktok Chao Market Page',
    },
    'thread-chao-market-page': {
        url: 'https://rss.app/feeds/QV4u1yLNeXA2ikRW.xml',
        name: 'Thread Chao Market Page',
    },
    'youtube-chao-market-page': {
        url: 'https://rss.app/feeds/LcMNLmY5DN8IDJ8d.xml',
        name: 'Youtube Chao Market Page',
    },
    'B01-market-fin-news-global-vn': {
        url: 'https://rss.app/feeds/_BRqLOO7u97uGqZdZ.xml',
        name: 'Market Fin News Global VN',
    },
    'B02-market-fin-news--global-en': {
        url: 'https://rss.app/feeds/_WfF2OWkeYpARuihv.xml',
        name: 'Market Fin News Global EN',
    },
    'B03-market-fin-news-vietnam-vn': {
        url: 'https://rss.app/feeds/_Sichy9WylKHt4Kmt.xml',
        name: 'Market Fin News Vietnam VN',
    },
    'B04-market-fin-news-vietnam-en': {
        url: 'https://rss.app/feeds/_OVvfRJHz4g0sMxAV.xml',
        name: 'Market Fin News Vietnam EN',
    },
};

// The main server action remains clean and unchanged
export async function fetchNewsFeed(
    type: NewsSourceType,
    href?: string
): Promise<RSSItem[]> {
    const source = newsSources[type];

    if (!source) {
        console.error(`Unknown news type: ${type}`);
        return [];
    }

    return await fetchRssFeed(
        href ?? source.url,
        source.name,
        source.sourceName
    );
}
