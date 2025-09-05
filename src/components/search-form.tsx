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
import { useRef } from 'react';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
    const { open: isOpen, toggleSidebar } = useSidebar();
    const searchRef = useRef<HTMLDivElement>(null);

    if (!isOpen) {
        return (
            <SidebarGroup className="p-0!">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            onClick={toggleSidebar}
                            className="h-8 w-full justify-center hehe"
                            aria-label="Open search"
                            tooltip={<p>Search</p>}
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
            <SidebarGroup className="py-0 dark:bg-sidebar">
                <SidebarGroupContent
                    ref={searchRef}
                    className="relative w-full border-[var(--brand-grey)] text-[var(--brand-grey)] border-b-2 mb-4 pb-4 dark:[&:hover>svg]:text-[var(--brand-color)]  dark:[&_input:focus-visible~svg]:text-[var(--brand-color)] transition-all! duration-300 ease-in-out"
                >
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="Search"
                        className="pl-8 pt-5 border-none dark:bg-transparent focus-visible:ring-0 text-brand-text dark:placeholder:text-[var(--brand-grey)]"
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 select-none" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    );
}
