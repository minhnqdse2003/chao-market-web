'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ChevronsUpDown, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
    value: string;
    label: string;
    icon?: LucideIcon;
    iconColor?: string;
    group: string;
}

interface AppDropdownProps {
    options: DropdownOption[];
    defaultValue?: string;
    buttonClassName?: string;
    contentClassName?: string;
    onValueChange?: (value: string) => void;
}

// Helper type for grouping
interface GroupedOptions {
    groupName: string;
    items: DropdownOption[];
}

const AppDropdown = ({
    options,
    defaultValue = options[0]?.value || '',
    buttonClassName = 'max-h-[20px] font-semibold text-lg',
    contentClassName = 'w-44',
    onValueChange,
}: AppDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleValueChange = (value: string) => {
        setSelectedValue(value);
        if (onValueChange) {
            onValueChange(value);
        }
    };

    const selectedLabel =
        options.find(option => option.value === selectedValue)?.label ??
        selectedValue;

    // Grouping logic
    const groupedOptions = options.reduce<GroupedOptions[]>((acc, option) => {
        const existingGroup = acc.find(g => g.groupName === option.group);
        if (existingGroup) {
            existingGroup.items.push(option);
        } else {
            acc.push({ groupName: option.group, items: [option] });
        }
        return acc;
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        'dark:hover:text-[var(--brand-color)] transition-colors! duration-300 ease-in-out',
                        buttonClassName
                    )}
                >
                    Sort by: <p className={'font-semibold'}>{selectedLabel}</p>
                    <ChevronsUpDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={cn(contentClassName, 'bg-brand-dropdown')}
            >
                <DropdownMenuRadioGroup
                    value={selectedValue}
                    onValueChange={handleValueChange}
                >
                    {groupedOptions.map(group => (
                        <div key={group.groupName}>
                            {/* Group Label */}
                            <DropdownMenuLabel className="text-xs font-semibold text-brand-dropdown-title">
                                {group.groupName}
                            </DropdownMenuLabel>

                            {/* Render group items */}
                            {group.items.map(option => (
                                <DropdownMenuRadioItem
                                    key={option.value}
                                    value={option.value}
                                    className='text-muted-foreground dark:hover:text-[var(--brand-color)] dark:hover:bg-transparent cursor-pointer transition-colors! duration-200 ease-in-out dark:[&[aria-checked="true"]]:text-[var(--brand-color)] [&[aria-checked="true"]]:font-semibold hover:font-semibold hover:bg-[var(--brand-grey)] [&[aria-checked="true"]]:text-black'
                                >
                                    {option.icon && (
                                        <option.icon
                                            className={`mr-2 h-4 w-4 ${option.iconColor || ''}`}
                                        />
                                    )}
                                    {option.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </div>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AppDropdown;
