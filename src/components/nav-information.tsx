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
        <SidebarGroup className="p-0">
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
                    <ThemeToggle />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        className="flex justify-center cursor-pointer bg-[var(--brand-black-bg)] mt-2 py-6 px-4 rounded-none rounded-t-3xl font-semibold"
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
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavInformation;
