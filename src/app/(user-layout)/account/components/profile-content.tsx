'use client';

import { AppTabs, TabItem } from '@/components/app-tabs';
import PersonalTab from '@/app/(user-layout)/account/components/personal-tab';
import NotificationsTab from '@/app/(user-layout)/account/components/notifications-tab';
import { useI18n } from '@/context/i18n/context';

interface PageProps {
    searchParams: {
        tab?: string;
    };
}

export default function ProfileContent({ searchParams }: PageProps) {
    const currentTab = searchParams.tab;
    const { t } = useI18n();

    const tabsList: TabItem[] = [
        {
            title: t('account.notification'),
            value: 'notifications',
            renderContent: () => Promise.resolve(<NotificationsTab />),
        },
        {
            title: t('account.profile'),
            value: 'personal',
            renderContent: () => Promise.resolve(<PersonalTab />),
        },
    ];

    return (
        <AppTabs tabsList={tabsList} defaultValue={currentTab || undefined} />
    );
}
