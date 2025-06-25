import React from 'react';
import { Globe, PhoneCall } from 'lucide-react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import ThemeToggle from './theme-toggle';

const NavInformation = () => {
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip={<p>Contacts</p>}>
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
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavInformation;
