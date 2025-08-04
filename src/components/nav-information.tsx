'use client';
import React from 'react';
import { Globe, Info, PhoneCall } from 'lucide-react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from '@/components/ui/sidebar';
import ThemeToggle from './theme-toggle';
import { usePathname } from 'next/navigation';

const NavInformation = () => {
    const path = usePathname();
    const { open } = useSidebar();
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        isActive={path.startsWith('/contacts')}
                        tooltip={<p>Contacts</p>}
                        onClick={() => (window.location.href = '/contacts')}
                        className="data-[active=true]:border-l-6 data-[active=true]:border-[var(--brand-color)] rounded-none"
                    >
                        <PhoneCall className="mr-2 h-4 w-4" />
                        <span>Contacts</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip={<p>languages</p>}>
                        <Globe className="mr-2 h-4 w-4" />
                        <span>Languages</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        className="flex justify-between bg-[var(--brand-black-bg)] py-6 px-4 font-semibold"
                        tooltip={<p>Disclaimer</p>}
                    >
                        {open ? (
                            <>
                                <span>Disclaimer</span>
                                <Info className="w-4 h-4" />
                            </>
                        ) : (
                            <Info className="w-4 h-4" />
                        )}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <ThemeToggle />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavInformation;
