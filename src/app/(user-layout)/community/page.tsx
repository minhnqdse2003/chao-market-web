import CommunityTabs from '@/app/(user-layout)/community/components/tabs';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;
export const fetchCache = 'force-cache';

import React from 'react';
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
import NewsEventFilterDialogComp from '@/app/(user-layout)/news-event/components/news-filter';
import { NewsType } from '@/app/(user-layout)/news-event/utils/data-utils';
import { buildURLSearchParams } from '@/utils/api/query-params-build';
import { Localized } from '@/types/localized';
import { capitalizeWords } from '@/utils/string-parsing';
import { getTags } from '@/services/tag/get-tags';

interface PageProps {
    searchParams: {
        mainTag?: string;
        filterBy?: string;
        pageIndex?: string;
        pageSize?: string;
    };
}

const CommunityPage = async ({ searchParams }: PageProps) => {
    const { mainTag, filterBy, pageIndex, pageSize } = searchParams;

    // Convert string parameters to numbers with defaults
    const pageNum = pageIndex ? parseInt(pageIndex, 10) : 0;
    const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 10;

    const tagsData = await getTags('community_type');

    // Fetch posts filtered by tag
    const postsData: PaginatedResponse<Post> = await getPosts({
        mainTag: mainTag ?? tagsData.data?.[0]?.name,
        filterBy:
            (filterBy as
                | 'recommended'
                | 'hottest'
                | 'mostViewed'
                | 'topRated'
                | undefined) || 'recommended',
        pageIndex: pageNum,
        pageSize: pageSizeNum,
        type: ['community'],
    });

    // Fetch Community Tags

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

    // Filter Tabs - dynamically build href with or without mainTag
    const hasMainTag = !!mainTag;
    const filterTabs: TabServerSide[] = [
        {
            title: 'Recommended',
            href: hasMainTag
                ? `/community?${buildURLSearchParams({ mainTag })}&filterBy=recommended`
                : '/community?filterBy=recommended',
        },
        {
            title: 'Hottest',
            href: hasMainTag
                ? `/community?${buildURLSearchParams({ mainTag })}&filterBy=hottest`
                : '/community?filterBy=hottest',
        },
        {
            title: 'Most Viewed',
            href: hasMainTag
                ? `/community?${buildURLSearchParams({ mainTag })}&filterBy=mostViewed`
                : '/community?filterBy=mostViewed',
        },
        {
            title: 'Top Rated',
            href: hasMainTag
                ? `/community?${buildURLSearchParams({ mainTag })}&filterBy=topRated`
                : '/community?filterBy=topRated',
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
            <div className="mt-2">
                <NewsEventFilterDialogComp title={'Filter by'} />

                {/* Main Tag Tabs */}
                <CommunityTabs
                    validSearchParams={validSearchParams}
                    tags={tagsData.data ?? []}
                />
                {/* Filter Tabs */}
                <AppTabsServerSide
                    tabs={filterTabs}
                    currentSearchParams={new URLSearchParams(
                        validSearchParams
                    ).toString()}
                    isSubTab={true}
                    currentHref={`/community?${buildURLSearchParams(searchParams)}`}
                />

                <NewsComp news={newsData} baseHref={'/community'} />

                {/* Pagination Section */}
                <div className="mt-8">
                    <Pagination
                        currentPage={postsData.pageIndex + 1}
                        totalPages={postsData.totalPages}
                        basePath="/community"
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

export default CommunityPage;
