'use client';
import { useI18n } from '@/context/i18n/context';
import { AppTabs, TabItem } from '@/components/app-tabs';
import React, { useState, useEffect, useCallback, use } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import { FloatingLabelInput } from '@/components/ui/floating-input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppDropdown, { DropdownOption } from '@/components/app-dropdown';
import { cn } from '@/lib/utils';
import { calculateAdjustedHeight } from '@/utils/height-utils';
import { useDebounce } from '@uidotdev/usehooks';
import { useTheme } from 'next-themes';
import { Separator } from '@/components/ui/separator';
import AppTooltips from '@/components/app-tooltips';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { T } from '@/components/app-translate';

interface ToolConfig {
    key: string;
    viSrc: string;
    enSrc: string;
    groups?: Pick<ToolConfig, 'enSrc' | 'viSrc'>[];
}

interface Group {
    key: string;
    items: ToolConfig[];
}

interface PageProps {
    searchParams: {
        tab?: string;
    };
}

const toolConfigs: Group[] = [
    {
        key: 'currencyConverterCalc & pipCalculator',
        items: [
            {
                key: 'currencyConverterCalc',
                viSrc: 'https://wise.com/gb/currency-converter/fx-widget/converter?sourceCurrency=USD&targetCurrency=VND&amount=1',
                enSrc: 'https://wise.com/gb/currency-converter/fx-widget/converter?sourceCurrency=USD&targetCurrency=VND&amount=1',
                groups: [
                    {
                        viSrc: 'https://wise.com/gb/currency-converter/fx-widget/chart?sourceCurrency=USD&targetCurrency=VND',
                        enSrc: 'https://wise.com/gb/currency-converter/fx-widget/chart?sourceCurrency=USD&targetCurrency=VND',
                    },
                ],
            },
            {
                key: 'pipCalculator',
                viSrc: 'https://ssltools.investing.com/pip-calculator/?force_lang=52&with_powered_by=true',
                enSrc: 'https://ssltools.investing.com/pip-calculator/?force_lang=1&with_powered_by=true',
            },
        ],
    },
    {
        key: 'profitCalculator & pivotalCalculator',
        items: [
            {
                key: 'profitCalculator',
                viSrc: 'https://ssltools.investing.com/profit-calculator/?force_lang=52&with_powered_by=true',
                enSrc: 'https://ssltools.investing.com/profit-calculator/?force_lang=1&with_powered_by=true',
            },
            {
                key: 'pivotalCalculator',
                viSrc: 'https://ssltools.investing.com/pivot-calculator/?force_lang=52&with_powered_by=true',
                enSrc: 'https://ssltools.investing.com/pivot-calculator/?force_lang=1&with_powered_by=true',
            },
        ],
    },
    {
        key: 'fiboCalculator & marginCalculator',
        items: [
            {
                key: 'fiboCalculator',
                viSrc: 'https://ssltools.investing.com/fibonacci-calculator/?force_lang=52&with_powered_by=true',
                enSrc: 'https://ssltools.investing.com/fibonacci-calculator/?force_lang=1&with_powered_by=true',
            },
            {
                key: 'marginCalculator',
                viSrc: 'https://ssltools.investing.com/margin-calculator/?force_lang=52&with_powered_by=true',
                enSrc: 'https://ssltools.investing.com/margin-calculator/?force_lang=1&with_powered_by=true',
            },
        ],
    },
];

