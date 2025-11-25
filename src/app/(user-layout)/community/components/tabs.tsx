import AppTabsServerSide, {
    TabServerSide,
} from '@/components/app-tabs-server-side';
import React from 'react';
import { Tag } from '@/db/schema';
import { processTagDisplay } from '@/utils/process-tag-name';

export default function CommunityTabs({
    validSearchParams,
    tags,
}: {
    validSearchParams: Record<string, string>;
    tags: Tag[];
}) {
    const mainTagTabs: TabServerSide[] = tags.map(item => ({
        title: item.name,
        href: `/community?mainTag=${processTagDisplay(item.name)}`,
    }));

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
