'use client';
import React from 'react';
import { Globe, PhoneCall } from 'lucide-react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from '@/components/ui/sidebar';
import ThemeToggle from './theme-toggle';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/context/i18n/context';
import Image from 'next/image';
import { ENLocale, VILocale } from '../../public/languages';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher = () => {
    const { locale, setLocale } = useI18n();
    const { open } = useSidebar();

    if (!open) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        className="dark:bg-transparent border-none dark:hover:text-[var(--brand-color)] transition-colors! duration-300 ease-in-out"
                        tooltip={<p className={'font-semibold'}>Languages</p>}
                    >
                        <Globe className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <Globe className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <span className="sr-only">Toggle Language</span>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    side="right"
                    sideOffset={10}
                    className={'dark:bg-brand-dialog'}
                >
                    <DropdownMenuItem
                        onClick={() => setLocale('vi')}
                        className={
                            'dark:hover:text-[var(--brand-color)]!' +
                            ' dark:[&:hover>svg]:text-[var(--brand-color)]! hover:bg-transparent! transition-all!' +
                            ' duration-200 ease-in-out cursor-pointer'
                        }
                    >
                        <Image
                            src={VILocale}
                            alt={`locale-flag-en`}
                            width={1920}
                            height={1080}
                            className={'size-4 object-contain'}
                        />{' '}
                        VI
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setLocale('en')}
                        className={
                            'dark:hover:text-[var(--brand-color)]!' +
                            ' dark:[&:hover>svg]:text-[var(--brand-color)]! hover:bg-transparent! transition-all!' +
                            ' duration-200 ease-in-out cursor-pointer'
                        }
                    >
                        <Image
                            src={ENLocale}
                            alt={`locale-flag-en`}
                            width={1920}
                            height={1080}
                            className={'size-4 object-contain'}
                        />{' '}
                        EN
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Tabs
            defaultValue={locale}
            onValueChange={value => setLocale(value)}
            className="w-full"
        >
            <TabsList className="flex gap-2 bg-transparent">
                <TabsTrigger
                    value="vi"
                    className="text-white bg-[oklch(0.708 0 0)] dark:data-[state=active]:text-[var(--brand-color)] data-[state=active]:border-[var(--brand-grey-foreground)] text-brand-text data-[state=active]:bg-[var(--brand-grey)] dark:data-[state=inactive]:hover:text-[var(--brand-color)] cursor-pointer"
                >
                    <Image
                        src={VILocale}
                        alt={`locale-flag-en`}
                        width={1920}
                        height={1080}
                        className={'size-4 object-contain'}
                    />{' '}
                    VI
                </TabsTrigger>
                <TabsTrigger
                    value="en"
                    className="text-white bg-[oklch(0.708 0 0)] dark:data-[state=active]:text-[var(--brand-color)] data-[state=active]:border-[var(--brand-grey-foreground)] text-brand-text data-[state=active]:bg-[var(--brand-grey)] dark:data-[state=inactive]:hover:text-[var(--brand-color)] cursor-pointer"
                >
                    <Image
                        src={ENLocale}
                        alt={`locale-flag-en`}
                        width={1920}
                        height={1080}
                        className={'size-4 object-contain'}
                    />{' '}
                    EN
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

const NavInformation = () => {
    const path = usePathname();
    return (
        <SidebarGroup className="px-2 mb-8">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        isActive={path.startsWith('/contacts')}
                        tooltip={<p className={'font-semibold'}>Contacts</p>}
                        onClick={() => (window.location.href = '/contacts')}
                        className="data-[active=true]:border-l-6 dark:data-[active=true]:border-[var(--brand-color)] data-[active=true]:border-black rounded-none"
                    >
                        <PhoneCall className="mr-2 h-4 w-4" />
                        <span>Contacts</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <LanguageSwitcher />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <ThemeToggle />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavInformation;
