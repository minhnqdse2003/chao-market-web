'use client';

import { ChevronRight, LucideProps } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { redirect, usePathname } from 'next/navigation';

export function NavMain({
    items,
}: Readonly<{
    items: {
        title: string;
        url: string;
        icon: React.ForwardRefExoticComponent<
            Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
        >;
        children?: {
            title: string;
            url: string;
        }[];
    }[];
}>) {
    const path = usePathname();

    return (
        <SidebarGroup className="sidebar-scroll">
            <SidebarMenu className="sidebar-scroll">
                {items.map(item => (
                    <CollapsibleItem key={item.title} item={item} path={path} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function CollapsibleItem({
    item,
    path,
}: {
    item: {
        title: string;
        url: string;
        icon: React.ForwardRefExoticComponent<
            Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
        >;
        children?: {
            title: string;
            url: string;
        }[];
    };
    path: string;
}) {
    const [hash, setHash] = useState('');
    // Determine if the item should be open based on current path
    const fullPath = path + hash;

    const shouldExpand =
        item.children?.some(child => fullPath === child.url) ||
        fullPath.startsWith(item.url);
    const [open, setOpen] = useState(shouldExpand);

    // Sync open state when path changes
    useEffect(() => {
        if (shouldExpand) {
            setOpen(true);
        }
    }, [shouldExpand]);

    useEffect(() => {
        function onHashChange() {
            setHash(window.location.hash);
        }

        // Capture hash on mount
        setHash(window.location.hash);

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        if (item.children && path.startsWith(item.url)) {
            e.preventDefault(); // Prevent redirect
            setOpen(prev => !prev);
        } else {
            redirect(item.url);
        }
    };

    return (
        <Collapsible
            asChild
            open={open}
            className='group/collapsible [&>a[data-slot="sidebar-menu-button"]]:rounded-none [&>button[data-slot="collapsible-trigger"]]:rounded-none [&>a[data-active=true]]:border-l-6 [&>a[data-active=true]]:border-[var(--brand-color)] [&>button[data-active=true]]:border-l-6 [&>button[data-active=true]]:border-[var(--brand-color)]'
        >
            <SidebarMenuItem>
                {item.children ? (
                    <>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                                tooltip={
                                    <div className="flex flex-col gap-1 p-2">
                                        <p className="font-semibold mb-1.5">
                                            {item.title}
                                        </p>
                                        {item.children.map(subItem => (
                                            <a
                                                key={subItem.title}
                                                href={subItem.url}
                                                className="hover:underline"
                                            >
                                                {subItem.title}
                                            </a>
                                        ))}
                                    </div>
                                }
                                isActive={path.startsWith(item.url)}
                                onClick={handleClick}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                            <SidebarMenuSub className="border-none pl-4 list-disc [&>li]:marker:text-xs [&>li]:marker:text-[var(--brand-grey)]">
                                {item.children.map(subItem => (
                                    <SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton
                                            asChild
                                            className="rounded-none"
                                            isActive={
                                                path === subItem.url ||
                                                fullPath === subItem.url
                                            }
                                        >
                                            <a href={subItem.url}>
                                                <span className="text-xs">
                                                    {subItem.title}
                                                </span>
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </>
                ) : (
                    <SidebarMenuButton
                        asChild
                        isActive={path.startsWith(item.url)}
                        onClick={handleClick}
                    >
                        <a href={item.url}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                )}
            </SidebarMenuItem>
        </Collapsible>
    );
}
