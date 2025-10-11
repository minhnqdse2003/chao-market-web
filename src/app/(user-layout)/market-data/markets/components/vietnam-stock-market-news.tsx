'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNewsFeed, RSSItem } from '@/services/rss/fetchNews';
import { TimeAgo } from '@/components/time-ago';
import { capitalizeWords } from '@/utils/string-parsing';

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
    | 'youtube-chao-market-page'
    | 'B01-market-fin-news-global-vn'
    | 'B02-market-fin-news--global-en'
    | 'B03-market-fin-news-vietnam-vn'
    | 'B04-market-fin-news-vietnam-en';

interface CombinedNewsFeedProps {
    type: NewsSourceType;
}

export default function CombinedNewsFeed({ type }: CombinedNewsFeedProps) {
    const {
        data: articles = [] as RSSItem[],
        isLoading,
        isError,
        error,
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
                <p className="text-gray-500">Đang tải tin tức...</p>
            </div>
        );
    }

    if (isError) {
        console.error('Query Error:', error);
        return (
            <div className="p-4 border rounded-lg shadow-sm bg-white">
                <p className="text-red-500">
                    Lỗi khi tải tin tức: {error.message || 'Đã xảy ra lỗi.'}
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 rounded-lg bg-transparent">
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
                                            onError={e => {
                                                const target =
                                                    e.target as HTMLImageElement;
                                                target.src =
                                                    '/img/brand-logo-with-hat.svg';
                                                target.className =
                                                    'rounded-md object-contain w-[320px] h-[160px]';
                                            }}
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
                                    <div className={'flex gap-4'}>
                                        <TimeAgo
                                            dateString={article.pubDate}
                                            className="text-xs text-[var(--brand-grey-foreground)] mt-1"
                                        />
                                        {article.sourceUrl && (
                                            <p className="text-xs text-[var(--brand-grey-foreground)] mt-1">
                                                Source:{' '}
                                                {capitalizeWords(
                                                    article.sourceUrl
                                                )}
                                            </p>
                                        )}
                                    </div>
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
