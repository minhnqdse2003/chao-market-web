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

    // Handle type parameter
    const typeArray = (() => {
        if (type === undefined || type === null) return ['news', 'events'];
        if (Array.isArray(type)) return type;
        if (typeof type === 'string') return type ? [type] : ['news', 'events'];
        return ['news', 'events'];
    })();

    // Fetch posts
    const postsData: PaginatedResponse<Post> = await getPosts({
        type: typeArray as ('news' | 'events' | 'community')[],
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
            title: post.title,
            description: post.description,
            image: BrandLogoFtHat,
            like: post.likes,
            dislike: post.dislikes,
            views: post.views,
            date: post.createdAt
                ? new Date(post.createdAt).toISOString().split('T')[0]
                : '',
            referenceSource: post.referenceSource,
            slug: post.slug,
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

    // Type Tabs
    const typeTabs: TabServerSide[] = [
        {
            title: 'All',
            href: '/news-event',
        },
        {
            title: 'News',
            href: '/news-event?type=news',
        },
        {
            title: 'Events',
            href: '/news-event?type=events',
        },
    ];

    // Filter Tabs - dynamically build href with or without type
    const filterTabs: TabServerSide[] = [
        {
            title: 'Recommended',
            href: hasValidType
                ? `/news-event?type=${currentType}&filterBy=recommended`
                : '/news-event?filterBy=recommended',
        },
        {
            title: 'Hottest',
            href: hasValidType
                ? `/news-event?type=${currentType}&filterBy=hottest`
                : '/news-event?filterBy=hottest',
        },
        {
            title: 'Most Viewed',
            href: hasValidType
                ? `/news-event?type=${currentType}&filterBy=mostViewed`
                : '/news-event?filterBy=mostViewed',
        },
        {
            title: 'Top Rated',
            href: hasValidType
                ? `/news-event?type=${currentType}&filterBy=topRated`
                : '/news-event?filterBy=topRated',
        },
    ];

    return (
        <div>
            <NewsEventsBanner />
            <div className="mt-2">
                <NewsEventFilterDialogComp title={'Filter By'} />

                {/* Type Tabs */}
                <AppTabsServerSide
                    tabs={typeTabs}
                    currentSearchParams={new URLSearchParams(
                        validSearchParams
                    ).toString()}
                    isParentOfSubTab={true}
                />

                {/* Filter Tabs */}
                <AppTabsServerSide
                    tabs={filterTabs}
                    currentSearchParams={new URLSearchParams(
                        validSearchParams
                    ).toString()}
                    isSubTab={true}
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
                <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Total {postsData.totalItems} items</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
