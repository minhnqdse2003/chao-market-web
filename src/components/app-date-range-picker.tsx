'use client';
import { CalendarSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface AppDateRangePickerProps {
    initialStartDate?: Date;
    initialEndDate?: Date;
    onChange: (range: { startDate?: Date; endDate?: Date }) => void;
    label?: string;
}

const AppDateRangePicker = ({
    initialStartDate,
    initialEndDate,
    onChange,
    label = 'Date Range',
}: AppDateRangePickerProps) => {
    const [open, setOpen] = useState<{ start: boolean; end: boolean }>({
        start: false,
        end: false,
    });
    const [startDate, setStartDate] = useState<Date | undefined>(
        initialStartDate
    );
    const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);

    const handleOpenPopover = (key: keyof typeof open, value: boolean) => {
        setOpen(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    // Notify parent of date range changes
    useEffect(() => {
        if (onChange) {
            onChange({ startDate, endDate });
        }
    }, [startDate, endDate, onChange]);

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label className="px-1">{label}</Label>
            <div className="flex gap-[1rem] items-center">
                <Popover
                    open={open.start}
                    onOpenChange={value => handleOpenPopover('start', value)}
                >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="start-date"
                            className="w-[calc(50%-1.5rem)] justify-between font-normal"
                        >
                            {startDate
                                ? format(startDate, 'dd-MM-yyyy')
                                : 'Select start date'}
                            <CalendarSearch />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={startDate}
                            captionLayout="dropdown"
                            onSelect={date => {
                                setStartDate(date);
                                handleOpenPopover('start', false);
                            }}
                            disabled={date =>
                                endDate ? date > endDate : false
                            }
                            className="dark:[&_*_.rdp-dropdown]:text-white dark:[&_*_.rdp-dropdown]:bg-background"
                        />
                    </PopoverContent>
                </Popover>
                <Separator className="w-full max-w-[1rem]" />
                <Popover
                    open={open.end}
                    onOpenChange={value => handleOpenPopover('end', value)}
                >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="end-date"
                            className="w-[calc(50%-1.5rem)] justify-between font-normal"
                        >
                            {endDate
                                ? format(endDate, 'dd-MM-yyyy')
                                : 'Select end date'}
                            <CalendarSearch />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={endDate}
                            captionLayout="dropdown"
                            onSelect={date => {
                                setEndDate(date);
                                handleOpenPopover('end', false);
                            }}
                            disabled={date =>
                                startDate ? date < startDate : false
                            }
                            className="dark:[&_*_.rdp-dropdown]:text-white dark:[&_*_.rdp-dropdown]:bg-background"
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default AppDateRangePicker;
