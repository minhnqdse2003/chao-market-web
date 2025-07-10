import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type AppFilterOptionsType = {
    name: string;
    value: string;
};

export type FilterSelectType = 'tab' | 'radio';

export default function AppFilterSelect({
    options,
    label,
    onChange,
    valueOptions,
    type = 'tab',
}: Readonly<{
    options: AppFilterOptionsType[];
    label: string;
    valueOptions?: string;
    onChange: (value: string) => void;
    type?: FilterSelectType;
}>) {
    // Filter with tab
    if (type === 'tab') {
        return (
            <Tabs
                defaultValue={options[0].value}
                className="max-w-xs w-full"
                value={valueOptions}
                onValueChange={value => onChange(value)}
            >
                <p className="text-sm">{label}</p>
                <TabsList className="p-0 h-auto bg-background gap-1">
                    {options.map(tab => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="border px-4 py-2 rounded-2xl border-transparent data-[state=active]:border-[var(--brand-color)] data-[state=active]:text-[var(--brand-color)] dark:data-[state=active]:border-[var(--brand-color)] dark:data-[state=active]:text-[var(--brand-color)]"
                        >
                            <p className="text-xs font-light">{tab.name}</p>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        );
    }

    // Filter with radio group
    if (type === 'radio') {
        return (
            <div className="max-w-xs w-full">
                <p className="text-sm mb-2">{label}</p>
                <RadioGroup
                    defaultValue={options[0]?.value}
                    onValueChange={value => onChange(value)}
                    className="flex flex-col gap-2"
                    value={valueOptions}
                >
                    {options.map(option => (
                        <div
                            key={option.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                className="dark:data-[state=checked]:border-[var(--brand-color)] [&_*_svg]:fill-[var(--brand-color)] [&_*_svg]:stroke-[var(--brand-color)]"
                            />
                            <Label
                                htmlFor={option.value}
                                className="text-xs font-light"
                            >
                                {option.name}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        );
    }
}
