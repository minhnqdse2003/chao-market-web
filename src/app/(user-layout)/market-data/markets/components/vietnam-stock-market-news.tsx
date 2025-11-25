'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNewsFeed, RSSItem } from '@/services/rss/fetchNews';
import { TimeAgo } from '@/components/time-ago';
import { capitalizeWords } from '@/utils/string-parsing';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useI18n } from '@/context/i18n/context';
import Image from 'next/image';

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
type FeedType = 'news' | 'social';
type TabType = 'Facebook' | 'Tiktok' | 'Youtube';

interface CombinedNewsFeedProps {
    type: NewsSourceType;
    href?: string;
    feedType?: FeedType;
    currentTab: TabType;
}

export default function CombinedNewsFeed({
    type,
    href,
    feedType = 'news',
    currentTab,
}: CombinedNewsFeedProps) {
    const {
        data: articles = [] as RSSItem[],
        isLoading,
        isError,
        error,
    } = useQuery<RSSItem[], Error>({
        queryKey: ['news', type],
        queryFn: () => fetchNewsFeed(type, href),
        staleTime: 0,
        gcTime: 0,
        retry: 3,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const { theme } = useTheme();
    const { locale } = useI18n();

    const [erroredImages, setErroredImages] = useState<Set<string>>(new Set());

    const handleImageError = (
        url: string,
        e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        const target = e.target as HTMLImageElement;
        target.src = `/img/news-${theme}.png`;
        target.className = 'rounded-md object-contain w-[320px] h-[160px]';
        setErroredImages(prev => new Set(prev).add(url));
    };

    const limitedArticles = articles;

    const processEmptyImageSource = () => {
        switch (feedType) {
            case 'news':
                return `/img/news-${theme}-${locale}.png`;
            case 'social':
            default:
                return '/img/brand-logo-with-hat.svg';
        }
    };

    useEffect(() => {
        setErroredImages(new Set());
    }, [theme]);

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
                                            src={
                                                erroredImages.has(
                                                    article.imageUrl
                                                )
                                                    ? processEmptyImageSource()
                                                    : article.imageUrl
                                            }
                                            alt={article.title}
                                            width={1920}
                                            height={1080}
                                            className="rounded-md object-cover border border-transparent w-[320px] h-[160px]"
                                            onError={e =>
                                                handleImageError(
                                                    article.imageUrl || '',
                                                    e
                                                )
                                            }
                                        />
                                    </a>
                                </div>
                            )}
                            {!article.imageUrl && currentTab !== 'Youtube' && (
                                <Image
                                    width={320}
                                    height={160}
                                    src={processEmptyImageSource()}
                                    alt={'empty-image'}
                                    className="rounded-md object-contain border border-transparent w-[320px] h-[160px]"
                                />
                            )}
                            {article.content && !article.imageUrl && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: article.content,
                                    }}
                                    className="rounded-md border border-transparent w-[320px] h-[160px]"
                                />
                            )}
                            <div className={'flex flex-col gap-1'}>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-brand-text font-bold hover:underline`}
                                >
                                    {article.title}
                                </a>
                                {article.pubDate && (
                                    <div
                                        className={
                                            'flex text-[var(--brand-grey-foreground)]/70 gap-4'
                                        }
                                    >
                                        <TimeAgo
                                            dateString={article.pubDate}
                                            className="text-xs mt-1"
                                        />
                                        {article.sourceUrl && (
                                            <p className="text-xs mt-1">
                                                Source:{' '}
                                                {capitalizeWords(
                                                    article.sourceUrl
                                                )}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {article.contentSnippet && (
                                    <p className="text-brand-text/90 dark:text-[var(--brand-grey-foreground)] font-medium mt-1 line-clamp-2">
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
