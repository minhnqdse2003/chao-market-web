'use client';

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function NavUser() {
    const { isMobile, open } = useSidebar();
    const { data: session, status } = useSession();

    // We don't need to handle loading state here anymore as it's handled at the AppSidebar level
    // This prevents duplicate loading states

    if (status === 'unauthenticated' && !isMobile && open) {
        return (
            <SidebarMenu>
                <SidebarMenuItem className="flex gap-4">
                    <Button
                        asChild
                        className="flex-1/2 bg-[var(--brand-color)] hover:bg-[var(--brand-color-foreground)] rounded-lg text-black font-bold transition-colors! duration-300 ease-in-out"
                    >
                        <Link href="/auth/login">Log in</Link>
                    </Button>
                    <Separator orientation="vertical" className="flex-0.5" />
                    <Button
                        asChild
                        variant="outline"
                        className="flex-1/2 border-none rounded-lg hover:text-[var(--brand-color)] transition-colors! duration-300 ease-in-out"
                    >
                        <Link href="/auth/signup">Sign up</Link>
                    </Button>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    const user = {
        avatar: session?.user?.image || '',
        name: session?.user?.name || 'User',
        email: session?.user?.email || 'user@example.com',
    };

    return (
        status === 'authenticated' && (
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className={`data-[state=open]:text-sidebar-accent-foreground dark:text-black ${open ? 'dark:bg-[var(--brand-color)]' : ''}`}
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="rounded-lg bg-black font-semibold text-[var(--brand-color)]">
                                        {user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs font-semibold text-[var(--brand-grey)]">
                                        {user.email}
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 bg-brand-dialog rounded-lg"
                            side={isMobile ? 'bottom' : 'right'}
                            align="start"
                            sideOffset={12}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg text-[var(--brand-color)]">
                                            {user.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate text-[var(--brand-color)] font-bold">
                                            {user.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className={
                                        'hover:text-[var(--brand-color)]! hover:[&>svg]:stroke-[var(--brand-color)]' +
                                        ' dark:hover:bg-transparent transition-all! duration-200 ease-in-out cursor-pointer'
                                    }
                                >
                                    <Sparkles />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className={
                                        'hover:text-[var(--brand-color)]! hover:[&>svg]:stroke-[var(--brand-color)]' +
                                        ' dark:hover:bg-transparent transition-all! duration-200 ease-in-out cursor-pointer'
                                    }
                                >
                                    <BadgeCheck />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={
                                        'hover:text-[var(--brand-color)]! hover:[&>svg]:stroke-[var(--brand-color)]' +
                                        ' dark:hover:bg-transparent transition-all! duration-200 ease-in-out cursor-pointer'
                                    }
                                >
                                    <CreditCard />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={
                                        'hover:text-[var(--brand-color)]! hover:[&>svg]:stroke-[var(--brand-color)]' +
                                        ' dark:hover:bg-transparent transition-all! duration-200 ease-in-out cursor-pointer'
                                    }
                                >
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className={
                                    'hover:text-[var(--brand-color)]! hover:[&>svg]:stroke-[var(--brand-color)]' +
                                    ' dark:hover:bg-transparent transition-all! duration-200 ease-in-out cursor-pointer'
                                }
                            >
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    );
}
