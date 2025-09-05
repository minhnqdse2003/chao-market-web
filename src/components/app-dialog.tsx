'use client';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DialogProps {
    trigger?: ReactNode;
    headerContent?: ReactNode;
    mainContent?: ReactNode;
    footerContent?: ReactNode;
    triggerClassName?: string;
    contentContainerClassName?: string;
    floatingCloseButton?: ReactNode;
}

const AppDialog = ({
    trigger = <Button variant="outline">Show Dialog</Button>,
    headerContent = null,
    mainContent = null,
    footerContent = null,
    triggerClassName = '',
    contentContainerClassName = '',
    floatingCloseButton,
}: DialogProps) => {
    return (
        <Dialog>
            <DialogTrigger
                className={
                    'dark:data-[state=open]:text-[var(--brand-color)] data-[state=open]:text-brand-text'
                }
                asChild
            >
                {trigger && <div className={triggerClassName}>{trigger}</div>}
            </DialogTrigger>
            <DialogContent
                className={cn(
                    'bg-brand-dialog max-h-[90svh] [&>.dialog-header]:pt-0 [&>.dialog-footer]:p-0' +
                        ' [&>.dialog-content]:p-0' +
                        ' [&_.dialog-footer]:m-0 [&_[data-slot="dialog-close"]]:cursor-pointer min-w-xl',
                    contentContainerClassName
                )}
                onOpenAutoFocus={e => e.preventDefault()}
            >
                {headerContent && (
                    <DialogTitle className="sr-only p-0!">
                        {typeof headerContent === 'string'
                            ? headerContent
                            : 'Dialog Header'}
                    </DialogTitle>
                )}
                {headerContent && (
                    <div className="dialog-header">{headerContent}</div>
                )}
                {mainContent && (
                    <div className="dialog-content">{mainContent}</div>
                )}
                {footerContent && (
                    <div className="dialog-footer mt-4 dark:[&>_*_button:hover]:font-semibold">
                        {footerContent}
                    </div>
                )}
                {floatingCloseButton && (
                    <DialogClose className={'hehe'}>
                        {floatingCloseButton}
                    </DialogClose>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AppDialog;
