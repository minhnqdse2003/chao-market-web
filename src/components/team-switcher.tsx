import * as React from 'react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { LogoBrand } from '@image/index';

export function NavHead({
    headers: data,
}: Readonly<{
    headers: {
        name: string;
        logo: React.ElementType;
        plan: string;
    }[];
}>) {
    const { open } = useSidebar();
    const teams = data[0];
    return (
        <SidebarGroup className="pl-0">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <div
                            className={
                                'bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square' +
                                ' items-center justify-center rounded-lg ' +
                                `${open ? 'size-12' : 'size-8'}`
                            }
                        >
                            <Image
                                src={LogoBrand}
                                alt="Logo Brand"
                                width={1920}
                                height={1080}
                                className={open ? 'size-12' : 'size-8'}
                            />
                        </div>
                        <div className="grid flex-1 text-left text-base leading-tight">
                            <span className="truncate font-semibold">
                                {teams.name}
                            </span>
                            <span className="truncate text-xs">
                                {teams.plan}
                            </span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
