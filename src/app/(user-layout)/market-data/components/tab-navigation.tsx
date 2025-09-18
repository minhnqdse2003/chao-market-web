import AppTabsServerSide, {
    TabServerSide,
} from '@/components/app-tabs-server-side';
import { MAIN_TABS } from '@/app/(user-layout)/market-data/constants/tab';
import { validationSearchParams } from '@/utils/validation-search-params';

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

    if (subTabs) {
        return (
            <AppTabsServerSide
                tabs={subTabs}
                currentSearchParams={new URLSearchParams(
                    validateSearchParams
                ).toString()}
                isSubTab={true}
            />
        );
    }

    return (
        <AppTabsServerSide
            tabs={MAIN_TABS}
            currentSearchParams={new URLSearchParams(
                validateSearchParams
            ).toString()}
            currentHref={currentHref}
            isParentOfSubTab={true}
        />
    );
}
