'use client';

import { Bell, ChevronsUpDown, LogOut, User } from 'lucide-react';
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
import { useI18n } from '@/context/i18n/context';
import { T } from './app-translate';

export function NavUser() {
    const { isMobile, open } = useSidebar();
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const { t } = useI18n();

    // We don't need to handle loading state here anymore as it's handled at the AppSidebar level
    // This prevents duplicate loading states

    if (status === 'unauthenticated' && !isMobile && open) {
        const isLoginActive =
            pathname.startsWith('/auth/login') &&
            !pathname.startsWith('/auth/sign-up');
        const isSignupActive = pathname.startsWith('/auth/sign-up');

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
                        <Link href="/auth/login">{t('auth.login')}</Link>
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
                        <Link href="/auth/sign-up">{t('auth.signup')}</Link>
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
                                tooltip={
                                    <p className={'font-semibold'}>
                                        {user.name}
                                    </p>
                                }
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="rounded-lg bg-black font-semibold dark:text-[var(--brand-color)] text-white">
                                        {user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs font-medium text-black dark:text-[var(--brand-grey)]">
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
                                        <AvatarFallback className="rounded-lg dark:text-[var(--brand-color)] text-brand-text">
                                            {user.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate text-brand-text dark:text-[var(--brand-color)] font-semibold">
                                            {user.name}
                                        </span>
                                        <span className="truncate font-normal text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className={
                                        'dark:hover:text-[var(--brand-color)]! dark:hover:[&>svg]:stroke-[var(--brand-color)]' +
                                        ' dark:hover:bg-transparent transition-colors! duration-200 ease-in-out' +
                                        ' cursor-pointer hover:font-semibold'
                                    }
                                    asChild
                                >
                                    <Link href={'/account?tab=notifications'}>
                                        <Bell />
                                        <T keyName={'account.notification'} />
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={
                                        'dark:hover:text-[var(--brand-color)]! dark:hover:[&>svg]:stroke-[var(--brand-color)]' +
                                        ' dark:hover:bg-transparent transition-colors! duration-200 ease-in-out cursor-pointer hover:font-semibold'
                                    }
                                    asChild
                                >
                                    <Link href={'/account?tab=personal'}>
                                        <User />
                                        <T keyName={'account.title'} />
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className={
                                    'dark:hover:text-[var(--brand-color)]!' +
                                    ' dark:hover:[&>svg]:stroke-[var(--brand-color)]' +
                                    ' dark:hover:bg-transparent transition-colors! hover:font-semibold duration-200' +
                                    ' ease-in-out' +
                                    ' cursor-pointer'
                                }
                            >
                                <LogOut />
                                <T keyName={'common.logOut'} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    );
}
