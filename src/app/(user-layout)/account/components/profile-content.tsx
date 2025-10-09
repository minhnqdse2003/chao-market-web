'use client';

import { AppTabs, TabItem } from '@/components/app-tabs';
import PersonalTab from '@/app/(user-layout)/account/components/personal-tab';
import NotificationsTab from '@/app/(user-layout)/account/components/notifications-tab';

interface PageProps {
    searchParams: {
        tab?: string;
    };
}

export default function ProfileContent({ searchParams }: PageProps) {
    const currentTab = searchParams.tab;

    const tabsList: TabItem[] = [
        {
            title: 'Personal',
            value: 'personal',
            renderContent: () => Promise.resolve(<PersonalTab />),
        },
        {
            title: 'Notifications',
            value: 'notifications',
            renderContent: () => Promise.resolve(<NotificationsTab />),
        },
    ];

    return (
        <AppTabs tabsList={tabsList} defaultValue={currentTab || undefined} />
    );
}
