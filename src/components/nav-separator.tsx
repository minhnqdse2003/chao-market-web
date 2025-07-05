import React from 'react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
} from './ui/sidebar';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

const NavSeparator = ({
    isTrigger = true,
    className,
}: { isTrigger?: boolean } & React.ComponentProps<'button'>) => {
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Separator className={cn('my-4', className)} />
                    {isTrigger && (
                        <SidebarTrigger
                            className={cn(
                                'absolute bg-gray-600 -right-0 top-1/2 transform -translate-y-1/2 translate-x-9/10 cursor-pointer hover:bg-gray-500 z-21 text-white'
                            )}
                        />
                    )}
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavSeparator;
