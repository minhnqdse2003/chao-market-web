'use client';
import AppTabsServerSide, {
    TabServerSide,
} from '@/components/app-tabs-server-side';
import React from 'react';
import { useI18n } from '@/context/i18n/context';

export default function CommunityTabs({
    validSearchParams,
}: {
    validSearchParams: Record<string, string>;
}) {
    const { t } = useI18n();
    const mainTagTabs: TabServerSide[] = [
        {
            title: t('community.items.chaoConnect.title'),
            href: '/community?mainTag=chao-connect',
        },
        {
            title: t('community.items.freeCourses.title'),
            href: '/community?mainTag=free-courses',
        },
        {
            title: t('community.items.workShops.title'),
            href: '/community?mainTag=workshop',
        },
    ];
    return (
        <AppTabsServerSide
            tabs={mainTagTabs}
            currentSearchParams={new URLSearchParams(
                validSearchParams
            ).toString()}
            isParentOfSubTab={true}
        />
    );
}
