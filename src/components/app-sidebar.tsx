'use client';
import {
    ArrowRightFromLine,
    BriefcaseBusiness,
    ChevronDown,
    Home,
    IdCard,
    Languages,
    Megaphone,
    PhoneCallIcon,
    Search,
    Users,
} from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './theme-toggle';
import { Separator } from './ui/separator';
import { useSession } from 'next-auth/react';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/home',
        icon: Home,
    },
    {
        title: `Client's account`,
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
];

export function AppSidebar() {
    const { data: session } = useSession();
    const { open, toggleSidebar, isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon" className="relative">
            <SidebarContent>
                {/* Avatar & Search section */}
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Separator />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenuItem className="list-none">
                            <div
                                className={`relative max-w-sm ${open ? 'mb-6 w-full' : 'my-4 cursor-pointer w-fit mx-auto'}`}
                            >
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className={`pr-10 border-0 border-b-2 py-4 focus-visible:ring-0 rounded-none ${!open && 'hidden'}`}
                                />
                                <Search
                                    className={`text-muted-foreground h-4 w-4 ${open ? 'absolute right-3 top-1/2 transform -translate-y-1/2' : 'relative'}`}
                                />
                            </div>
                            {session?.user ? (
                                <div
                                    className={`w-full cursor-pointer transition-all ease-linear duration-200 flex items-center gap-2 rounded-xl ${open && 'bg-[var(--brand-color)] p-2'}`}
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        {session.user?.image && (
                                            <AvatarImage
                                                src={session.user.image}
                                            />
                                        )}
                                        <AvatarFallback className="rounded-full">
                                            {session.user?.name &&
                                                session.user.name[0]}
                                        </AvatarFallback>
                                        <AvatarImage />
                                    </Avatar>
                                    <span
                                        className={`truncate font-medium text-black w-0 absolute ${open && 'w-fit relative'}`}
                                    >
                                        {session.user?.name}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center h-full justify-center space-x-4 text-sm w-full">
                                    <a href="/auth/signin">Log in</a>
                                    <Separator orientation="vertical" />
                                    <a
                                        href="/auth/signup"
                                        className="bg-[var(--brand-color)] text-black px-4 py-1 rounded-lg font-bold"
                                    >
                                        Sign up
                                    </a>
                                </div>
                            )}
                        </SidebarMenuItem>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Pages navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Separator />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    {item.children ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                asChild
                                                className="cursor-pointer"
                                            >
                                                <SidebarMenuButton
                                                    size="lg"
                                                    className={cn(
                                                        'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-center items-center gap-0'
                                                    )}
                                                >
                                                    <item.icon />
                                                    <span
                                                        className={cn(
                                                            'overflow-hidden whitespace-nowrap transition-all duration-200 ease-linear',
                                                            open
                                                                ? 'max-w-[160px] opacity-100 ml-2'
                                                                : 'max-w-0 opacity-0'
                                                        )}
                                                    >
                                                        {item.title}
                                                    </span>
                                                    <ChevronDown
                                                        className={cn(
                                                            'ml-auto transition-all ease-linear duration-200',
                                                            open
                                                                ? 'opacity-100'
                                                                : 'opacity-0 absolute'
                                                        )}
                                                    />
                                                </SidebarMenuButton>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                                side={
                                                    isMobile
                                                        ? 'bottom'
                                                        : 'right'
                                                }
                                                align="center"
                                                sideOffset={12}
                                            >
                                                <DropdownMenuGroup>
                                                    {item.children.map(
                                                        child => (
                                                            <DropdownMenuItem
                                                                key={
                                                                    child.title
                                                                }
                                                                asChild
                                                            >
                                                                <a
                                                                    href={
                                                                        child.url
                                                                    }
                                                                >
                                                                    {
                                                                        child.title
                                                                    }
                                                                </a>
                                                            </DropdownMenuItem>
                                                        )
                                                    )}
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mb-8">
                <SidebarGroupLabel>
                    <Separator />
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/contact">
                                    <PhoneCallIcon />
                                    <span>Contact</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/languages">
                                    <Languages />
                                    <span>Languages</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <ThemeToggle />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>
            <Button
                className={`absolute bg-gray-400 hover:bg-gray-500 cursor-pointer text-white -right-6 top-1/2 transition-transform duration-300 ease-in-out`}
                onClick={toggleSidebar}
            >
                <ArrowRightFromLine className="size-3" />
            </Button>
        </Sidebar>
    );
}