function ToolContent({
    toolKey,
    src,
    idx,
}: {
    toolKey: string;
    src: ToolConfig;
    idx: number;
}) {
    const { t, locale } = useI18n();

    const processHeight = () => {
        switch (src.key) {
            case 'currencyConverterCalc':
                return calculateAdjustedHeight() - 120;
            case 'pipCalculator':
                return calculateAdjustedHeight() + 40;
            case 'profitCalculator':
                return calculateAdjustedHeight() - 120;
            case 'pivotalCalculator':
                return calculateAdjustedHeight() - 60;
            case 'fiboCalculator':
                return calculateAdjustedHeight() - 20;
            case 'marginCalculator':
                return calculateAdjustedHeight() - 220;
        }
    };

    const processWidth = () => {
        switch (src.key) {
            case 'currencyConverterCalc':
                return 320;
            case 'pipCalculator':
                return 570;
            case 'profitCalculator':
                return 450;
            case 'pivotalCalculator':
                return 570;
            case 'fiboCalculator':
                return 570;
            case 'marginCalculator':
                return 450;
        }
    };

    return (
        <div
            key={src.key + locale + idx}
            className={cn('w-fit flex flex-col gap-2 items-center')}
        >
            {src.groups ? (
                <div className="flex gap-2">
                    <iframe
                        height={processHeight() ?? 600 - 20}
                        width={processWidth()}
                        src={locale === 'vi' ? src.viSrc : src.enSrc}
                        className={cn(
                            'w-fit flex max-h-[43.75rem] items-center justify-center dark:bg-white',
                            `w-${processWidth()}`
                        )}
                    />
                    {src.groups.map((item, idx) => (
                        <iframe
                            height={processHeight() ?? 600 - 20}
                            width={processWidth()}
                            src={locale === 'vi' ? item.viSrc : item.enSrc}
                            className={cn(
                                'w-fit flex max-h-[43.75rem] items-center justify-center dark:bg-white',
                                `w-${processWidth()}`
                            )}
                            key={`${src.key}-group-${idx}`}
                        />
                    ))}
                </div>
            ) : (
                <iframe
                    height={processHeight() ?? 600 - 20}
                    width={processWidth()}
                    src={locale === 'vi' ? src.viSrc : src.enSrc}
                    className={cn(
                        'w-fit flex max-h-[43.75rem] items-center justify-center dark:bg-white',
                        `w-${processWidth()}`
                    )}
                />
            )}
            <p className="text-sm text-center max-w-[24rem] text-wrap">
                {t(
                    `investors.items.toolForInvestor.items.${toolKey}.description`
                )}
            </p>
        </div>
    );
}

