'use client';

import { ChevronRight, LucideProps } from 'lucide-react';
import { useState, useEffect, useContext, createContext } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { T } from '@/components/app-translate';

// Create context to manage single open collapsible
const CollapsibleContext = createContext<{
    openItemId: string | null;
    setOpenItemId: (id: string | null) => void;
}>({
    openItemId: null,
    setOpenItemId: () => {},
});

export function NavMain({
    items,
    memberOnlyRoute,
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
    memberOnlyRoute: {
        title: string;
        url: string;
        icon: React.ForwardRefExoticComponent<
            Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
        >;
    }[];
}>) {
    let path = usePathname();
    const params = useSearchParams();

    path =
        (params && path.includes('/chao-insights')) ||
        path.includes('/community')
            ? path + '?' + new URLSearchParams(params).toString()
            : path;

    const [openItemId, setOpenItemId] = useState<string | null>(null);

    // Find which item should be open based on current path
    useEffect(() => {
        const activeItem = items.find(item => {
            if (item.children) {
                return (
                    item.children.some(child => path.startsWith(child.url)) ||
                    path.startsWith(item.url)
                );
            }
            return path.startsWith(item.url);
        });

        if (activeItem) {
            setOpenItemId(activeItem.title);
        }
    }, [path, items]);

    return (
        <CollapsibleContext.Provider value={{ openItemId, setOpenItemId }}>
            <SidebarGroup className="sidebar-scroll">
                <SidebarMenu className="sidebar-scroll">
                    {items.map(item => (
                        <CollapsibleItem
                            key={item.title}
                            item={item}
                            path={path}
                        />
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup className="sidebar-scroll">
                <SidebarGroupLabel>
                    <T keyName={'sidebar.membersOnly'} />
                </SidebarGroupLabel>
                <SidebarMenu className="sidebar-scroll">
                    {memberOnlyRoute.map(item => (
                        <CollapsibleItem
                            key={item.title}
                            item={item}
                            path={path}
                        />
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </CollapsibleContext.Provider>
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
    const router = useRouter();
    const [hash, setHash] = useState('');
    const fullPath = path + hash;
    const { openItemId, setOpenItemId } = useContext(CollapsibleContext);

    const isOpen = openItemId === item.title;

    useEffect(() => {
        function updateHash() {
            setHash(window.location.hash);
        }

        updateHash();
        window.addEventListener('hashchange', updateHash);
        window.addEventListener('popstate', updateHash);
        const interval = setInterval(updateHash, 100);

        return () => {
            window.removeEventListener('hashchange', updateHash);
            window.removeEventListener('popstate', updateHash);
            clearInterval(interval);
        };
    }, []);

    const handleClick = () => {
        if (item.children) {
            // If it has children, check if we're on the same path
            if (path.startsWith(item.url)) {
                // We're on the same path, toggle the collapsible
                if (isOpen) {
                    setOpenItemId(null);
                } else {
                    setOpenItemId(item.title);
                }
            } else {
                // We're on a different path, redirect first
                router.push(item.url);
                // Then open this item
                setOpenItemId(item.title);
            }
        } else {
            // No children, just redirect
            router.push(item.url);
        }
    };

    return (
        <Collapsible
            asChild
            open={isOpen}
            className='group/collapsible [&>button[data-slot="collapsible-trigger"]]:rounded-none [&>button[data-active=true]]:border-l-6 dark:[&>button[data-active=true]]:border-[var(--brand-color)] [&>button[data-active=true]]:border-brand-text [&>button[data-active=true]]:rounded-none [&>button]:cursor-pointer'
        >
            <SidebarMenuItem className={'font-medium'}>
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
                                                    router.push(subItem.url)
                                                }
                                                className="dark:hover:text-[var(--brand-color)] text-[var(--brand-grey-foreground)] hover:text-brand-text cursor-pointer"
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
                                    <SidebarMenuSubItem
                                        key={subItem.title}
                                        className={'cursor-pointer'}
                                    >
                                        <SidebarMenuSubButton
                                            className="rounded-none"
                                            isActive={
                                                path === subItem.url ||
                                                fullPath === subItem.url
                                            }
                                            onClick={() =>
                                                router.push(subItem.url)
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
                        onClick={() => router.push(item.url)}
                        tooltip={
                            <p className={'font-semibold'}>{item.title}</p>
                        }
                    >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                )}
            </SidebarMenuItem>
        </Collapsible>
    );
}
