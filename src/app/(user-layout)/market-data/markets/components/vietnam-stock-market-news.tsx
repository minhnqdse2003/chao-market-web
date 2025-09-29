'use client';

import { useQuery } from '@tanstack/react-query';
// Import the server action
import { fetchNewsFeed } from '@/services/rss/fetchNews';

// Define types for the prop and RSS data
export type NewsSourceType =
    | 'vna-en-economy'
    | 'vna-en-law'
    | 'vna-vi-economy'
    | 'vna-vi-politics'
    | 'tuoitre-business';

interface RSSItem {
    title: string;
    link: string;
    pubDate?: string;
    contentSnippet?: string;
}

interface CombinedNewsFeedProps {
    type: NewsSourceType;
    limit?: number;
}

export default function CombinedNewsFeed({
    type,
    limit = 5,
}: CombinedNewsFeedProps) {
    let title = '';
    let localeForDate = 'vi-VN';

    switch (type) {
        case 'vna-en-economy':
            title = 'VNA - Economy (English)';
            localeForDate = 'en-US';
            break;
        case 'vna-en-law':
            title = 'VNA - Law (English)';
            localeForDate = 'en-US';
            break;
        case 'vna-vi-economy':
            title = 'VNA - Kinh Tế (Tiếng Việt)';
            localeForDate = 'vi-VN';
            break;
        case 'vna-vi-politics':
            title = 'VNA - Chính Trị (Tiếng Việt)';
            localeForDate = 'vi-VN';
            break;
        case 'tuoitre-business':
            title = 'Tuổi Trẻ - Kinh Doanh';
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
        staleTime: 0, // 1 minute - data becomes stale after 1 minute
        gcTime: 0, // 5 minutes - cache garbage collection time
        retry: 3, // Retry failed requests up to 3 times
        refetchOnWindowFocus: true, // Don't refetch on window focus
        refetchOnReconnect: true, // Refetch on network reconnection
    });

    // Apply limit after fetching (or after getting cached data)
    const limitedArticles = articles.slice(0, limit);

    // Handle loading state
    if (isLoading) {
        return (
            <div className="p-4 border rounded-lg shadow-sm">
                <h2
                    className={`text-xl font-bold mb-4 dark:text-[var(--brand-color)] text-brand-text`}
                >
                    {title}
                </h2>
                <p className="text-gray-500">Đang tải tin tức...</p>
            </div>
        );
    }

    // Handle error state
    if (isError) {
        console.error('Query Error:', error); // Log the error
        return (
            <div className="p-4 border rounded-lg shadow-sm bg-white">
                <h2
                    className={`text-xl font-bold mb-4 dark:text-[var(--brand-color)] text-brand-text`}
                >
                    {title}
                </h2>
                <p className="text-red-500">
                    Lỗi khi tải tin tức: {error.message || 'Đã xảy ra lỗi.'}
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 rounded-lg bg-transparent">
            <h2
                className={`text-xl font-bold mb-4 dark:text-[var(--brand-color)] text-brand-text`}
            >
                {title}
            </h2>
            {limitedArticles.length === 0 ? (
                <p className="text-[var(--brand-grey-foreground)]">
                    Không thể tải tin tức hoặc không có tin tức mới.
                </p>
            ) : (
                <ul className="space-y-3">
                    {limitedArticles.map((article, index) => (
                        <li
                            key={index}
                            className="border-b pb-2 last:border-0 last:pb-0"
                        >
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
                                    {new Date(article.pubDate).toLocaleString(
                                        localeForDate // Use the determined locale
                                    )}{' '}
                                </p>
                            )}
                            {article.contentSnippet && (
                                <p className="text-sm text-[var(--brand-grey-foreground)] mt-1 line-clamp-2">
                                    {article.contentSnippet}{' '}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
