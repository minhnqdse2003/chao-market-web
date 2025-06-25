'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from './ui/sidebar';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const { open: isCollapsed, isMobile } = useSidebar();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentTheme =
        theme === 'light' || theme === 'dark' ? theme : 'light';
    const isCompact = isMobile || !isCollapsed;

    if (isCompact) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-transparent border-none"
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="right">
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                        <Sun className="mr-2 h-4 w-4" /> Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                        <Moon className="mr-2 h-4 w-4" /> Dark
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // Render Tabs for wider screen or expanded sidebar
    return (
        <Tabs
            defaultValue={currentTheme}
            onValueChange={value => setTheme(value)}
            className="w-fit"
        >
            <TabsList className="grid grid-cols-2 bg-[oklch(0.708 0 0)]">
                <TabsTrigger
                    value="light"
                    className="text-white bg-[oklch(0.708 0 0)] data-[state=active]:text-[var(--brand-color)] data-[state=active]:bg-[oklch(0.708 0 0)] data-[state=active]:border-gray-400/60"
                >
                    <Sun className="mr-1 h-4 w-4" /> Light
                </TabsTrigger>
                <TabsTrigger
                    value="dark"
                    className=" dark:data-[state=active]:text-[var(--brand-color)] text-white"
                >
                    <Moon className="mr-1 h-4 w-4" /> Dark
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default ThemeToggle;
