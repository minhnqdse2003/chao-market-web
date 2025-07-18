'use client';

import { ChevronRight, LucideProps } from 'lucide-react';

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
    return (
        <SidebarGroup className="sidebar-scroll">
            <SidebarMenu className="sidebar-scroll">
                {items.map(item => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={true}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            {item.children ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={
                                                item.children ? (
                                                    <div className="flex flex-col gap-1 p-2">
                                                        <p className="font-semibold mb-1.5">
                                                            {item.title}
                                                        </p>
                                                        {item.children.map(
                                                            subItem => (
                                                                <a
                                                                    key={
                                                                        subItem.title
                                                                    }
                                                                    href={
                                                                        subItem.url
                                                                    }
                                                                    className="hover:underline"
                                                                >
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                ) : undefined
                                            }
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.children.map(subItem => (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
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
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
