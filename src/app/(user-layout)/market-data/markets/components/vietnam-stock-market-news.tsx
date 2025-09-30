'use client';

import { useQuery } from '@tanstack/react-query';
// Import the server action
import { fetchNewsFeed, RSSItem } from '@/services/rss/fetchNews';
import Image from 'next/image';

// Define types for the prop and RSS data
export type NewsSourceType =
    | 'vna-en-economy'
    | 'vna-en-politics'
    | 'vna-vi-economy'
    | 'vna-vi-politics'
    | 'tuoitre-business'
    | 'tuoitre-news';

interface CombinedNewsFeedProps {
    type: NewsSourceType;
    limit?: number;
}

export default function CombinedNewsFeed({
    type,
    limit = 10,
}: CombinedNewsFeedProps) {
    let localeForDate = 'vi-VN';

    switch (type) {
        case 'vna-en-economy':
            localeForDate = 'en-US';
            break;
        case 'vna-en-politics':
            localeForDate = 'en-US';
            break;
        case 'vna-vi-economy':
            localeForDate = 'vi-VN';
            break;
        case 'vna-vi-politics':
            localeForDate = 'vi-VN';
            break;
        case 'tuoitre-business':
            localeForDate = 'vi-VN';
            break;
        case 'tuoitre-news':
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
        retry: 10,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const limitedArticles = articles.slice(0, limit);

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
                                        {type.includes('vna') ? (
                                            <img
                                                src={article.imageUrl}
                                                alt={article.title}
                                                width={1920}
                                                height={1080}
                                                className="rounded-md object-cover w-[320px] h-[160px]"
                                            />
                                        ) : (
                                            <Image
                                                src={article.imageUrl}
                                                alt={article.title}
                                                width={600}
                                                height={600}
                                                className="rounded-md object-cover w-[320px] h-[160px]"
                                            />
                                        )}
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
