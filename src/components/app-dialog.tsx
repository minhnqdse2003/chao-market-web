'use client';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface AlertDialogInfoProps {
    trigger?: ReactNode;
    headerContent?: ReactNode;
    mainContent?: ReactNode;
    footerContent?: ReactNode;
    triggerClassName?: string;
}

const AppDialog = ({
    trigger = <Button variant="outline">Show Dialog</Button>,
    headerContent = null,
    mainContent = null,
    footerContent = null,
    triggerClassName = '',
}: AlertDialogInfoProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger && <div className={triggerClassName}>{trigger}</div>}
            </AlertDialogTrigger>
            <AlertDialogContent>
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
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppDialog;
