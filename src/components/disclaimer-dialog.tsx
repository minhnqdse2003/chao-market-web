'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';
import { useSidebar } from '@/components/ui/sidebar';

interface DisclaimerDialogProps {
    trigger: ReactNode;
}

export default function DisclaimerDialog({ trigger }: DisclaimerDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { open: isSidebarOpen } = useSidebar();
    const [countdown, setCountdown] = useState(10);
    const [isFirstTime, setIsFirstTime] = useState(false);
    const autoCloseTimeout = useRef<NodeJS.Timeout | null>(null);
    const countdownInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const hasSeen = sessionStorage.getItem('funnelDialogSeen');
        if (!hasSeen) {
            setIsOpen(true);
            setIsFirstTime(true);
            setCountdown(10);

            // Start countdown interval to update seconds every 1s
            countdownInterval.current = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        if (countdownInterval.current) {
                            clearInterval(countdownInterval.current);
                            countdownInterval.current = null;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Auto close after 10 seconds
            autoCloseTimeout.current = setTimeout(() => {
                setIsOpen(false);
                sessionStorage.setItem('funnelDialogSeen', 'true');
            }, 10000);
        }

        // Cleanup on unmount
        return () => {
            if (autoCloseTimeout.current)
                clearTimeout(autoCloseTimeout.current);
            if (countdownInterval.current)
                clearInterval(countdownInterval.current);
        };
    }, []);

    const handleClose = () => {
        // If auto close timer or countdown is running, cancel them
        if (autoCloseTimeout.current) {
            clearTimeout(autoCloseTimeout.current);
            autoCloseTimeout.current = null;
        }
        if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
            countdownInterval.current = null;
        }

        setIsOpen(false);
        setIsFirstTime(false);
        sessionStorage.setItem('funnelDialogSeen', 'true');
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <div
                sidebar-open={isSidebarOpen.toString()}
                dialog-open={isOpen.toString()}
                className={
                    'flex items-center justify-center gap-2 text-sm cursor-pointer transition-all! duration-300' +
                    ' ease-in-out dark:hover:text-[var(--brand-color)] [&[sidebar-open="true"]]:hover:pb-2 py-1' +
                    ' absolute' +
                    ' left-0 bottom-0 w-[var(--sidebar-width)]' +
                    ' bg-[var(--brand-grey)] hover:bg-[var(--brand-grey)] transition-all!' +
                    ' ease-in-out rounded-b-none rounded-t-3xl' +
                    ' dark:[&[dialog-open="true"]]:text-[var(--brand-color)]' +
                    ' [&[sidebar-open="false"]]:w-12' +
                    ' [&[sidebar-open="false"]>span]:invisible [&[sidebar-open="false"]>span]:fixed' +
                    ' [&[sidebar-open="false"]]:h-8 dark:border-transparent border border-b-0' +
                    ' border-[var(--brand-grey-foreground)]'
                }
                onClick={() => setIsOpen(true)}
            >
                {trigger}
            </div>

            <DialogContent className="bg-brand-dialog min-w-[60svw]">
                <DialogHeader>
                    <DialogTitle className="text-brand-text">
                        Disclaimer
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <p className="dark:text-[var(--brand-color)] text-center mb-4 text-lg leading-relaxed">
                        &#34;The information provided by Chào Market does not
                        constitute and shall not be considered as investment
                        advice, financial advice, a recommendation, or a
                        solicitation to buy, sell, or hold any financial asset.
                        <br />
                        All investment decisions carry financial risks, and you
                        are solely responsible for your own decisions&#34;
                    </p>
                </div>

                <DialogFooter>
                    <Button
                        className="font-bold mx-auto bg-[var(--brand-color)] text-black hover:bg-[var(--brand-color-foreground)] w-fit transition-all! duration-300 ease-in-out"
                        onClick={handleClose}
                    >
                        I Agree
                    </Button>
                </DialogFooter>

                {/* Auto-close countdown message - only show for first time users */}
                {isFirstTime && countdown > 0 && (
                    <p className="text-sm text-[var(--brand-grey-foreground)] text-center mt-2">
                        This will automatically close in{' '}
                        <span className="dark:text-[var(--brand-color)] font-semibold dark:font-normal text-brand-text">
                            {countdown}
                        </span>{' '}
                        second{countdown > 1 ? 's' : ''}.
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}
