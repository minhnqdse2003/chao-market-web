import Link from 'next/link';

export interface TabServerSide {
    title: string;
    href: string;
}

interface AppTabsServerSideProps {
    tabs: TabServerSide[];
    currentSearchParams: string;
}

export default function AppTabsServerSide({
    tabs,
    currentSearchParams,
}: AppTabsServerSideProps) {
    // Parse current search params
    const searchParams = new URLSearchParams(currentSearchParams);

    // Get current tab value from URL parameters
    const currentTabValue =
        searchParams.get('type') || searchParams.get('filterBy') || ''; // Empty string for default "All" tab

    // Find the current tab by matching the tab href with current parameters
    const getCurrentTabHref = () => {
        // For the "All" tab (no params), match tabs with no type/filterBy
        if (!currentTabValue) {
            const allTab = tabs.find(
                tab =>
                    !tab.href.includes('type=') &&
                    !tab.href.includes('filterBy=')
            );
            return allTab ? allTab.href : tabs[0]?.href;
        }

        // For tabs with params, find exact match
        const matchingTab = tabs.find(
            tab =>
                tab.href.includes(`type=${currentTabValue}`) ||
                tab.href.includes(`filterBy=${currentTabValue}`)
        );

        return matchingTab ? matchingTab.href : tabs[0]?.href;
    };

    const currentTabHref = getCurrentTabHref();

    return (
        <div className={'mb-8'}>
            <div className="border-b border-[var(--brand-grey)]">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map(tab => (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`${
                                currentTabHref === tab.href
                                    ? 'border-[var(--brand-color)] text-[var(--brand-color)]'
                                    : 'border-transparent text-[var(--brand-grey)] hover:text-[var(--brand-grey-foreground)] hover:border-[var(--brand-grey-foreground)]'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-center text-sm transition-all! duration-300 ease-in-out min-w-[9rem]`}
                        >
                            {tab.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
