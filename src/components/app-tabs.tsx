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
    shouldBorderVisible?: boolean;
    isHorizontal?: boolean;
};

export function AppTabs({
    tabsList,
    shouldBorderVisible = true,
    isHorizontal = false,
}: Readonly<TabComponentProps>) {
    const [activeTab, setActiveTab] = useState(tabsList[0]?.value || '');
    const [contentMap, setContentMap] = useState<
        Record<string, React.ReactNode>
    >({});

    useEffect(() => {
        if (
            tabsList.length > 0 &&
            tabsList.find(t => t.value === activeTab) === undefined
        ) {
            setActiveTab(tabsList[0].value);
            setContentMap({});
        }
    }, [tabsList]);

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
        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
            orientation={isHorizontal ? 'horizontal' : 'vertical'}
        >
            <TabsList
                className={cn(
                    'bg-transparent [&>button:last-child]:mr-0 border-[var(--brand-grey-foreground)]' +
                        ' border-b rounded-none p-0 w-full mb-2',
                    `${shouldBorderVisible ? '' : 'border-transparent'}`
                )}
            >
                {tabsList.map(tab => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            'text-[var(--brand-grey-foreground)] -mb-1 dark:border-[var(--brand-grey-foreground)]' +
                                ' data-[state=active]:shadow-none transition-all! duration-300 ease-in-out' +
                                '  data-[state=active]:text-black data-[state=active]:bg-transparent' +
                                ' data-[state=active]:border-black border-0 cursor-pointer rounded-none border-b-2' +
                                ' dark:border-[var(--brand-grey)] dark:data-[state=active]:bg-transparent' +
                                ' dark:data-[state=active]:text-[var(--brand-color)]' +
                                ' dark:data-[state=active]:border-[var(--brand-color)]' +
                                ' dark:data-[state=inactive]:border-transparent',
                            'px-4 mr-4 py-2 transition-colors! text-base font-bold' +
                                ' dark:hover:data-[state=inactive]:text-[var(--brand-color)]' +
                                ' dark:hover:data-[state=inactive]:border-[var(--brand-color)]' +
                                ' data-[state=inactive]:hover:text-black data-[state=inactive]:hover:border-black',
                            `${shouldBorderVisible ? '' : 'border-transparent!'}`
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
