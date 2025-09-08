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
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function NavUser() {
    const { isMobile, open } = useSidebar();
    const { data: session, status } = useSession();
    const pathname = usePathname();

    // We don't need to handle loading state here anymore as it's handled at the AppSidebar level
    // This prevents duplicate loading states

    if (status === 'unauthenticated' && !isMobile && open) {
        const isLoginActive =
            pathname.startsWith('/auth/login') &&
            !pathname.startsWith('/auth/signup');
        const isSignupActive = pathname.startsWith('/auth/signup');

        const notMatchAllAuthPath = !isLoginActive && !isSignupActive;

        return (
            <SidebarMenu>
                <SidebarMenuItem className="flex gap-4">
                    <Button
                        asChild
                        variant="outline"
                        className={cn(
                            'flex-1/2 border-none' +
                                ' rounded-lg text-black font-bold transition-colors! duration-300 ease-in-out',
                            `${
                                isLoginActive || notMatchAllAuthPath
                                    ? 'dark:bg-[var(--brand-color)] bg-[var(--brand-color)]' +
                                      ' dark:hover:bg-[var(--brand-color)] hover:bg-[var(--brand-color)] dark:hover:text-black'
                                    : 'text-brand-text dark:hover:text-[var(--brand-color)] hover:bg-[var(--brand-grey)]'
                            }`
                        )}
                    >
                        <Link href="/auth/login">Log In</Link>
                    </Button>
                    <Separator orientation="vertical" className="flex-0.5" />
                    <Button
                        asChild
                        variant="outline"
                        className={cn(
                            'flex-1/2 border-none' +
                                ' rounded-lg text-black font-bold transition-colors! duration-300 ease-in-out',
                            `${
                                isSignupActive
                                    ? 'dark:bg-[var(--brand-color)] bg-[var(--brand-color)]' +
                                      ' dark:hover:bg-[var(--brand-color)] hover:bg-[var(--brand-color)] dark:hover:text-black'
                                    : 'text-brand-text hover:bg-[var(--brand-grey)]' +
                                      ' dark:hover:text-[var(--brand-color)]'
                            }`
                        )}
                    >
                        <Link href="/auth/signup">Sign Up</Link>
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
                                tooltip={<p>{user.name}</p>}
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
                                    <span className="truncate text-xs font-semibold text-black dark:text-[var(--brand-grey)]">
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
