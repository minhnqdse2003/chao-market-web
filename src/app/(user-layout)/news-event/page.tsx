import { capitalizeWords } from '@/utils/string-parsing';

export const dynamic = 'force-dynamic'; // or 'force-dynamic'
export const revalidate = 3600;
export const fetchCache = 'force-cache';

import React from 'react';
import { NewsType } from './utils/data-utils';
import NewsEventFilterDialogComp from './components/news-filter';
import { getPosts } from '@/app/api/posts';
import { Post } from '@/db/schema';
import { PaginatedResponse } from '@/types/pagination';
import { NewsEventsBanner } from '@/components/app-banner';
import AppTabsServerSide, {
    TabServerSide,
} from '@/components/app-tabs-server-side';
import NewsComp from '@/app/(user-layout)/news-event/components/news';
import { Pagination } from '@/components/app-pagination-server-side';
import { BrandLogoFtHat } from '@image/index';
import { Localized } from '@/types/localized';
import { T } from '@/components/app-translate';

interface PageProps {
    searchParams: {
        type?: string | string[];
        filterBy?: string;
        pageIndex?: string;
        pageSize?: string;
    };
}

const Page = async ({ searchParams }: PageProps) => {
    const { type, filterBy, pageIndex, pageSize } = searchParams;

    // Convert string parameters to numbers with defaults
    const pageNum = pageIndex ? parseInt(pageIndex, 10) : 0;
    const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 10;

    // Fetch posts
    const postsData: PaginatedResponse<Post> = await getPosts({
        type: ['news'],
        filterBy: filterBy as
            | 'recommended'
            | 'hottest'
            | 'mostViewed'
            | 'topRated'
            | undefined,
        pageIndex: pageNum,
        pageSize: pageSizeNum,
    });

    // Map posts data to NewsType format
    const mapPostsToNewsType = (): NewsType[] => {
        if (!postsData?.data) return [];
        return postsData.data.map(post => ({
            title: post.title as Localized,
            description: post.description as Localized,
            image: BrandLogoFtHat,
            like: post.likes,
            dislike: post.dislikes,
            views: post.views,
            date: post.createdAt
                ? new Date(post.createdAt).toISOString().split('T')[0]
                : '',
            referenceSource: post.referenceSource,
            slug: post.slug,
            market: post.market ? capitalizeWords(post.market) : '',
        }));
    };

    const newsData = mapPostsToNewsType();

    // Prepare current search params (excluding tab-related ones)
    const validSearchParams: Record<string, string> = {};
    Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            validSearchParams[key] = String(value);
        }
    });

    // --- Refactored Tabs Logic ---
    const currentType = Array.isArray(type) ? type[0] : type;
    const hasValidType = currentType === 'news' || currentType === 'events';

    // Filter Tabs - dynamically build href with or without type
    const filterTabs: TabServerSide[] = [
        {
            title: <T keyName={'common.recommended'} />,
            href: hasValidType
                ? `/news-event?type=${currentType}&filterBy=recommended`
                : '/news-event?filterBy=recommended',
        },
        {
            title: <T keyName={'common.hottest'} />,

            href: hasValidType
                ? `/news-event?type=${currentType}&filterBy=hottest`
                : '/news-event?filterBy=hottest',
        },
        {
            title: <T keyName={'common.mostViewed'} />,

            href: hasValidType
                ? `/news-event?type=${currentType}&filterBy=mostViewed`
                : '/news-event?filterBy=mostViewed',
        },
        {
            title: <T keyName={'common.topRated'} />,
            href: hasValidType
                ? `/news-event?type=${currentType}&filterBy=topRated`
                : '/news-event?filterBy=topRated',
        },
    ];

    return (
        <div>
            <NewsEventsBanner />
            <div className="mt-2">
                <NewsEventFilterDialogComp />

                {/* Filter Tabs */}
                <AppTabsServerSide
                    tabs={filterTabs}
                    currentSearchParams={new URLSearchParams(
                        validSearchParams
                    ).toString()}
                    isParentOfSubTab={false}
                />

                <NewsComp news={newsData} />

                {/* Pagination */}
                <div className="mt-8">
                    <Pagination
                        currentPage={postsData.pageIndex + 1}
                        totalPages={postsData.totalPages}
                        basePath="/news-event"
                        searchParams={validSearchParams}
                    />
                </div>

                {/* Stats */}
                <div className="mt-4 text-center text-sm text-[var(--brand-grey-foreground)]">
                    <p>
                        <T keyName={'common.total'} options="uppercase-first" />{' '}
                        {postsData.totalItems}{' '}
                        {postsData.totalItems <= 1 ? (
                            <T
                                keyName={'common.post'}
                                options="lowercase-full"
                            />
                        ) : (
                            <T
                                keyName={'common.posts'}
                                options="lowercase-full"
                            />
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
