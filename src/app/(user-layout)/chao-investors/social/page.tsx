'use client';
import { AppTabs, TabItem } from '@/components/app-tabs';
import CombinedNewsFeed from '@/app/(user-layout)/market-data/markets/components/vietnam-stock-market-news';

export default function SocialPage() {
    const tabsList: TabItem[] = [
        {
            title: 'Facebook',
            value: 'facebook',
            renderContent: () =>
                Promise.resolve(
                    <CombinedNewsFeed type={'facebook-chao-market-page'} />
                ),
        },
        {
            title: 'Tiktok',
            value: 'tiktok',
            renderContent: () =>
                Promise.resolve(
                    <CombinedNewsFeed type={'tiktok-chao-market-page'} />
                ),
        },
        {
            title: 'Threads',
            value: 'threads',
            renderContent: () =>
                Promise.resolve(
                    <CombinedNewsFeed type={'thread-chao-market-page'} />
                ),
        },
        {
            title: 'Youtube',
            value: 'youtube',
            renderContent: () =>
                Promise.resolve(
                    <CombinedNewsFeed type={'youtube-chao-market-page'} />
                ),
        },
    ];

    return (
        <div>
            <AppTabs tabsList={tabsList} />
        </div>
    );
}
