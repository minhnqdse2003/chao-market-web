'use client';
import { AppTabs, TabItem } from '@/components/app-tabs';
import PersonalTab from '@/app/(user-layout)/account/components/personal-tab';
import NotificationsTab from '@/app/(user-layout)/account/components/notifications-tab';
import { T } from '@/components/app-translate';
import { UserViewResponse } from '@/types/user/response/view-response';

interface PageProps {
    searchParams: {
        tab?: string;
    };
    userData: UserViewResponse | null;
}

export default function ProfileContent({ searchParams, userData }: PageProps) {
    const currentTab = searchParams.tab;

    const tabsList: TabItem[] = [
        {
            title: <T keyName={'account.notification'} />,
            value: 'notifications',
            renderContent: async () => Promise.resolve(<NotificationsTab />),
        },
        {
            title: <T keyName={'account.profile'} />,
            value: 'personal',
            renderContent: async () =>
                Promise.resolve(<PersonalTab userData={userData} />),
        },
    ];

    return (
        <AppTabs tabsList={tabsList} defaultValue={currentTab || undefined} />
    );
}
