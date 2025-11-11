/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useDisclaimerStore } from '@/stores/disclaimer.store';
import { DISCLAIMER_ACTIONS } from '@/stores/actions/dislaimer.action';
import { useI18n } from '@/context/i18n/context';
import { useSession } from 'next-auth/react';
import { useGetUserSettings } from '@/hooks/use-get-users-settings';
import { useMutation } from '@tanstack/react-query';
import { editUserSettings } from '@/services/user/get-user-setting';

type DisclaimerSection = {
    title: string;
    content: string;
};

interface DisclaimerDialogProps {
    trigger: ReactNode;
}

export default function DisclaimerDialog({ trigger }: DisclaimerDialogProps) {
    const { t } = useI18n();
    const { data } = useSession();
    const { data: userSettings } = useGetUserSettings(
        (data?.user as unknown as any).id
    );
    const { mutate } = useMutation({
        mutationFn: editUserSettings,
        onSuccess: () => {},
        onError: error => console.log(error.message),
    });
    const disclaimerTitle = t('disclaimer.title');
    const sections = t('disclaimer.sections') as unknown as DisclaimerSection[];
    const conclusion = t('disclaimer.conclusion');
    const agreeButtonText = t('disclaimer.agreeButton');
    const alreadyAgreeButtonText = t('disclaimer.alreadyAgreeButton');
    const leaveButtonText = t('disclaimer.leaveButton');

    const {
        isRead: isDisclaimerConfirmOnClient,
        acceptedDate,
        dispatch,
    } = useDisclaimerStore();
    const [isOpen, setIsOpen] = useState(false);
    const { open: isSidebarOpen } = useSidebar();
    const [countdown, setCountdown] = useState(10);
    const [isFirstTime, setIsFirstTime] = useState(false);
    const autoCloseTimeout = useRef<NodeJS.Timeout | null>(null);
    const countdownInterval = useRef<NodeJS.Timeout | null>(null);

    const handleClose = () => {
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
    };

    const markAsRead = () =>
        dispatch({ type: DISCLAIMER_ACTIONS.MARK_AS_READ });

    const handleAgree = () => {
        markAsRead();
        handleClose();
    };

    // --- Dynamic countdown text ---
    const countdownText = t('common.autoCloseMessage')
        .replace('{countdown}', countdown.toString())
        .replace('{plural}', countdown === 1 ? '' : 's');

    useEffect(() => {
        const hasSeen = isDisclaimerConfirmOnClient;
        if (!hasSeen) {
            setIsOpen(true);
            setIsFirstTime(true);
            setCountdown(10);

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

            autoCloseTimeout.current = setTimeout(() => {
                setIsOpen(false);
            }, 10000);
        }

        return () => {
            if (autoCloseTimeout.current)
                clearTimeout(autoCloseTimeout.current);
            if (countdownInterval.current)
                clearInterval(countdownInterval.current);
        };
    }, []);

    useEffect(() => {
        if (
            data?.user &&
            userSettings &&
            acceptedDate !== null &&
            userSettings.isDisclaimerAccepted === null
        ) {
            mutate({
                updates: {
                    isDisclaimerAccepted: acceptedDate,
                },
                userId: (data.user as unknown as any).id,
            });
        }
    }, [data?.user, userSettings]);

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
                    ' [&[sidebar-open="false"]]:h-8 dark:border-transparent'
                }
                onClick={() => setIsOpen(true)}
            >
                {trigger}
            </div>

            <DialogContent
                className="bg-brand-dialog min-w-[70svw] focus-visible:outline-0"
                onOpenAutoFocus={e => e.preventDefault()}
                autoFocus={false}
            >
                <DialogHeader>
                    <DialogTitle className="text-brand-text text-center text-2xl font-bold">
                        {disclaimerTitle}
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-3">
                    {Array.isArray(sections) &&
                        sections.map((section, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-semibold text-brand-text mb-2">
                                    {section.title}
                                </h3>
                                <p
                                    className="text-[var(--brand-grey-foreground)] [&>strong]:text-brand-text [&>strong]:font-normal"
                                    dangerouslySetInnerHTML={{
                                        __html: section.content,
                                    }}
                                />
                            </div>
                        ))}
                    <p
                        className="text-[var(--brand-grey-foreground)] pt-4 border-t border-[var(--brand-grey-foreground)]/20 [&_*_a]:text-brand-text dark:[&_*_a]:text-[var(--brand-color)] [&_*_a]:hover:underline"
                        dangerouslySetInnerHTML={{ __html: conclusion }}
                    />
                </div>

                {isDisclaimerConfirmOnClient && (
                    <p className="text-base dark:text-[var(--brand-color)] text-brand-text font-semibold">
                        {alreadyAgreeButtonText}
                    </p>
                )}

                <DialogFooter className="flex-row justify-center sm:justify-center gap-4">
                    {!isDisclaimerConfirmOnClient && (
                        <>
                            <Button
                                className="font-bold bg-[var(--brand-color)] text-black text-md hover:bg-[var(--brand-color)] w-fit transition-all! duration-300 ease-in-out"
                                onClick={handleAgree}
                            >
                                {agreeButtonText}
                            </Button>
                            <a
                                href="https://google.com"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-transparent border border-transparent dark:hover:text-[var(--brand-color)] text-brand-text"
                            >
                                {leaveButtonText}
                            </a>
                        </>
                    )}
                </DialogFooter>

                {isFirstTime && countdown > 0 && (
                    <p className="text-sm text-[var(--brand-grey-foreground)] border-t pt-4 text-center mt-2">
                        {countdownText}
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}
