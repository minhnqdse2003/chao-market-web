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
import { XIcon } from 'lucide-react';

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
        type?: 'button' | 'text';
    };
    onClickCloseIcon?: () => void;
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
    onClickCloseIcon,
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
                className={cn(
                    'bg-brand-dialog w-fit min-w-fit max-w-fit',
                    contentClassName
                )}
                onClickActionOverlay={() => onClickCloseIcon?.()}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle
                        className={
                            'text-base lg:text-size-22 font-bold dark:text-[var(--brand-color)] text-brand-text' +
                            ' text-center'
                        }
                    >
                        <p
                            dangerouslySetInnerHTML={{ __html: content.title }}
                        />
                    </AlertDialogTitle>
                    {content?.description && (
                        <AlertDialogDescription asChild>
                            <div
                                className={
                                    '[&>_*]:text-base [&>_*]:w-fit [&>_*]:min-w-fit'
                                }
                            >
                                {content?.description}
                            </div>
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter
                    className={
                        accepted?.type === 'button' ||
                        accepted?.type === undefined
                            ? ''
                            : 'sm:justify-start'
                    }
                >
                    {cancelled && (
                        <AlertDialogCancel onClick={cancelled.onChange}>
                            {cancelled.title}
                        </AlertDialogCancel>
                    )}
                    {onClickCloseIcon && (
                        <AlertDialogCancel
                            onClick={onClickCloseIcon}
                            className={
                                'dark:bg-transparent border-transparent dark:border-transparent' +
                                ' dark:hover:bg-transparent hover:bg-transparent hover:cursor-pointer absolute top-2' +
                                ' right-2 text-[var(--brand-grey-foreground)] hover:text-brand-text'
                            }
                        >
                            <XIcon />
                        </AlertDialogCancel>
                    )}
                    {accepted && (
                        <AlertDialogAction
                            onClick={e => {
                                e.preventDefault();
                                accepted.onChange();
                            }}
                            className={cn(
                                'dark:text-black' +
                                    ' dark:bg-[var(--brand-color)] font-bold cursor-pointer',
                                accepted.type === 'button' ||
                                    accepted.type === undefined
                                    ? 'bg-[var(--brand-color)] text-white'
                                    : 'bg-transparent text-brand-text dark:bg-transparent text-base px-0' +
                                          ' dark:text-[var(--brand-color)]'
                            )}
                        >
                            {accepted.title}
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
