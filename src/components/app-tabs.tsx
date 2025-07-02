'use server';

import React from 'react';
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

export async function AppTabs({ tabsList }: Readonly<TabComponentProps>) {
    return (
        <Tabs
            defaultValue={tabsList[0]?.value || 'newsFlow'}
            className="w-full"
        >
            <TabsList className="bg-transparent">
                {tabsList.map(tab => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            'text-white border-0 cursor-pointer rounded-none border-b-2 border-muted-foreground dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-yellow-400 dark:data-[state=active]:border-yellow-400',
                            'px-4 py-2 transition-colors'
                        )}
                    >
                        {tab.title}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabsList.map(async tab => (
                <TabsContent key={tab.value} value={tab.value}>
                    {await tab.renderContent()}
                </TabsContent>
            ))}
        </Tabs>
    );
}
