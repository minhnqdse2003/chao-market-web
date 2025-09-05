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

    const handleClick = () => {
        if (item.children && path.startsWith(item.url)) {
            setOpen(prev => !prev);
        } else {
            onRedirect(item.url);
        }
    };

    const onRedirect = (url: string) => redirect(url);

    return (
        <Collapsible
            asChild
            open={open}
            className='group/collapsible [&>button[data-slot="collapsible-trigger"]]:rounded-none [&>button[data-active=true]]:border-l-6 dark:[&>button[data-active=true]]:border-[var(--brand-color)] [&>button[data-active=true]]:border-brand-text [&>button[data-active=true]]:rounded-none [&>button]:cursor-pointer'
        >
            <SidebarMenuItem>
                {item.children ? (
                    <>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                                tooltip={
                                    <div className="flex flex-col gap-1 p-2">
                                        <div
                                            className="font-semibold mb-1.5 cursor-pointer dark:hover:text-[var(--brand-color)]"
                                            onClick={handleClick}
                                        >
                                            {item.title}
                                        </div>
                                        {item.children.map(subItem => (
                                            <div
                                                key={subItem.title}
                                                onClick={() =>
                                                    onRedirect(subItem.url)
                                                }
                                                className="dark:hover:text-[var(--brand-color)] cursor-pointer"
                                            >
                                                {subItem.title}
                                            </div>
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
                            <SidebarMenuSub className="border-none pl-4 list-disc [&>li]:marker:text-xs dark:[&>li]:marker:text-[var(--brand-grey)] [&>li]:marker:text-brand-text">
                                {item.children.map(subItem => (
                                    <SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton
                                            className="rounded-none"
                                            isActive={
                                                path === subItem.url ||
                                                fullPath === subItem.url
                                            }
                                            onClick={() =>
                                                onRedirect(subItem.url)
                                            }
                                        >
                                            <span className="text-xs">
                                                {subItem.title}
                                            </span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </>
                ) : (
                    <SidebarMenuButton
                        isActive={path.startsWith(item.url)}
                        onClick={() => onRedirect(item.url)}
                        tooltip={<p>{item.title}</p>}
                    >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                )}
            </SidebarMenuItem>
        </Collapsible>
    );
}
