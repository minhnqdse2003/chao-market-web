'use client';

import * as React from 'react';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import '@/app/globals.css';

interface AppDatePickerProps {
    containerClass?: ClassValue;
    onDateChange?: (date: Date | undefined) => void;
}

export function AppDatePicker({
    containerClass = '',
    onDateChange,
}: AppDatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setOpen(false);
        if (onDateChange) {
            onDateChange(selectedDate);
        }
    };

    return (
        <div className={cn(containerClass, 'flex flex-col gap-2 mb-4')}>
            <Label htmlFor="date" className="px-1">
                Date:
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        <div className={'flex gap-1 items-center'}>
                            <CalendarIcon className="h-4 w-4" />
                            {date ? format(date, 'dd/MM/yyyy') : 'DD/MM/YYYY'}
                        </div>
                        <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0 bg-brand-dialog"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={handleDateSelect}
                        className={'app-date-picker'}
                        classNames={{
                            selected:
                                'dark:[&>button]:bg-[var(--brand-color)]' +
                                ' dark:[&:hover>button]:bg-[var(--brand-color-foreground)]' +
                                ' dark:text-black dark:[&:hover>button]:text-black',
                            today:
                                'dark:[&>button]:text-[var(--brand-color)] border border-[var(--brand-color)]' +
                                ' rounded-md' +
                                ' dark:[&:hover>button]:text-[var(--brand-color-foreground)]' +
                                ' dark:hover:border-[var(--brand-color-foreground)]' +
                                ' dark:[&[data-selected="true"]>button]:text-black' +
                                ' dark:[&[data-selected="true"]]:border-transparent',
                            months_dropdown:
                                'app-months-dropdown [&_option]:hover:!bg-red-500',
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
