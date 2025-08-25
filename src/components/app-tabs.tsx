'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type TabItem = {
    title: string;
    value: string;
    renderContent: () => Promise<React.ReactNode>;
};

type TabComponentProps = {
    tabsList: TabItem[];
};

export function AppTabs({ tabsList }: Readonly<TabComponentProps>) {
    const [activeTab, setActiveTab] = useState(tabsList[0]?.value || '');
    const [contentMap, setContentMap] = useState<
        Record<string, React.ReactNode>
    >({});

    useEffect(() => {
        const loadContent = async () => {
            const tab = tabsList.find(t => t.value === activeTab);
            if (tab && !contentMap[activeTab]) {
                const content = await tab.renderContent();
                setContentMap(prev => ({ ...prev, [activeTab]: content }));
            }
        };

        loadContent();
    }, [activeTab, tabsList, contentMap]);

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent w-full mb-2">
                {tabsList.map(tab => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            'text-[var(--brand-grey-light)] border-[var(--brand-grey-light)]' +
                                ' data-[state=active]:shadow-none  data-[state=active]:text-black' +
                                ' data-[state=active]:border-black border-0 cursor-pointer rounded-none border-b-2' +
                                ' dark:border-[var(--brand-grey)] dark:data-[state=active]:bg-transparent' +
                                ' dark:data-[state=active]:text-[var(--brand-color)]' +
                                ' dark:data-[state=active]:border-[var(--brand-color)]',
                            'px-4 py-2 transition-colors! text-base font-bold'
                        )}
                    >
                        {tab.title}
                    </TabsTrigger>
                ))}
            </TabsList>

            {tabsList.map(tab => (
                <TabsContent key={tab.value} value={tab.value}>
                    {contentMap[tab.value] ?? (
                        <div className="text-muted">Loading...</div>
                    )}
                </TabsContent>
            ))}
        </Tabs>
    );
}
