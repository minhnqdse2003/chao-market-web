'use client';

import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
    const { open: isOpen, toggleSidebar } = useSidebar();

    if (!isOpen) {
        return (
            <SidebarGroup className="p-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            onClick={toggleSidebar}
                            className="h-8 w-full justify-center"
                            aria-label="Open search"
                        >
                            <Search />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        );
    }

    return (
        <form {...props}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="Search..."
                        className="pl-8 border-muted-foreground bg-transparent"
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    );
}
