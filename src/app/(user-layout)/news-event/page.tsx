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
        type?: string;
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

    // Fetch posts with query parameters
    const postsData: PaginatedResponse<Post> = await getPosts({
        type: type as 'news' | 'events' | undefined,
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

        return postsData?.data.map(post => ({
            title: post.title,
            description: post.description,
            image: BrandLogoFtHat, // Placeholder image
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

    const tabs: TabServerSide[] = [
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
        {
            title: 'Recommended',
            href: '/news-event?filterBy=recommended',
        },
        {
            title: 'Hottest',
            href: '/news-event?filterBy=hottest',
        },
        {
            title: 'Most Viewed',
            href: '/news-event?filterBy=mostViewed',
        },
        {
            title: 'Top Rated',
            href: '/news-event?filterBy=topRated',
        },
    ];

    // Get current posts data
    const newsData = mapPostsToNewsType();

    const validSearchParams: Record<string, string> = {};
    Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            validSearchParams[key] = String(value);
        }
    });

    return (
        <div>
            <NewsEventsBanner />
            <div className="mt-12">
                <NewsEventFilterDialogComp />
                <AppTabsServerSide
                    tabs={tabs}
                    currentSearchParams={new URLSearchParams(
                        validSearchParams
                    ).toString()}
                />
                <NewsComp news={newsData} />

                {/* Pagination Section */}
                <div className="mt-8">
                    <Pagination
                        currentPage={postsData.pageIndex + 1}
                        totalPages={postsData.totalPages}
                        basePath="/news-event"
                        searchParams={validSearchParams}
                    />
                </div>

                {/* Stats Section */}
                <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Total {postsData.totalItems} items</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
