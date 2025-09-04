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
    buttonClass?: ClassValue;
    onDateChange?: (date: Date | undefined) => void;
    isFloatingLabel?: boolean;
    label?: string;
    highlightOnActive?: boolean;
}

export function AppDatePicker({
    containerClass = '',
    buttonClass = '',
    onDateChange,
    isFloatingLabel = false,
    label = 'Date:',
    highlightOnActive = false,
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

    const isHightlightVisible = (date: Date | undefined) => {
        if (!date) return '';
        if (highlightOnActive) return 'text-[var(--brand-color)]';
        return 'text-white';
    };

    if (isFloatingLabel) {
        const shouldFloat = date || open;

        return (
            <div
                className={cn(
                    containerClass,
                    'flex flex-col gap-2 mb-4 relative'
                )}
            >
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className={cn(
                                'w-48 justify-between items-center p-3 py-6 font-normal hover:text-[var(--brand-color)] transition-all! duration-300 ease-in-out',
                                `${open ? 'dark:border-[var(--brand-color)] text-[var(--brand-color)]' : 'text-[var(--brand-grey-foreground)]'}`,
                                buttonClass
                            )}
                        >
                            <div
                                className={cn(
                                    'flex gap-1 items-center h-full w-full',
                                    `${isHightlightVisible(date)}`
                                )}
                            >
                                <CalendarIcon className="h-4 w-4" />
                                {date ? (
                                    format(date, 'dd/MM/yyyy')
                                ) : (
                                    <span className="opacity-0">
                                        DD/MM/YYYY
                                    </span>
                                )}
                                <div className="flex-grow"></div>
                                <ChevronDownIcon className="h-4 w-4" />
                            </div>
                            <Label
                                htmlFor="date"
                                className={cn(
                                    'absolute left-8 text-sm font-semibold' +
                                        ' transition-all! duration-300 ease-in-out pointer-events-none',
                                    shouldFloat
                                        ? '-top-2 left-4 bg-sidebar px-1 text-xs'
                                        : 'top-4'
                                )}
                            >
                                {label}
                            </Label>
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
                            className={'app-date-picker w-full'}
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
                                day_button:
                                    'dark:hover:text-[var(--brand-color)] dark:hover:bg-transparent',
                                months_dropdown: 'app-months-dropdown',
                                years_dropdown: 'app-years-dropdown',
                                dropdowns:
                                    'w-full flex items-center text-sm font-medium justify-center' +
                                    ' h-(--cell-size) gap-1.5 rdp-dropdowns text-[var(--brand-color)]' +
                                    ' [&>_*_svg]:text-[var(--brand-color)]!',
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        );
    }

    // Default implementation (non-floating label)
    return (
        <div className={cn(containerClass, 'flex flex-col gap-2 mb-4')}>
            <Label htmlFor="date" className="px-1">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className={cn(
                            'w-48 justify-between font-normal',
                            buttonClass
                        )}
                    >
                        <div
                            className={cn(
                                'flex gap-1 items-center',
                                `${isHightlightVisible(date)}`
                            )}
                        >
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
                        className={'app-date-picker w-full'}
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
                            day_button:
                                'dark:hover:text-[var(--brand-color)] dark:hover:bg-transparent',
                            months_dropdown: 'app-months-dropdown',
                            years_dropdown: 'app-years-dropdown',
                            dropdowns:
                                'w-full flex items-center text-sm font-medium justify-center' +
                                ' h-(--cell-size) gap-1.5 rdp-dropdowns text-[var(--brand-color)]' +
                                ' [&>_*_svg]:text-[var(--brand-color)]!',
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
