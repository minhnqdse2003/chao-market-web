import Parser from 'rss-parser';
import { NewsSourceType } from '@/app/(user-layout)/market-data/markets/components/vietnam-stock-market-news';

const parser = new Parser();

interface RSSItem {
    title: string;
    link: string;
    pubDate?: string;
    contentSnippet?: string;
}

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

const fetchVNAEnEconomy = async (): Promise<RSSItem[]> => {
    try {
        const rssUrl = 'https://vnanet.vn/en/rss/economy-423.rss'; // Original URL
        const proxyUrl = CORS_PROXY + rssUrl; // Proxy URL
        const feed = await parser.parseURL(proxyUrl); // Use the proxy URL
        return feed.items.slice(0, 5);
    } catch (error) {
        console.error('Error fetching VNA EN Economy RSS via proxy:', error);
        return []; // Return empty array on error
    }
};

const fetchVNAEnLaw = async (): Promise<RSSItem[]> => {
    try {
        const rssUrl = 'https://vnanet.vn/en/rss/law-20.rss'; // Original URL
        const proxyUrl = CORS_PROXY + rssUrl; // Proxy URL
        const feed = await parser.parseURL(proxyUrl); // Use the proxy URL
        return feed.items.slice(0, 5);
    } catch (error) {
        console.error('Error fetching VNA EN Law RSS via proxy:', error);
        return []; // Return empty array on error
    }
};

const fetchVNAViEconomy = async (): Promise<RSSItem[]> => {
    try {
        const rssUrl = 'https://vnanet.vn/vi/rss/kinh-te-4.rss'; // Original URL
        const proxyUrl = CORS_PROXY + rssUrl; // Proxy URL
        const feed = await parser.parseURL(proxyUrl); // Use the proxy URL
        return feed.items.slice(0, 5);
    } catch (error) {
        console.error('Error fetching VNA VI Economy RSS via proxy:', error);
        return []; // Return empty array on error
    }
};

const fetchVNAViCrime = async (): Promise<RSSItem[]> => {
    try {
        const rssUrl = 'https://vnanet.vn/vi/rss/chinh-tri-11.rss'; // Original URL
        const proxyUrl = CORS_PROXY + rssUrl; // Proxy URL
        const feed = await parser.parseURL(proxyUrl); // Use the proxy URL
        return feed.items.slice(0, 5);
    } catch (error) {
        console.error('Error fetching VNA VI Crime RSS via proxy:', error);
        return []; // Return empty array on error
    }
};

const fetchTuoiTreBusiness = async (): Promise<RSSItem[]> => {
    try {
        const rssUrl = 'https://tuoitre.vn/rss/kinh-doanh.rss'; // Original URL
        const proxyUrl = CORS_PROXY + rssUrl; // Proxy URL
        const feed = await parser.parseURL(proxyUrl); // Use the proxy URL
        return feed.items.slice(0, 5);
    } catch (error) {
        console.error('Error fetching Tuoi Tre Business RSS via proxy:', error);
        return []; // Return empty array on error
    }
};

// Main Server Action
export async function fetchNewsFeed(type: NewsSourceType): Promise<RSSItem[]> {
    let fetchFunction: () => Promise<RSSItem[]>;

    switch (type) {
        case 'vna-en-economy':
            fetchFunction = fetchVNAEnEconomy;
            break;
        case 'vna-en-law':
            fetchFunction = fetchVNAEnLaw;
            break;
        case 'vna-vi-economy':
            fetchFunction = fetchVNAViEconomy;
            break;
        case 'vna-vi-politics':
            fetchFunction = fetchVNAViCrime;
            break;
        case 'tuoitre-business':
            fetchFunction = fetchTuoiTreBusiness;
            break;
        default:
            console.error(`Unknown news type: ${type}`);
            return []; // Return empty array for unknown types
    }

    // Execute the specific fetch function
    return await fetchFunction();
}
