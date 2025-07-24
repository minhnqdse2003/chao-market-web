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

const data = {
    headers: [
        {
            name: 'Chào Market',
            logo: GalleryVerticalEnd,
            plan: 'Mange Market Risk',
        },
    ],
    items: [
        {
            title: 'Home',
            url: '/home',
            icon: Home,
        },
        {
            title: "Client's account",
            url: '/client-account',
            icon: IdCard,
        },
        {
            title: 'Products',
            url: '/products',
            icon: BriefcaseBusiness,
            children: [
                { title: 'Consulting Personal Finance', url: '/products' },
                { title: 'Managing Investment Portfolio', url: '/products' },
                { title: 'Building Trading System', url: '/products' },
                { title: 'Analysing Trading Account', url: '/products' },
                { title: 'Financial Investment Course', url: '/products' },
            ],
        },
        {
            title: 'News & Events',
            url: '/news-event',
            icon: Megaphone,
            children: [
                { title: 'News', url: '/news-event' },
                { title: 'Events', url: '/news-event' },
            ],
        },
        {
            title: 'Community',
            url: '#',
            icon: Users,
            children: [
                { title: 'Our Market Insights', url: '#' },
                { title: 'Free Courses', url: '#' },
                { title: 'Conferences', url: '#' },
                { title: 'Videos', url: '#' },
                { title: 'Images', url: '#' },
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
        <Sidebar collapsible="icon" {...props}>
            {isLoading ? (
                renderLoadingSkeletons()
            ) : (
                <>
                    <SidebarHeader>
                        <NavHead headers={data.headers} />
                        <SearchForm />
                    </SidebarHeader>
                    <NavSeparator />
                    <SidebarContent>
                        <NavMain items={data.items} />
                    </SidebarContent>
                    <NavSeparator isTrigger={false} className="my-2" />
                    <NavInformation />
                    <SidebarFooter>
                        <NavUser />
                    </SidebarFooter>
                    <SidebarRail />
                </>
            )}
        </Sidebar>
    );
}
