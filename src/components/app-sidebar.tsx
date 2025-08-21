'use client';

import * as React from 'react';
import {
    BriefcaseBusiness,
    Home,
    IdCard,
    Megaphone,
    Users,
    GalleryVerticalEnd,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';
import { NavHead } from '@/components/team-switcher';
import { NavMain } from './nav-main';
import { SearchForm } from './search-form';
import NavSeparator from './nav-separator';
import NavInformation from './nav-information';
import FunnelPopover from '@/components/envelop-banner';
import SimpleCartButton from '@/components/nav-user-cart';

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
            title: 'Home',
            url: '/home',
            icon: Home,
        },
        {
            title: "Client's Accounts",
            url: '/client-account',
            icon: IdCard,
        },
        {
            title: 'Products',
            url: '/products',
            icon: BriefcaseBusiness,
            children: [
                { title: 'Consulting Personal Finance', url: '/products#1' },
                { title: 'Managing Investment Portfolio', url: '/products#2' },
                { title: 'Building Trading System', url: '/products#3' },
                { title: 'Analysing Trading Account', url: '/products#4' },
                { title: 'Financial Investment Course', url: '/products#5' },
            ],
        },
        {
            title: 'News & Events',
            url: '/news-event',
            icon: Megaphone,
            children: [
                { title: 'News', url: '/news-event?type=news' },
                { title: 'Events', url: '/news-event?type=events' },
            ],
        },
        {
            title: 'Community',
            url: '/community',
            icon: Users,
            children: [
                {
                    title: 'Our Market Insights',
                    url: '/community?mainTag=market-insights',
                },
                {
                    title: 'Free Courses',
                    url: '/community?mainTag=free-courses',
                },
                { title: 'Conferences', url: '/community?mainTag=conferences' },
                { title: 'Videos', url: '/community?mainTag=videos' },
                { title: 'Images', url: '/community?mainTag=images' },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { status } = useSession();
    const isLoading = status === 'loading';

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
            className={'border-[var(--brand-grey)]'}
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
                        <SimpleCartButton />
                        <NavUser />
                    </SidebarHeader>
                    <NavSeparator />
                    <SidebarContent>
                        <NavMain items={data.items} />
                    </SidebarContent>
                    <NavSeparator isTrigger={false} className="my-2" />
                    <NavInformation />
                    <FunnelPopover />
                </>
            )}
        </Sidebar>
    );
}
