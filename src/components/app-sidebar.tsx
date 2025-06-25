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

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
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
            url: '#',
            icon: IdCard,
        },
        {
            title: 'Products',
            url: '#',
            icon: BriefcaseBusiness,
            children: [
                { title: 'Consulting Personal Finance', url: '#' },
                { title: 'Managing Investment Portfolio', url: '#' },
                { title: 'Building Trading System', url: '#' },
                { title: 'Analysing Trading Account', url: '#' },
                { title: 'Financial Investment Course', url: '#' },
            ],
        },
        {
            title: 'News & Events',
            url: '#',
            icon: Megaphone,
            children: [
                { title: 'News', url: '#' },
                { title: 'Events', url: '#' },
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
    return (
        <Sidebar collapsible="icon" {...props}>
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
        </Sidebar>
    );
}
