// AccountChartWithDialog.tsx
import { useState } from 'react';
import { AccountChart, ChartDataPoint } from './account-chart';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Maximize2 } from 'lucide-react';

interface AccountChartWithDialogProps {
    data: ChartDataPoint[];
    title?: string;
}

export function AccountChartWithDialog({
    data,
    title = 'Account Performance',
}: AccountChartWithDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="relative cursor-pointer group">
                    <AccountChart data={data} />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="transition-all! duration-300 ease-in-out w-4 h-4 text-[var(--brand-grey-foreground)] hover:text-[var(--brand-color)]" />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[90svw] lg:min-w-[90svw] max-h-[90vh] bg-brand-dialog">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="h-[70vh]">
                    <AccountChart data={data} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
