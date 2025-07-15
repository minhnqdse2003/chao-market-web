import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { cn } from '@/lib/utils';
import { type ClassValue } from 'clsx';

export default function DialogPreview({
    children,
    onClick,
    classNameButton,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    classNameButton?: ClassValue;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        'bg-[var(--brand-color)] text-black hover:bg-[var(--brand-color)]',
                        classNameButton
                    )}
                    onClick={() => {
                        onClick?.();
                    }}
                >
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[80svw] md:max-h-[90svh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Preview Contents</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
