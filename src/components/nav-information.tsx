'use client';
import React from 'react';
import { Globe, PhoneCall } from 'lucide-react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import ThemeToggle from './theme-toggle';
import { usePathname } from 'next/navigation';
import AppDialog from '@/components/app-dialog';
import { LanguageToggle } from '@/components/language-toggle';

const LanguageDialogHeader = (
    <div className={'w-full flex items-center relative'}>Select Languages</div>
);

const LanguageDialogContent = <LanguageToggle />;

const NavInformation = () => {
    const path = usePathname();
    return (
        <SidebarGroup className="px-2 mb-8">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        isActive={path.startsWith('/contacts')}
                        tooltip={<p>Contacts</p>}
                        onClick={() => (window.location.href = '/contacts')}
                        className="data-[active=true]:border-l-6 dark:data-[active=true]:border-[var(--brand-color)] data-[active=true]:border-black rounded-none"
                    >
                        <PhoneCall className="mr-2 h-4 w-4" />
                        <span>Contacts</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <AppDialog
                        trigger={
                            <SidebarMenuButton tooltip={<p>Languages</p>}>
                                <Globe className="mr-2 h-4 w-4" />
                                <span>Languages</span>
                            </SidebarMenuButton>
                        }
                        contentContainerClassName={'max-w-sm! min-w-sm'}
                        headerContent={LanguageDialogHeader}
                        mainContent={LanguageDialogContent}
                    />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <ThemeToggle />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavInformation;
