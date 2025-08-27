'use client';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AlertDialogInfoProps {
    trigger?: ReactNode;
    headerContent?: ReactNode;
    mainContent?: ReactNode;
    footerContent?: ReactNode;
    triggerClassName?: string;
    contentContainerClassName?: string;
    floatingCancelButton?: ReactNode;
}

const AppDialog = ({
    trigger = <Button variant="outline">Show Dialog</Button>,
    headerContent = null,
    mainContent = null,
    footerContent = null,
    triggerClassName = '',
    contentContainerClassName = '',
    floatingCancelButton,
}: AlertDialogInfoProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger
                className={'data-[state=open]:text-[var(--brand-color)]'}
                asChild
            >
                {trigger && <div className={triggerClassName}>{trigger}</div>}
            </AlertDialogTrigger>
            <AlertDialogContent
                className={cn(contentContainerClassName, 'bg-brand-dialog')}
            >
                {headerContent && (
                    <div className="alert-dialog-header">{headerContent}</div>
                )}
                {mainContent && (
                    <div className="alert-dialog-content">{mainContent}</div>
                )}
                {footerContent && (
                    <div className="alert-dialog-footer mt-4">
                        {footerContent}
                    </div>
                )}
                {floatingCancelButton && (
                    <AlertDialogCancel
                        className={
                            'absolute top-2 right-2 p-0! border-none bg-transparent! hover:bg-transparent!' +
                            ' cursor-pointer w-fit h-fit'
                        }
                    >
                        {floatingCancelButton}
                    </AlertDialogCancel>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppDialog;
