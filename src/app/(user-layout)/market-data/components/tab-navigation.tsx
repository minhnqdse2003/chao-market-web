'use client';
import AppTabsServerSide, {
    TabServerSide,
} from '@/components/app-tabs-server-side';
import { validationSearchParams } from '@/utils/validation-search-params';
import { useI18n } from '@/context/i18n/context';

export default function TabNavigation({
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
            title: t('marketData.marketData.items.indices.title'),
            href: '/market-data/indices',
        },
        {
            title: t('marketData.marketData.items.markets.title'),
            href: '/market-data/markets',
        },
        {
            title: t('marketData.marketData.items.financialNews.title'),
            href: '/market-data/news',
        },
        {
            title: t('marketData.marketData.items.economicCalendar.title'),
            href: '/market-data/economic-calendar',
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
                size={2}
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
            isParentOfSubTab={true}
            size={4}
        />
    );
}