function InterestCalculator() {
    const { locale } = useI18n();
    const { theme } = useTheme();
    const [calculationType, setCalculationType] = useState<
        'simple' | 'compound' | 'monteCarlo'
    >('simple');
    const [timeUnit, setTimeUnit] = useState<'year' | 'month' | 'day'>('month');
    const [timeValue, setTimeValue] = useState<number>(12);
    const [initialCapital, setInitialCapital] = useState<number>(1000);
    const [growthRate, setGrowthRate] = useState<number>(10);
    const [growthUnit, setGrowthUnit] = useState<'year' | 'month' | 'day'>(
        'year'
    );
    const [volatility, setVolatility] = useState<number>(15);
    const [simulations, setSimulations] = useState<number>(1000);

    const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            trailingZeroDisplay: 'stripIfInteger',
        });
    };

    const [initialCapitalInput, setInitialCapitalInput] = useState<string>(
        formatNumber(1000)
    );
    const [growthRateInput, setGrowthRateInput] = useState<string>(
        formatNumber(10)
    );
    const [timeValueInput, setTimeValueInput] = useState(formatNumber(12));
    const [volatilityInput, setVolatilityInput] = useState<string>(
        formatNumber(15)
    );
    const [simulationsInput, setSimulationsInput] = useState<string>(
        formatNumber(1000)
    );

    // Generate data for chart
    // Generate data for chart
    const generateChartData = useCallback(() => {
        const data = [];

        // Determine the number of growthUnit periods per year
        let growthUnitPerYear = 1;
        if (growthUnit === 'month') {
            growthUnitPerYear = 12;
        } else if (growthUnit === 'day') {
            growthUnitPerYear = 365; // Or 365.25 for leap years
        }

        // The rate provided by the user is already per growthUnit
        const ratePerGrowthUnit = growthRate / 100;

        // Determine the number of timeUnit periods per year
        let timeUnitPerYear = 1;
        if (timeUnit === 'month') {
            timeUnitPerYear = 12;
        } else if (timeUnit === 'day') {
            timeUnitPerYear = 365; // Or 365.25 for leap years
        }

        // Determine the number of growthUnit periods per one timeUnit period
        const growthUnitsPerTimeUnit = growthUnitPerYear / timeUnitPerYear;

        // Determine the rate per timeUnit period (for compound/monte carlo)
        // This is the effective rate that represents the growthUnit rate applied for the duration of one timeUnit
        // For example, if growthUnit is 'month' (rate 1%) and timeUnit is 'year', this rate would represent the
        // cumulative effect of applying 1% monthly for 12 months (approximately 12.68% for 12 periods of 1%).
        // However, for simple interest, we need the rate *applied* per timeUnit based on the growthUnit rate.
        const ratePerTimeUnitForCompound =
            Math.pow(1 + ratePerGrowthUnit, growthUnitsPerTimeUnit) - 1;

        // For Simple Interest: Calculate interest earned per timeUnit based on the growthUnit rate
        // Interest per timeUnit = Principal * (rate_per_growthUnit * growthUnits_per_timeUnit)
        const simpleInterestPerTimeUnit =
            initialCapital * (ratePerGrowthUnit * growthUnitsPerTimeUnit);

        if (calculationType === 'simple') {
            // Simple interest: value = principal + (interest_per_time_unit * number_of_time_units)
            for (let i = 0; i <= timeValue; i++) {
                const value = initialCapital + simpleInterestPerTimeUnit * i;
                data.push({
                    time: i,
                    value: value,
                });
            }
        } else if (calculationType === 'compound') {
            // Compound interest: value = principal * (1 + rate_per_time_unit) ^ number_of_time_units
            // Use the effective rate calculated for the timeUnit period
            for (let i = 0; i <= timeValue; i++) {
                const value =
                    initialCapital *
                    Math.pow(1 + ratePerTimeUnitForCompound, i);
                data.push({
                    time: i,
                    value: value,
                });
            }
        } else if (calculationType === 'monteCarlo') {
            // For Monte Carlo, we need to simulate the growthUnit rate applied over the timeUnit period.
            // This involves generating random returns for each growthUnit within a timeUnit and combining them.
            // A simpler approach is to simulate the growthUnit rate for the total number of growthUnit periods
            // and then sample the result at the end of each timeUnit period.

            // Calculate volatility per growthUnit period
            const volatilityPerGrowthUnit =
                volatility / 100 / Math.sqrt(growthUnitPerYear); // Scales volatility with sqrt(time)

            const results = [];
            for (let sim = 0; sim < simulations; sim++) {
                let balance = initialCapital;
                const scenario = [{ time: 0, value: initialCapital }];

                for (
                    let timeUnitStep = 1;
                    timeUnitStep <= timeValue;
                    timeUnitStep++
                ) {
                    // Simulate for the number of growth units within this time unit step
                    for (let g = 0; g < growthUnitsPerTimeUnit; g++) {
                        const randomReturn = generateRandomNormal(
                            ratePerGrowthUnit,
                            volatilityPerGrowthUnit
                        );
                        balance = balance * (1 + randomReturn);
                    }
                    scenario.push({ time: timeUnitStep, value: balance });
                }
                results.push(scenario);
            }

            // Calculate median for each time unit point
            for (let i = 0; i <= timeValue; i++) {
                const valuesAtTime = results
                    .map(scenario => scenario[i].value)
                    .sort((a, b) => a - b);
                const medianValue =
                    valuesAtTime[Math.floor(valuesAtTime.length * 0.5)];
                data.push({
                    time: i,
                    value: medianValue,
                });
            }
        }

        if (
            timeValue === 0 ||
            initialCapital === 0 ||
            initialCapitalInput === '' ||
            timeValueInput === ''
        ) {
            return Array.from({ length: 12 }, (_, index) => ({
                time: index,
                value: index === 0 ? 0 : undefined,
            }));
        }

        return data;
    }, [
        calculationType,
        growthRate,
        growthUnit,
        initialCapital,
        initialCapitalInput,
        simulations,
        timeUnit,
        timeValue,
        timeValueInput,
        volatility,
    ]);

    // Box-Muller transform for normal distribution
    const generateRandomNormal = (mean: number, stdDev: number): number => {
        let u = 0,
            v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        const normal =
            Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return mean + stdDev * normal;
    };

    const getCalculationTypeOptions = (
        locale: 'vi' | 'en'
    ): DropdownOption[] => [
        {
            value: 'simple',
            label: locale === 'vi' ? 'Lãi Đơn' : 'Simple Interest',
        },
        {
            value: 'compound',
            label: locale === 'vi' ? 'Lãi Kép' : 'Compound Interest',
        },
        {
            value: 'monteCarlo',
            label: locale === 'vi' ? 'Monte Carlo' : 'Monte Carlo Simulation',
        },
    ];

    const getTimeUnitOptions = (locale: 'vi' | 'en'): DropdownOption[] => [
        {
            value: 'year',
            label: locale === 'vi' ? 'Năm' : 'Year',
        },
        {
            value: 'month',
            label: locale === 'vi' ? 'Tháng' : 'Month',
        },
        {
            value: 'day',
            label: locale === 'vi' ? 'Ngày' : 'Day',
        },
    ];

    const processUnitLabel = (
        unit: 'year' | 'month' | 'day',
        locale: 'vi' | 'en'
    ): string => {
        switch (unit) {
            case 'year':
                return locale === 'vi' ? 'năm' : 'year';
            case 'month':
                return locale === 'vi' ? 'tháng' : 'month';
            case 'day':
                return locale === 'vi' ? 'ngày' : 'day';
        }
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const chartData = useDebounce(generateChartData, 300) as unknown as any[];
    const height = calculateAdjustedHeight() + 80;

    const calcYAxis = () => {
        const min = Math.min(...chartData.map(d => d.value));
        const max = Math.max(...chartData.map(d => d.value));

        const yAxisStep = (max - min) / 5;
        const yAxisValues = [];

        for (let i = min; i <= max + yAxisStep; i += yAxisStep) {
            yAxisValues.push(i);
        }

        const shouldAssignAdditionalNode = yAxisValues.length === 6;

        if (yAxisValues.length === 0) {
            return [0, 100];
        }

        return shouldAssignAdditionalNode
            ? [...yAxisValues, yAxisValues[yAxisValues.length - 1] + yAxisStep]
            : yAxisValues;
    };

    useEffect(() => {
        setInitialCapitalInput(formatNumber(initialCapital));
    }, [initialCapital]);

    useEffect(() => {
        setGrowthRateInput(formatNumber(growthRate));
    }, [growthRate]);

    useEffect(() => {
        setTimeValueInput(formatNumber(timeValue));
    }, [timeValue]);

    useEffect(() => {
        setVolatilityInput(formatNumber(volatility));
    }, [volatility]);

    useEffect(() => {
        setSimulationsInput(formatNumber(simulations));
    }, [simulations]);

    return (
        <div
            className="flex flex-col md:flex-row gap-2"
            style={{ height: `${height}px` }}
        >
            {/* Left Panel - Controls */}
            <div className="w-full md:w-1/6">
                <Card className={'bg-transparent dark:bg-transparent h-full'}>
                    <CardHeader>
                        <div className="text-brand-text rounded-md">
                            <AppDropdown
                                options={getCalculationTypeOptions(
                                    locale as 'vi' | 'en'
                                )}
                                value={calculationType}
                                onValueChange={(value: string) =>
                                    setCalculationType(
                                        value as
                                            | 'simple'
                                            | 'compound'
                                            | 'monteCarlo'
                                    )
                                }
                                labelVisible={false}
                                buttonClassName="w-fit px-0! justify-between"
                                contentClassName="w-full!"
                                shouldSelectedValueHighlight
                            />
                            <p className="text-sm">
                                {calculationType === 'simple'
                                    ? locale === 'vi'
                                        ? 'Lãi được tính trên vốn gốc ban đầu, không cộng dồn.'
                                        : 'Interest is calculated on the initial principal only.'
                                    : calculationType === 'compound'
                                      ? locale === 'vi'
                                          ? 'Lãi được tính trên cả vốn gốc và lãi tích lũy.'
                                          : 'Interest is calculated on both principal and accumulated interest.'
                                      : locale === 'vi'
                                        ? 'Mô phỏng nhiều kịch bản dựa trên xác suất.'
                                        : 'Simulates multiple scenarios based on probability.'}
                            </p>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="space-y-6">
                        <div className="w-full relative items-center">
                            <FloatingLabelInput
                                type="text"
                                label={locale === 'vi' ? 'Kỳ Hạn' : 'Term'}
                                value={timeValueInput}
                                onChange={e => {
                                    const rawValue = e.target.value;
                                    const sanitizedValue = rawValue.replace(
                                        /[^\d\.\,\-]/g,
                                        ''
                                    );
                                    setTimeValueInput(sanitizedValue);

                                    const numericString = rawValue.replace(
                                        /,/g,
                                        ''
                                    );

                                    if (
                                        numericString === '' ||
                                        (/^\d*\.?\d*$/.test(numericString) &&
                                            numericString !== '.')
                                    ) {
                                        if (numericString !== '') {
                                            let parsedValue =
                                                Number(numericString);
                                            parsedValue = Math.min(
                                                Math.max(0, parsedValue),
                                                60
                                            );
                                            if (!isNaN(parsedValue)) {
                                                setTimeValue(parsedValue);
                                            }
                                        }
                                    }
                                }}
                                className="app-text-input pr-10"
                            />
                            <AppDropdown
                                options={getTimeUnitOptions(
                                    locale as 'vi' | 'en'
                                )}
                                value={timeUnit}
                                onValueChange={(value: string) =>
                                    setTimeUnit(
                                        value as 'year' | 'month' | 'day'
                                    )
                                }
                                labelVisible={false}
                                buttonClassName="w-fit justify-between absolute right-5 bottom-1/2 transform translate-y-1/2"
                                contentClassName="w-full!"
                            />
                            <AppTooltips
                                contents={
                                    <div className="max-w-[24rem] flex flex-col gap-2">
                                        {locale === 'vi' ? (
                                            <p>Giới hạn hiển thị: 60</p>
                                        ) : (
                                            <p>Display limit: 60</p>
                                        )}
                                    </div>
                                }
                                trigger={
                                    <Button
                                        variant="ghost"
                                        className={
                                            'dark:hover:bg-transparent absolute' +
                                            ' right-0 bottom-1/2 transform translate-y-1/2' +
                                            ' dark:hover:text-[var(--brand-color)]'
                                        }
                                    >
                                        <Info className="size-3" />
                                    </Button>
                                }
                            />
                        </div>

                        <div className={'relative'}>
                            <FloatingLabelInput
                                type="text"
                                inputMode="decimal"
                                label={
                                    locale === 'vi'
                                        ? 'Vốn Đầu Tư Ban Đầu'
                                        : 'Starting Equity'
                                }
                                value={initialCapitalInput}
                                onChange={e => {
                                    const rawValue = e.target.value;
                                    const sanitizedValue = rawValue.replace(
                                        /[^\d\.\,\-]/g,
                                        ''
                                    );

                                    setInitialCapitalInput(sanitizedValue);

                                    const numericString = rawValue.replace(
                                        /,/g,
                                        ''
                                    );

                                    if (
                                        numericString === '' ||
                                        (/^\d*\.?\d*$/.test(numericString) &&
                                            numericString !== '.')
                                    ) {
                                        if (numericString !== '') {
                                            const parsedValue =
                                                Number(numericString);
                                            const valueInRange = Math.min(
                                                Math.max(0, parsedValue),
                                                1000000000
                                            );
                                            if (!isNaN(valueInRange)) {
                                                setInitialCapital(valueInRange);
                                            }
                                        }
                                    }
                                }}
                                className="app-text-input pr-10"
                            />
                            <AppTooltips
                                contents={
                                    <div className="max-w-[24rem] flex flex-col gap-2">
                                        {locale === 'vi' ? (
                                            <p>Giới hạn: 1,000,000,000</p>
                                        ) : (
                                            <p>Limit: 1,000,000,000</p>
                                        )}
                                    </div>
                                }
                                trigger={
                                    <Button
                                        variant="ghost"
                                        className={
                                            'dark:hover:bg-transparent absolute' +
                                            ' right-0 bottom-1/2 transform translate-y-1/2' +
                                            ' dark:hover:text-[var(--brand-color)]'
                                        }
                                    >
                                        <Info className="size-3" />
                                    </Button>
                                }
                            />
                        </div>

                        <div className={'relative'}>
                            <FloatingLabelInput
                                type="text"
                                inputMode="decimal"
                                label={
                                    locale === 'vi'
                                        ? `Lãi Suất (%/${processUnitLabel(growthUnit, 'vi')})`
                                        : `Growth Rate (%/${processUnitLabel(growthUnit, 'en')})`
                                }
                                value={growthRateInput}
                                onChange={e => {
                                    const rawValue = e.target.value;
                                    const sanitizedValue = rawValue.replace(
                                        /[^\d\.\,\-]/g,
                                        ''
                                    );
                                    setGrowthRateInput(sanitizedValue);

                                    const numericString = rawValue.replace(
                                        /,/g,
                                        ''
                                    );

                                    if (
                                        numericString === '' ||
                                        (/^\d*\.?\d*$/.test(numericString) &&
                                            numericString !== '.')
                                    ) {
                                        if (numericString !== '') {
                                            const parsedValue =
                                                Number(numericString);
                                            if (!isNaN(parsedValue)) {
                                                setGrowthRate(parsedValue);
                                            }
                                        }
                                    }
                                }}
                                className="app-text-input pr-10"
                            />

                            <AppDropdown
                                options={getTimeUnitOptions(
                                    locale as 'vi' | 'en'
                                )}
                                value={growthUnit}
                                onValueChange={(value: string) =>
                                    setGrowthUnit(
                                        value as 'year' | 'month' | 'day'
                                    )
                                }
                                labelVisible={false}
                                buttonClassName="w-fit justify-between absolute right-1 bottom-1/2 transform translate-y-1/2"
                                contentClassName="w-full!"
                            />
                        </div>

                        {calculationType === 'monteCarlo' && (
                            <>
                                <div>
                                    <FloatingLabelInput
                                        type="text"
                                        label={
                                            locale === 'vi'
                                                ? 'Độ biến động (%):'
                                                : 'Volatility (%):'
                                        }
                                        value={volatilityInput}
                                        onChange={e => {
                                            const rawValue = e.target.value;
                                            const sanitizedValue =
                                                rawValue.replace(
                                                    /[^\d\.\,\-]/g,
                                                    ''
                                                );
                                            setVolatilityInput(sanitizedValue);

                                            const numericString =
                                                rawValue.replace(/,/g, '');

                                            if (
                                                numericString === '' ||
                                                (/^\d*\.?\d*$/.test(
                                                    numericString
                                                ) &&
                                                    numericString !== '.')
                                            ) {
                                                if (numericString !== '') {
                                                    const parsedValue =
                                                        Number(numericString);
                                                    if (!isNaN(parsedValue)) {
                                                        setVolatility(
                                                            parsedValue
                                                        );
                                                    }
                                                }
                                            }
                                        }}
                                        className="app-text-input pr-10"
                                    />
                                </div>

                                <div>
                                    <FloatingLabelInput
                                        type="text"
                                        label={
                                            locale === 'vi'
                                                ? 'Số lần mô phỏng:'
                                                : 'Number of Simulations:'
                                        }
                                        value={simulationsInput}
                                        onChange={e => {
                                            const rawValue = e.target.value;
                                            const sanitizedValue =
                                                rawValue.replace(
                                                    /[^\d\.\,\-]/g,
                                                    ''
                                                );
                                            setSimulationsInput(sanitizedValue);

                                            const numericString =
                                                rawValue.replace(/,/g, '');

                                            if (
                                                numericString === '' ||
                                                (/^\d*\.?\d*$/.test(
                                                    numericString
                                                ) &&
                                                    numericString !== '.')
                                            ) {
                                                if (numericString !== '') {
                                                    const parsedValue =
                                                        Number(numericString);
                                                    if (!isNaN(parsedValue)) {
                                                        setSimulations(
                                                            parsedValue
                                                        );
                                                    }
                                                }
                                            }
                                        }}
                                        min="10"
                                        max="10000"
                                        className="app-text-input pr-10"
                                    />
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Right Panel - Chart */}
            <div className="w-full h-full md:flex-1">
                <Card className={'bg-transparent dark:bg-transparent'}>
                    <CardHeader>
                        <CardTitle>
                            {locale === 'vi'
                                ? 'Biểu Đồ Dự Báo Đầu Tư'
                                : 'Investment Projection Chart'}
                        </CardTitle>
                        <CardDescription>
                            {locale === 'vi'
                                ? 'Dự báo giá trị đầu tư theo thời gian'
                                : 'Projected investment value over time'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div style={{ height: `${height - 200}px` }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        stroke={'#92929270'}
                                        strokeDasharray="2 2"
                                    />
                                    <XAxis
                                        dataKey="time"
                                        label={{
                                            value:
                                                timeUnit === 'year'
                                                    ? locale === 'vi'
                                                        ? 'Năm'
                                                        : 'Year'
                                                    : timeUnit === 'month'
                                                      ? locale === 'vi'
                                                          ? 'Tháng'
                                                          : 'Month'
                                                      : locale === 'vi'
                                                        ? 'Ngày'
                                                        : 'Day',
                                            position: 'insideBottomRight',
                                            offset: -5,
                                            style: {
                                                fontWeight: 'bold',
                                            },
                                        }}
                                    />
                                    <YAxis
                                        allowDataOverflow
                                        label={{
                                            value:
                                                locale === 'vi'
                                                    ? 'Vốn Đầu Tư'
                                                    : 'Equity',
                                            angle: -90,
                                            offset: 15,
                                            position: 'left',
                                            style: {
                                                textAnchor: 'middle',
                                                fontWeight: 'bold',
                                            },
                                        }}
                                        ticks={calcYAxis()}
                                        tickFormatter={value => {
                                            const K = 1000;
                                            const M = 1000000;
                                            const G = 1000000000;

                                            if (Math.abs(value) >= G) {
                                                let formattedNum = (
                                                    value / G
                                                ).toFixed(2);
                                                if (
                                                    formattedNum.endsWith('.0')
                                                ) {
                                                    formattedNum =
                                                        formattedNum.slice(
                                                            0,
                                                            -2
                                                        );
                                                }
                                                return `$${formattedNum}G`;
                                            } else if (Math.abs(value) >= M) {
                                                // Format in millions (e.g., 0.2M, 2M, 10M)
                                                let formattedNum = (
                                                    value / M
                                                ).toFixed(2);
                                                if (
                                                    formattedNum.endsWith('.0')
                                                ) {
                                                    formattedNum =
                                                        formattedNum.slice(
                                                            0,
                                                            -2
                                                        ); // Remove .0 for whole millions
                                                }
                                                return `$${formattedNum}M`;
                                            } else if (Math.abs(value) >= K) {
                                                // Format in thousands (e.g., 2K, 10K, 100K)
                                                let formattedNum = (
                                                    value / K
                                                ).toFixed(2);
                                                if (
                                                    formattedNum.endsWith('.0')
                                                ) {
                                                    formattedNum =
                                                        formattedNum.slice(
                                                            0,
                                                            -2
                                                        );
                                                }
                                                return `$${formattedNum}K`;
                                            } else {
                                                return `$${value.toFixed(2)}`;
                                            }
                                        }}
                                    />
                                    <Tooltip
                                        formatter={value => [
                                            `$ ${Number(value).toLocaleString('en-US')}`,
                                            locale === 'vi'
                                                ? 'Giá trị'
                                                : 'Value',
                                        ]}
                                        labelFormatter={value =>
                                            `${
                                                timeUnit === 'year'
                                                    ? locale === 'vi'
                                                        ? 'Năm'
                                                        : 'Year'
                                                    : timeUnit === 'month'
                                                      ? locale === 'vi'
                                                          ? 'Tháng'
                                                          : 'Month'
                                                      : locale === 'vi'
                                                        ? 'Ngày'
                                                        : 'Day'
                                            } ${value}`
                                        }
                                        contentStyle={{
                                            background: '#25252540',
                                            color:
                                                theme === 'dark'
                                                    ? '#FFE400'
                                                    : '#000000',
                                            borderRadius: '14px',
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={
                                            theme === 'dark'
                                                ? '#FFE400'
                                                : '#000000'
                                        }
                                        activeDot={{ r: 8 }}
                                        name={
                                            locale === 'vi'
                                                ? 'Giá Trị Tài Khoản'
                                                : 'Account Value'
                                        }
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 grid grid-cols-4 gap-4">
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi'
                                        ? 'Giá Trị Đầu Tư Ban Đầu'
                                        : 'Starting Investment'}
                                </p>
                                <p className="font-bold dark:text-[var(--brand-color)]">
                                    {initialCapitalInput ? (
                                        <>$ {formatNumber(initialCapital)}</>
                                    ) : (
                                        <T keyName={'tool.valueIsNowEmpty'} />
                                    )}
                                </p>
                            </div>
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi' ? 'Kỳ Hạn' : 'Term'}
                                </p>
                                <p className="font-bold dark:text-[var(--brand-color)]">
                                    {timeValueInput ? (
                                        <>
                                            {timeValue}{' '}
                                            {`${
                                                timeUnit === 'year'
                                                    ? locale === 'vi'
                                                        ? 'Năm'
                                                        : 'Year'
                                                    : timeUnit === 'month'
                                                      ? locale === 'vi'
                                                          ? 'Tháng'
                                                          : 'Month'
                                                      : locale === 'vi'
                                                        ? 'Ngày'
                                                        : 'Day'
                                            }${timeValue !== 1 && locale !== 'vi' ? 's' : ''}`}
                                        </>
                                    ) : (
                                        <T keyName={'tool.valueIsNowEmpty'} />
                                    )}
                                </p>
                            </div>
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi'
                                        ? 'Lãi Suất'
                                        : 'Growth Rate'}
                                </p>
                                <p className="font-bold dark:text-[var(--brand-color)]">
                                    {growthRateInput ? (
                                        <>
                                            {formatNumber(growthRate)} %/
                                            {growthUnit === 'year'
                                                ? locale === 'vi'
                                                    ? 'Năm'
                                                    : 'Year'
                                                : growthUnit === 'month'
                                                  ? locale === 'vi'
                                                      ? 'Tháng'
                                                      : 'Month'
                                                  : locale === 'vi'
                                                    ? 'Ngày'
                                                    : 'Day'}
                                        </>
                                    ) : (
                                        <T keyName={'tool.valueIsNowEmpty'} />
                                    )}
                                </p>
                            </div>
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi'
                                        ? 'Giá Trị Cuối Kỳ'
                                        : 'Final Value'}
                                </p>
                                <p className="font-bold dark:text-[var(--brand-color)]">
                                    {chartData[chartData.length - 1]?.value ? (
                                        <>
                                            ${' '}
                                            {formatNumber(
                                                chartData[chartData.length - 1]
                                                    ?.value || 0
                                            )}
                                        </>
                                    ) : (
                                        <T keyName={'tool.valueIsNowEmpty'} />
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function InvestorToolsComp({ searchParams }: PageProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { tab } = use(searchParams);
    const { t, locale } = useI18n();
    const [tabsList, setTabsList] = useState<TabItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        const newTabsList = toolConfigs.map(group => {
            const title = group.items.reduce((acc, item) => {
                return acc
                    ? acc +
                          ' & ' +
                          t(
                              `investors.items.toolForInvestor.items.${item.key}.title`
                          )
                    : t(
                          `investors.items.toolForInvestor.items.${item.key}.title`
                      );
            }, '');

            return {
                title,
                value: group.key,
                renderContent: () =>
                    Promise.resolve(
                        <div className={'flex justify-evenly gap-4'}>
                            {group.items.map((item, idx) => (
                                <ToolContent
                                    key={item.key + idx}
                                    toolKey={item.key}
                                    src={item}
                                    idx={idx}
                                />
                            ))}
                        </div>
                    ),
            };
        });

        setTabsList([
            ...newTabsList,
            {
                title: t(
                    'investors.items.toolForInvestor.items.investmentCalculator.title'
                ),
                value: 'investment interest calc',
                renderContent: () => Promise.resolve(<InterestCalculator />),
            },
        ]);
    }, [locale]);

    if (tabsList.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <AppTabs
            tabsList={tabsList}
            size={1}
            defaultValue={tab}
            onValueChange={(value: string) => {
                if (value) router.push('/chao-investors/tools?tab=' + value);
            }}
        />
    );
}
