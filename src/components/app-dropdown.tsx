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

// 1. Interface updated to make 'group' optional
export interface DropdownOption {
    value: string;
    label: string;
    icon?: LucideIcon;
    iconColor?: string;
    group?: string;
}

interface AppDropdownProps {
    options: DropdownOption[];
    defaultValue?: string;
    value?: string; // Added to support controlled component behavior
    buttonClassName?: string;
    contentClassName?: string;
    onValueChange?: (value: string) => void;
    labelVisible?: boolean;
    shouldSelectedValueHighlight?: boolean;
}

// Helper type for grouping
interface GroupedOptions {
    groupName: string;
    items: DropdownOption[];
}

// A unique key to identify items that don't have a group.
const UNGROUPED_KEY = '$$__NO_GROUP__$$';

const AppDropdown = ({
    options,
    defaultValue,
    value, // Use 'value' prop for controlled state
    buttonClassName = 'max-h-[20px] font-semibold text-lg',
    contentClassName = 'w-44',
    onValueChange,
    labelVisible = true,
    shouldSelectedValueHighlight = false,
}: AppDropdownProps) => {
    // Determine the initial value: controlled 'value' > 'defaultValue' > first option
    const initialValue = value ?? defaultValue ?? options[0]?.value ?? '';
    const [internalValue, setInternalValue] = useState(initialValue);

    // If 'value' prop is provided, it's a controlled component.
    // Otherwise, it's an uncontrolled component using its internal state.
    const selectedValue = value !== undefined ? value : internalValue;

    const handleValueChange = (newValue: string) => {
        // Update internal state only if it's an uncontrolled component
        if (value === undefined) {
            setInternalValue(newValue);
        }
        // Always call the external handler if it exists
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    const selectedLabel =
        options.find(option => option.value === selectedValue)?.label ??
        selectedValue;

    // 2. Updated Grouping Logic
    const groupedOptions = options.reduce<GroupedOptions[]>((acc, option) => {
        // Use the UNGROUPED_KEY if option.group is undefined or null
        const groupName = option.group ?? UNGROUPED_KEY;

        const existingGroup = acc.find(g => g.groupName === groupName);

        if (existingGroup) {
            existingGroup.items.push(option);
        } else {
            acc.push({ groupName, items: [option] });
        }
        return acc;
    }, []);

    // Optional: Sort to bring ungrouped items to the top
    groupedOptions.sort((a, b) => {
        if (a.groupName === UNGROUPED_KEY) return -1; // a (ungrouped) comes first
        if (b.groupName === UNGROUPED_KEY) return 1; // b (ungrouped) comes first
        return a.groupName.localeCompare(b.groupName); // Alphabetical sort for other groups
    });

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
                    {labelVisible && 'Sort by: '}
                    <p
                        className={cn(
                            'font-semibold',
                            `${shouldSelectedValueHighlight && 'dark:text-[var(--brand-color)]'}`
                        )}
                    >
                        {selectedLabel}
                    </p>
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
                            {/* 3. Conditionally render the group label */}
                            {group.groupName !== UNGROUPED_KEY && (
                                <DropdownMenuLabel className="text-xs font-semibold text-brand-dropdown-title">
                                    {group.groupName}
                                </DropdownMenuLabel>
                            )}

                            {/* Render group items (this part remains the same) */}
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
