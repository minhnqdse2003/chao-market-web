'use client';

import * as React from 'react';
import {
    Home,
    IdCard,
    Megaphone,
    Users,
    GalleryVerticalEnd,
    Info,
    BriefcaseBusiness,
    BarChart,
    Wrench,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useI18n } from '@/context/i18n/context';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenuSkeleton,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';
import { NavHead } from '@/components/team-switcher';
import { NavMain } from './nav-main';
import { SearchForm } from './search-form';
import NavSeparator from './nav-separator';
import NavInformation from './nav-information';
import ConsultationButton from '@/components/nav-user-request-consultation-button';
import DisclaimerDialog from '@/components/disclaimer-dialog';
import { usePathname } from 'next/navigation';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { status } = useSession();
    const pathName = usePathname();
    const isLoading = status === 'loading';
    const { t } = useI18n();

    const data = {
        headers: [
            {
                name: 'Chào Market',
                logo: GalleryVerticalEnd,
                plan: t('sidebar.brandGoal'),
            },
        ],
        items: [
            {
                title: t('sidebar.home'),
                url: '/home',
                icon: Home,
            },
            {
                title: t('sidebar.marketData'),
                url: '/market-data',
                icon: BarChart,
                children: [
                    {
                        title: t('marketData.marketData.items.indices.title'),
                        url: '/market-data/indices',
                    },
                    {
                        title: t('marketData.marketData.items.markets.title'),
                        url: '/market-data/markets',
                    },
                    {
                        title: t(
                            'marketData.marketData.items.financialNews.title'
                        ),
                        url: '/market-data/financial-news',
                    },
                    {
                        title: t(
                            'marketData.marketData.items.economicCalendar.title'
                        ),
                        url: '/market-data/economic-calendar',
                    },
                ],
            },
            {
                title: t('investors.title'),
                url: '/chao-investors',
                icon: Wrench,
                children: [
                    {
                        title: t('investors.items.chaoAnnoucement.title'),
                        url: '/chao-investors/announcements',
                    },
                    {
                        title: t('investors.items.chaoSocial.title'),
                        url: '/chao-investors/social',
                    },
                    {
                        title: t('investors.items.toolForInvestor.title'),
                        url: '/chao-investors/tools',
                    },
                ],
            },
            {
                title: t('ourSolutions.common.title'),
                url: '/chao-solutions',
                icon: BriefcaseBusiness,
                children: [
                    {
                        title: t('ourSolutions.financialFoundation.title'),
                        url: '/chao-solutions#financial-foundation-mentoring',
                    },
                    {
                        title: t('ourSolutions.portfolioStrategy.title'),
                        url: '/chao-solutions#portfolio-strategy-tools',
                    },
                    {
                        title: t('ourSolutions.algoTrading.title'),
                        url: '/chao-solutions#algorithmic-trading-solutions',
                    },
                    {
                        title: t('ourSolutions.tradingPerformance.title'),
                        url: '/chao-solutions#trading-performance-mentoring',
                    },
                    {
                        title: t('ourSolutions.financialCourse.title'),
                        url: '/chao-solutions#financial-investment-courses',
                    },
                ],
            },
            {
                title: t('sidebar.newsEvents'),
                url: '/chao-insights',
                icon: Megaphone,
                // children: [
                //     { title: t('sidebar.news'), url: '/chao-insights?type=news' },
                //     {
                //         title: t('sidebar.events'),
                //         url: '/chao-insights?type=events',
                //     },
                // ],
            },
            {
                title: t('sidebar.community'),
                url: '/community',
                icon: Users,
                children: [
                    {
                        title: t('community.items.chaoConnect.title'),
                        url: '/community?mainTag=chao-connect',
                    },
                    {
                        title: t('community.items.freeCourses.title'),
                        url: '/community?mainTag=free-courses',
                    },
                    {
                        title: t('community.items.workShops.title'),
                        url: '/community?mainTag=workshop',
                    },
                ],
            },
        ],
    };

    const memberOnlyRoute = [
        {
            title: t('sidebar.performanceStatistics'),
            url: '/performance-statistics',
            icon: IdCard,
        },
    ];

    // Create loading skeletons for the sidebar content
    const renderLoadingSkeletons = () => {
        return (
            <>
                <SidebarHeader>
                    {/* Header skeleton */}
                    <SidebarMenuSkeleton
                        showIcon={true}
                        className="h-10 mb-2 [&>[data-sidebar=menu-skeleton-text]]:group-data-[collapsible=icon]:hidden"
                    />
                    <SidebarMenuSkeleton className="h-8 group-data-[collapsible=icon]:hidden" />
                </SidebarHeader>
                <NavSeparator />
                <SidebarContent>
                    {/* Main navigation skeletons */}
                    <div className="p-2 space-y-2">
                        {Array(5)
                            .fill(0)
                            .map((_, i) => (
                                <SidebarMenuSkeleton
                                    key={i}
                                    showIcon={true}
                                    className="[&>[data-sidebar=menu-skeleton-text]]:group-data-[collapsible=icon]:hidden"
                                />
                            ))}
                    </div>
                </SidebarContent>
                <NavSeparator isTrigger={false} className="my-2" />
                {/* Information section skeletons */}
                <div className="p-2 space-y-2">
                    {Array(3)
                        .fill(0)
                        .map((_, i) => (
                            <SidebarMenuSkeleton
                                key={i}
                                showIcon={true}
                                className="[&>[data-sidebar=menu-skeleton-text]]:group-data-[collapsible=icon]:hidden"
                            />
                        ))}
                </div>
                <SidebarFooter>
                    {/* User section skeleton */}
                    <div className="p-2">
                        <SidebarMenuSkeleton
                            showIcon={true}
                            className="h-12 [&>[data-sidebar=menu-skeleton-text]]:group-data-[collapsible=icon]:hidden"
                        />
                    </div>
                </SidebarFooter>
                <SidebarRail />
            </>
        );
    };

    return (
        <Sidebar
            className={
                'border-border dark:border-[var(--brand-grey)] shadow-xl'
            }
            collapsible="icon"
            {...props}
        >
            {isLoading ? (
                renderLoadingSkeletons()
            ) : (
                <>
                    <SidebarHeader>
                        <NavHead headers={data.headers} />
                        <SearchForm />
                        <SidebarMenuButton
                            tooltip={
                                <p className={'font-semibold'}>
                                    Book a Consultation
                                </p>
                            }
                            className={
                                'dark:bg-transparent dark:text-[var(--brand-color)] dark:hover:text-black hover:text-black' +
                                ' dark:hover:bg-[var(--brand-color)] hover:bg-[var(--brand-color)] transition-all! duration-300 ease-in-out border' +
                                ' border-brand-text dark:border-[var(--brand-color)]' +
                                ' hover:border-[var(--brand-color)]' +
                                ' mb-4' +
                                `${
                                    pathName === '/book-a-consultation'
                                        ? ' dark:bg-[var(--brand-color)] bg-[var(--brand-color)] border-[var(--brand-color)]' +
                                          ' dark:text-black text-black'
                                        : ''
                                }`
                            }
                        >
                            <ConsultationButton />
                        </SidebarMenuButton>
                        <NavUser />
                    </SidebarHeader>
                    <NavSeparator />
                    <SidebarContent>
                        <NavMain
                            items={data.items}
                            memberOnlyRoute={memberOnlyRoute}
                        />
                    </SidebarContent>
                    <NavSeparator isTrigger={false} className="my-2" />
                    <NavInformation />
                    <DisclaimerDialog
                        trigger={
                            <SidebarMenuButton
                                className={
                                    'dark:hover:bg-transparent p-0 w-fit mx-auto h-5'
                                }
                                tooltip={
                                    <p className={'font-semibold'}>
                                        {t('disclaimer.title')}
                                    </p>
                                }
                            >
                                <Info className={'h-4 w-4'} />
                                <span>
                                    {t('disclaimer.triggerDialogContent')}
                                </span>
                            </SidebarMenuButton>
                        }
                    />
                </>
            )}
        </Sidebar>
    );
}
