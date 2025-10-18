import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React from 'react';
import { cn } from '@/lib/utils';

interface AppAlertDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    dialogTrigger?: React.ReactNode;
    content: {
        title: string;
        description?: React.ReactNode;
    };
    cancelled?: {
        title: string;
        onChange: () => void;
    };
    accepted?: {
        title: string;
        onChange: () => void;
    };
    defaultOpen?: boolean;
    contentClassName?: string;
}

export default function AppAlertDialog({
    open,
    onOpenChange,
    dialogTrigger,
    content,
    cancelled,
    accepted,
    defaultOpen = false,
    contentClassName,
}: AppAlertDialogProps) {
    return (
        <AlertDialog
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            {dialogTrigger && (
                <AlertDialogTrigger asChild>{dialogTrigger}</AlertDialogTrigger>
            )}
            <AlertDialogContent
                overLayClassName={'backdrop-blur-sm'}
                className={cn('bg-brand-dialog', contentClassName)}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>{content?.title}</AlertDialogTitle>
                    {content?.description && (
                        <AlertDialogDescription asChild>
                            <div>{content?.description}</div>
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {cancelled && (
                        <AlertDialogCancel onClick={cancelled.onChange}>
                            {cancelled.title}
                        </AlertDialogCancel>
                    )}
                    {accepted && (
                        <AlertDialogAction
                            onClick={e => {
                                e.preventDefault();
                                accepted.onChange();
                            }}
                            className={
                                'dark:text-black' +
                                ' dark:bg-[var(--brand-color)] font-bold cursor-pointer'
                            }
                        >
                            {accepted.title}
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
