'use client';
import { AppTabs, TabItem } from '@/components/app-tabs';
import React from 'react';
import { NewsType } from './utils/data-utils';
import NewsComp from './components/news';
import NewsEventFilterDialogComp from './components/news-filter';
import { useAppQuery } from '@/hooks/react-query/use-custom-query';
import { getPosts } from '@/app/api/posts';
import { Post } from '@/db/schema';
import { PaginatedResponse } from '@/types/pagination';
import { NewsEventsBanner } from '@/components/app-banner';
import LoadingComponent from '@/components/loading-spiner';

// Loading component for Suspense fallback

const Page = () => {
    const { data: postsData, isFetching } = useAppQuery<
        PaginatedResponse<Post>
    >({
        queryFn: getPosts,
        queryKey: ['posts'],
    });

    // Map posts data to NewsType format
    const mapPostsToNewsType = (): NewsType[] => {
        if (!postsData?.data) return [];

        return postsData?.data.map(post => ({
            title: post.title,
            description: post.description,
            image: 'https://i.pravatar.cc/150?img=9', // Placeholder image
            like: post.likes,
            dislike: post.dislikes,
            views: post.views,
            date: post.createdAt
                ? new Date(post.createdAt).toISOString().split('T')[0]
                : '',
            referenceSource: post.referenceSource,
        }));
    };

    const tabs: TabItem[] = [
        {
            title: 'All',
            value: 'all',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Recommended',
            value: 'recommended',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Hottest',
            value: 'hottest',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Most Viewed',
            value: 'mostViewed',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Top Rated',
            value: 'topRated',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
    ];

    const onApply = (value: unknown) => {
        console.log(value);
    };

    return (
        <div>
            <NewsEventsBanner />
            {isFetching ? (
                <LoadingComponent />
            ) : (
                <div className="mt-12">
                    <NewsEventFilterDialogComp
                        onApply={value => onApply(value)}
                    />
                    <AppTabs tabsList={tabs} />
                </div>
            )}
        </div>
    );
};

export default Page;
