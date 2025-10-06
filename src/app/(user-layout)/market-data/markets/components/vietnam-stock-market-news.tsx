'use client';

import { useQuery } from '@tanstack/react-query';
// Import the server action
import { fetchNewsFeed, RSSItem } from '@/services/rss/fetchNews';

// Define types for the prop and RSS data
export type NewsSourceType =
    | 'vna-en-economy'
    | 'vna-en-politics'
    | 'vna-vi-economy'
    | 'vna-vi-politics'
    | 'tuoitre-business'
    | 'tuoitre-news'
    | 'us-stock-news-en'
    | 'us-stock-news-vi'
    | 'vietnam-stock-news-vi'
    | 'vietnam-stock-news-en'
    | 'currencies-news-vi'
    | 'currencies-news-en'
    | 'crypto-currency-news-vn'
    | 'crypto-currency-news-en'
    | 'commodities-news-vn'
    | 'commodities-news-en'
    | 'facebook-chao-market-page'
    | 'tiktok-chao-market-page'
    | 'thread-chao-market-page'
    | 'youtube-chao-market-page';

interface CombinedNewsFeedProps {
    type: NewsSourceType;
}

export default function CombinedNewsFeed({ type }: CombinedNewsFeedProps) {
    let localeForDate = 'vi-VN';

    switch (type) {
        case 'vna-en-economy':
        case 'vna-en-politics':
        case 'us-stock-news-en':
        case 'vietnam-stock-news-en':
        case 'currencies-news-en':
        case 'crypto-currency-news-en':
        case 'commodities-news-en':
            localeForDate = 'en-US';
            break;
        case 'vna-vi-economy':
        case 'vna-vi-politics':
        case 'tuoitre-business':
        case 'tuoitre-news':
        case 'us-stock-news-vi':
        case 'vietnam-stock-news-vi':
        case 'currencies-news-vi':
        case 'crypto-currency-news-vn':
        case 'commodities-news-vn':
        case 'facebook-chao-market-page':
        case 'tiktok-chao-market-page':
        case 'thread-chao-market-page':
        case 'youtube-chao-market-page':
            localeForDate = 'vi-VN';
            break;
        default:
            console.error(`Unknown news type: ${type}`);
            return (
                <div className="p-4 border rounded-lg shadow-sm bg-white">
                    <p className="text-gray-500">
                        Lỗi: Loại tin tức không hợp lệ.
                    </p>
                </div>
            );
    }

    const {
        data: articles = [] as RSSItem[],
        isLoading,
        isError,
        error,
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useQuery<RSSItem[], Error>({
        queryKey: ['news', type],
        queryFn: () => fetchNewsFeed(type),
        staleTime: 0,
        gcTime: 0,
        retry: 3,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const limitedArticles = articles;

    if (isLoading) {
        return (
            <div className="p-4 border rounded-lg shadow-sm">
                {/*<h2*/}
                {/*    className={`text-xl font-bold mb-4 dark:text-[var(--brand-color)] text-brand-text`}*/}
                {/*>*/}
                {/*    {title}*/}
                {/*</h2>*/}
                <p className="text-gray-500">Đang tải tin tức...</p>
            </div>
        );
    }

    if (isError) {
        console.error('Query Error:', error);
        return (
            <div className="p-4 border rounded-lg shadow-sm bg-white">
                {/*<h2*/}
                {/*    className={`text-xl font-bold mb-4 dark:text-[var(--brand-color)] text-brand-text`}*/}
                {/*>*/}
                {/*    {title}*/}
                {/*</h2>*/}
                <p className="text-red-500">
                    Lỗi khi tải tin tức: {error.message || 'Đã xảy ra lỗi.'}
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 rounded-lg bg-transparent">
            {/*<h2*/}
            {/*    className={`text-xl font-bold mb-4 dark:text-[var(--brand-color)] text-brand-text`}*/}
            {/*>*/}
            {/*    {title}*/}
            {/*</h2>*/}
            {limitedArticles.length === 0 ? (
                <p className="text-[var(--brand-grey-foreground)]">
                    Không thể tải tin tức hoặc không có tin tức mới.
                </p>
            ) : (
                <ul className="space-y-3">
                    {limitedArticles.map((article, index) => (
                        <li
                            key={index}
                            className="border-b pb-2 last:border-0 last:pb-0 flex gap-4"
                        >
                            {article.imageUrl && (
                                <div className="flex-shrink-0">
                                    <a
                                        href={article.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={article.imageUrl}
                                            alt={article.title}
                                            width={1920}
                                            height={1080}
                                            className="rounded-md object-cover w-[320px] h-[160px]"
                                        />
                                    </a>
                                </div>
                            )}
                            <div className={'flex flex-col gap-1'}>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-brand-text hover:underline font-medium`}
                                >
                                    {article.title}
                                </a>
                                {article.pubDate && (
                                    <p className="text-xs text-[var(--brand-grey-foreground)] mt-1">
                                        {new Date(
                                            article.pubDate
                                        ).toLocaleString(
                                            localeForDate // Use the determined locale
                                        )}{' '}
                                    </p>
                                )}
                                {article.contentSnippet && (
                                    <p className="text-sm text-[var(--brand-grey-foreground)] mt-1 line-clamp-2">
                                        {article.contentSnippet}{' '}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
