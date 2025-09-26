'use client';

import { useQuery } from '@tanstack/react-query';
// Import the server action
import { fetchNewsFeed } from '@/services/rss/fetchNews';

// Define types for the prop and RSS data
type NewsSourceType =
    | 'vna-en-economy'
    | 'vna-en-law'
    | 'vna-vi-economy'
    | 'vna-vi-crime'
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
    let colorClass = '';
    let localeForDate = 'vi-VN';

    switch (type) {
        case 'vna-en-economy':
            title = 'VNA - Economy (English)';
            colorClass = 'green-700';
            localeForDate = 'en-US';
            break;
        case 'vna-en-law':
            title = 'VNA - Law (English)';
            colorClass = 'green-700';
            localeForDate = 'en-US';
            break;
        case 'vna-vi-economy':
            title = 'VNA - Kinh Tế (Tiếng Việt)';
            colorClass = 'green-700';
            localeForDate = 'vi-VN';
            break;
        case 'vna-vi-crime':
            title = 'VNA - Tội Phạm (Tiếng Việt)';
            colorClass = 'green-700';
            localeForDate = 'vi-VN';
            break;
        case 'tuoitre-business':
            title = 'Tuổi Trẻ - Kinh Doanh';
            colorClass = 'blue-700';
            localeForDate = 'vi-VN';
            break;
        default:
            console.error(`Unknown news type: ${type}`);
            return (
                <div className="p-4 border rounded-lg shadow-sm bg-white">
                    Lỗi: Loại tin tức không hợp lệ.
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
        queryKey: ['news', type], // Include 'news' in the key for clarity
        queryFn: () => fetchNewsFeed(type), // Call the server action
        staleTime: 5 * 60 * 1000, // Optional: Override default stale time if needed
    });

    // Apply limit after fetching (or after getting cached data)
    const limitedArticles = articles.slice(0, limit);

    // Handle loading state
    if (isLoading) {
        return (
            <div className="p-4 border rounded-lg shadow-sm bg-white">
                <h2 className={`text-xl font-bold mb-4 text-${colorClass}`}>
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
                <h2 className={`text-xl font-bold mb-4 text-${colorClass}`}>
                    {title}
                </h2>
                <p className="text-red-500">
                    Lỗi khi tải tin tức: {error.message || 'Đã xảy ra lỗi.'}
                </p>
            </div>
        );
    }

    // Render the actual content once data is loaded and not in error state
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className={`text-xl font-bold mb-4 text-${colorClass}`}>
                {title}
            </h2>
            {limitedArticles.length === 0 ? (
                <p className="text-gray-500">
                    Không thể tải tin tức hoặc không có tin tức mới.
                </p>
            ) : (
                <ul className="space-y-3">
                    {limitedArticles.map((article, index) => (
                        <li
                            key={index} // Consider using article.link or pubDate if available for a more stable key
                            className="border-b pb-2 last:border-0 last:pb-0"
                        >
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-${colorClass.replace('700', '600')} hover:underline font-medium`}
                            >
                                {article.title}
                            </a>
                            {article.pubDate && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(article.pubDate).toLocaleString(
                                        localeForDate // Use the determined locale
                                    )}{' '}
                                </p>
                            )}
                            {article.contentSnippet && (
                                <p className="text-sm text-gray-700 mt-1 line-clamp-2">
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
