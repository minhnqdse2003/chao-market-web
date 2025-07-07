'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronsUpDown, LucideIcon } from 'lucide-react';
import { useState } from 'react';

export interface DropdownOption {
    value: string;
    label: string;
    icon?: LucideIcon;
    iconColor?: string;
}

interface AppDropdownProps {
    label?: string;
    options: DropdownOption[];
    defaultValue?: string;
    buttonClassName?: string;
    contentClassName?: string;
    onValueChange?: (value: string) => void;
}

const AppDropdown = ({
    label = 'Select Option',
    options,
    defaultValue = options[0]?.value || '',
    buttonClassName = 'max-h-[20px] font-light text-xs',
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

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={buttonClassName}>
                    Sort by:{' '}
                    <strong className="font-bold">{selectedLabel}</strong>
                    <ChevronsUpDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={contentClassName}>
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={selectedValue}
                    onValueChange={handleValueChange}
                >
                    {options.map(option => (
                        <DropdownMenuRadioItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.icon && (
                                <option.icon
                                    className={`mr-2 h-4 w-4 ${option.iconColor || ''}`}
                                />
                            )}

                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AppDropdown;
