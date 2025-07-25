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
import { useCallback, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface AppDateRangePickerProps {
    onChange: (range: { startDate?: Date; endDate?: Date }) => void;
    label?: string;
    value?: {
        startDate?: Date;
        endDate?: Date;
    };
}

const AppDateRangePicker = ({
    onChange,
    value,
    label = 'Date Range',
}: AppDateRangePickerProps) => {
    const [open, setOpen] = useState<{ start: boolean; end: boolean }>({
        start: false,
        end: false,
    });

    const handleOpenPopover = useCallback(
        (key: keyof typeof open, value: boolean) => {
            setOpen(prev => ({
                ...prev,
                [key]: value,
            }));
        },
        []
    );

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
                            {value?.startDate
                                ? format(value.startDate, 'dd-MM-yyyy')
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
                            selected={value?.startDate}
                            captionLayout="dropdown"
                            onSelect={date => {
                                onChange({
                                    startDate: date,
                                    endDate: value?.endDate,
                                });
                                handleOpenPopover('start', false);
                            }}
                            disabled={date =>
                                value?.endDate ? date > value?.endDate : false
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
                            {value?.endDate
                                ? format(value.endDate, 'dd-MM-yyyy')
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
                            selected={value?.endDate}
                            captionLayout="dropdown"
                            onSelect={date => {
                                onChange({
                                    startDate: value?.startDate,
                                    endDate: date,
                                });
                                handleOpenPopover('end', false);
                            }}
                            disabled={date =>
                                value?.startDate
                                    ? date < value.startDate
                                    : false
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
