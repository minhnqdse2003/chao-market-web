'use client';
import AppTabsServerSide, {
    TabServerSide,
} from '@/components/app-tabs-server-side';
import { useI18n } from '@/context/i18n/context';
import { validationSearchParams } from '@/utils/validation-search-params';

export default function ChaoInvestorNavigation({
    searchParams,
    subTabs,
    currentHref,
}: {
    searchParams: Record<string, string>;
    subTabs?: TabServerSide[];
    currentHref?: string;
}) {
    const validateSearchParams = validationSearchParams(searchParams);
    const { t } = useI18n();
    const mainTab: TabServerSide[] = [
        {
            title: t('investors.items.chaoAnnoucement.title'),
            href: '/chao-investors/announcements',
        },
        {
            title: t('investors.items.chaoSocial.title'),
            href: '/chao-investors/social',
        },
        {
            title: t('investors.items.toolForInvestor.title'),
            href: '/chao-investors/tools',
        },
    ];

    if (subTabs) {
        return (
            <AppTabsServerSide
                tabs={subTabs}
                currentSearchParams={new URLSearchParams(
                    validateSearchParams
                ).toString()}
                isSubTab={true}
                subTabClassName={'mb-2'}
            />
        );
    }

    return (
        <AppTabsServerSide
            tabs={mainTab}
            currentSearchParams={new URLSearchParams(
                validateSearchParams
            ).toString()}
            currentHref={currentHref}
            isParentOfSubTab={false}
        />
    );
}
