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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { status } = useSession();
    const isLoading = status === 'loading';
    const { t } = useI18n();

    const data = {
        headers: [
            {
                name: 'Chào Market',
                logo: GalleryVerticalEnd,
                plan: 'Manage Your Risk',
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
            },
            {
                title: t('sidebar.clientsAccounts'),
                url: '/client-account',
                icon: IdCard,
            },
            {
                title: t('ourSolutions.common.title'),
                url: '/our-solutions',
                icon: BriefcaseBusiness,
                children: [
                    {
                        title: t('ourSolutions.financialFoundation.title'),
                        url: '/our-solutions#1',
                    },
                    {
                        title: t('ourSolutions.portfolioStrategy.title'),
                        url: '/our-solutions#2',
                    },
                    {
                        title: t('ourSolutions.algoTrading.title'),
                        url: '/our-solutions#3',
                    },
                    {
                        title: t('ourSolutions.tradingPerformance.title'),
                        url: '/our-solutions#4',
                    },
                    {
                        title: t('ourSolutions.financialCourse.title'),
                        url: '/our-solutions#5',
                    },
                ],
            },
            {
                title: t('sidebar.newsEvents'),
                url: '/news-event',
                icon: Megaphone,
                children: [
                    { title: t('sidebar.news'), url: '/news-event?type=news' },
                    {
                        title: t('sidebar.events'),
                        url: '/news-event?type=events',
                    },
                ],
            },
            {
                title: t('sidebar.community'),
                url: '/community',
                icon: Users,
                children: [
                    {
                        title: t('sidebar.marketInsights'),
                        url: '/community?mainTag=market-insights',
                    },
                    {
                        title: t('sidebar.freeCourses'),
                        url: '/community?mainTag=free-courses',
                    },
                    {
                        title: t('sidebar.conferences'),
                        url: '/community?mainTag=conferences',
                    },
                    {
                        title: t('sidebar.videos'),
                        url: '/community?mainTag=videos',
                    },
                    {
                        title: t('sidebar.images'),
                        url: '/community?mainTag=images',
                    },
                ],
            },
        ],
    };

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
                                ' mb-4'
                            }
                        >
                            <ConsultationButton />
                        </SidebarMenuButton>
                        <NavUser />
                    </SidebarHeader>
                    <NavSeparator />
                    <SidebarContent>
                        <NavMain items={data.items} />
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
                                        Disclaimer
                                    </p>
                                }
                            >
                                <Info className={'h-4 w-4'} />
                                <span>Disclaimer</span>
                            </SidebarMenuButton>
                        }
                    />
                </>
            )}
        </Sidebar>
    );
}
