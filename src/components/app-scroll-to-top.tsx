'use client';

import { ArrowUpToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { T } from '@/components/app-translate';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={scrollToTop}
                            should-visible={isVisible.toString()}
                            size="icon"
                            className='[&[should-visible="true"]]:h-12 [&[should-visible="true"]]:w-12 [&[should-visible="false"]]:h-0 [&[should-visible="false"]]:w-0 rounded-full shadow-lg transition-all! hover:scale-105 overflow-hidden dark:bg-[var(--brand-color)] dark:hover:bg-[var(--brand-color)] bg-[var(--brand-color)] hover:bg-[var(--brand-color)] [&_svg]:text-black'
                            aria-label="Scroll to top"
                        >
                            <ArrowUpToLine className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={'left'}>
                        <T keyName={'common.scrollToTop'} />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
