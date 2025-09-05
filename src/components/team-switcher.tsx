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
import { cn } from '@/lib/utils';

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
                    <SidebarMenuButton
                        size="lg"
                        className={
                            'dark:hover:text-brand-light hover:bg-transparent pointer-events-none'
                        }
                    >
                        <div
                            className={
                                'bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square' +
                                ' items-center justify-center rounded-lg bg-transparent' +
                                `${open ? 'size-12' : 'size-10'}`
                            }
                        >
                            <Image
                                src={LogoBrand}
                                alt="Logo Brand"
                                width={1920}
                                height={1080}
                                className={cn(
                                    'dark:bg-sidebar bg-sidebar',
                                    `${open ? 'size-12' : 'size-10'}`
                                )}
                            />
                        </div>
                        <div className="grid flex-1 text-left text-lg leading-tight text-brand-text">
                            <span className="truncate font-semibold dark:text-[var(--brand-color)]">
                                {teams.name}
                            </span>
                            <span className="truncate text-sm">
                                {teams.plan}
                            </span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
