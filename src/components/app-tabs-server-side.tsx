import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface TabServerSide {
    title: string;
    href: string;
}

interface AppTabsServerSideProps {
    tabs: TabServerSide[];
    currentSearchParams: string;
    isParentOfSubTab?: boolean;
    isSubTab?: boolean;
    currentHref?: string;
    subTabClassName?: string;
    size?: number;
}

export default function AppTabsServerSide({
    tabs,
    currentSearchParams,
    isParentOfSubTab = false,
    isSubTab = false,
    currentHref,
    subTabClassName = '',
    size = 0,
}: AppTabsServerSideProps) {
    // Parse current search params
    const searchParams = new URLSearchParams(currentSearchParams);

    // Get current tab values from URL parameters
    const currentType = searchParams.get('type') || '';
    const currentFilterBy = searchParams.get('filterBy') || '';
    const currentMainTag = searchParams.get('mainTag') || '';
    const currentTab = searchParams.get('tab') || '';

    // Find the current tab by matching the tab href with current parameters
    const getCurrentTabHref = () => {
        // Build current URL params string for comparison
        const currentParams = new URLSearchParams();
        if (currentType) currentParams.set('type', currentType);
        if (currentFilterBy) currentParams.set('filterBy', currentFilterBy);
        if (currentMainTag) currentParams.set('mainTag', currentMainTag);
        if (currentTab) currentParams.set('tab', currentTab);

        const currentParamString = currentParams.toString();

        // If no params, find the "All" tab (no type, filterBy, or mainTag)
        if (!currentParamString) {
            const allTab = tabs.find(
                tab =>
                    !tab.href.includes('type=') &&
                    !tab.href.includes('filterBy=') &&
                    !tab.href.includes('mainTag=') &&
                    !tab.href.includes('tab=')
            );
            return allTab ? allTab.href : tabs[0]?.href;
        }

        // Try to find exact match with current parameters
        const matchingTab = tabs.find(tab => {
            try {
                const tabUrl = new URL(tab.href, 'http://localhost');
                const tabParams = tabUrl.searchParams;

                // Compare the parameter strings directly
                const tabParamString = tabParams.toString();
                return tabParamString === currentParamString;
            } catch {
                return false;
            }
        });

        // If exact match found, return it
        if (matchingTab) {
            return matchingTab.href;
        }

        // Fallback logic - match based on priority
        if (currentMainTag) {
            const matchingTab = tabs.find(tab =>
                tab.href.includes(`mainTag=${currentMainTag}`)
            );
            return matchingTab ? matchingTab.href : tabs[0]?.href;
        } else if (currentType) {
            const matchingTab = tabs.find(tab =>
                tab.href.includes(`type=${currentType}`)
            );
            return matchingTab ? matchingTab.href : tabs[0]?.href;
        } else if (currentFilterBy) {
            const matchingTab = tabs.find(tab =>
                tab.href.includes(`filterBy=${currentFilterBy}`)
            );
            return matchingTab ? matchingTab.href : tabs[0]?.href;
        } else if (currentTab) {
            const matchingTab = tabs.find(tab =>
                tab.href.includes(`tab=${currentTab}`)
            );
            return matchingTab ? matchingTab.href : tabs[0]?.href;
        }

        return tabs[0]?.href;
    };

    const currentTabHref = currentHref ? currentHref : getCurrentTabHref();

    const dynamicFontSize = `calc(var(--text-sm) + ${size}px)`;

    return (
        <div className={isParentOfSubTab ? '' : cn('mb-8', subTabClassName)}>
            <div
                className={`${isSubTab ? '' : 'border-b border-[var(--brand-grey)]'}`}
            >
                <nav className="-mb-px flex space-x-8">
                    {tabs.map(tab => (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={cn(
                                `${
                                    currentTabHref === tab.href
                                        ? isSubTab
                                            ? 'border-none dark:text-[var(--brand-color)]' +
                                              ' dark:hover:text-[var(--brand-color)]' +
                                              ' text-black font-semibold'
                                            : 'dark:border-[var(--brand-color)] dark:text-[var(--brand-color)]' +
                                              ' dark:hover:text-[var(--brand-color)]' +
                                              ' dark:hover:border-[var(--brand-color)]' +
                                              ' border-black text-brand-text font-semibold'
                                        : isSubTab
                                          ? 'border-none text-[var(--brand-grey-foreground)]' +
                                            ' dark:hover:text-[var(--brand-color)] hover:text-brand-text'
                                          : 'dark:hover:border-[var(--brand-color)] dark:hover:text-[var(--brand-color)]' +
                                            ' text-[var(--brand-grey-foreground)] border-transparent' +
                                            ' hover:border-brand-text hover:text-brand-text'
                                } whitespace-nowrap py-4 px-1 border-b-2 text-center transition-all! font-bold duration-300 ease-in-out min-w-[9rem]`
                            )}
                            style={{ fontSize: dynamicFontSize }}
                        >
                            {tab.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
