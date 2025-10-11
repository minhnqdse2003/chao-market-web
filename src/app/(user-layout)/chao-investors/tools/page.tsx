'use client';
import { useI18n } from '@/context/i18n/context';
import { AppTabs, TabItem } from '@/components/app-tabs';
import React, { useState, useEffect, useCallback } from 'react';
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

interface ToolConfig {
    key: string;
    viSrc: string;
    enSrc: string;
}

interface Group {
    key: string;
    items: ToolConfig[];
}

const toolConfigs: Group[] = [
    {
        key: 'currencyConverterCalc & pipCalculator',
        items: [
            {
                key: 'currencyConverterCalc',
                viSrc: 'https://ssltools.investing.com/currency-converter/?from=12&to=87&force_lang=52&with_powered_by=true',
                enSrc: 'https://ssltools.investing.com/currency-converter/?from=12&to=87&force_lang=1&with_powered_by=true',
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

function ToolContent({ toolKey, src }: { toolKey: string; src: ToolConfig }) {
    const { t, locale } = useI18n();

    const processHeight = () => {
        switch (src.key) {
            case 'currencyConverterCalc':
                return 400;
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
                return 216;
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
            key={src.key + locale}
            className={'w-full flex flex-col gap-2 items-center'}
        >
            <iframe
                height={processHeight() ?? 600 - 20}
                width={processWidth()}
                src={locale === 'vi' ? src.viSrc : src.enSrc}
                className={cn(
                    'w-fit flex max-h-[43.75rem] items-center justify-center dark:bg-white',
                    `w-${processWidth()}`
                )}
            />
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

    const setFormatNumber = (num: string): number => {
        return Number(num.replace(/,/g, ''));
    };

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

        if (timeValue === 0) return [];

        return data;
    }, [
        calculationType,
        growthRate,
        growthUnit,
        initialCapital,
        simulations,
        timeUnit,
        timeValue,
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
                                type="number"
                                label={locale === 'vi' ? 'Kỳ Hạn' : 'Term'}
                                value={timeValue}
                                onChange={e => {
                                    const value = Number(e.target.value);
                                    const clampedValue = Math.min(
                                        Math.max(value, 0),
                                        60
                                    );
                                    setTimeValue(clampedValue);
                                }}
                                min={0}
                                max={30}
                                maxLength={2}
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
                                buttonClassName="w-fit justify-between absolute right-1 bottom-1/2 transform translate-y-1/2"
                                contentClassName="w-full!"
                            />
                        </div>

                        <div className={'relative'}>
                            <FloatingLabelInput
                                type="number"
                                label={
                                    locale === 'vi'
                                        ? 'Vốn đầu tư ban đầu'
                                        : 'Starting Equity'
                                }
                                value={initialCapital}
                                onChange={e =>
                                    setInitialCapital(
                                        setFormatNumber(e.target.value)
                                    )
                                }
                                className="app-text-input pr-10 text-transparent caret-transparent"
                            />
                            <p
                                className={
                                    'absolute left-3 top-1/2 transform -translate-y-1/2 bg-sidebar'
                                }
                            >
                                {formatNumber(initialCapital)}
                            </p>
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
                                type="number"
                                label={
                                    locale === 'vi'
                                        ? `Lãi suất (%/${processUnitLabel(growthUnit, 'vi')})`
                                        : `Growth Rate (%/${processUnitLabel(growthUnit, 'en')})`
                                }
                                value={growthRate}
                                onChange={e =>
                                    setGrowthRate(Number(e.target.value))
                                }
                                min="1"
                                step="0.1"
                                className="app-text-input pr-10 text-transparent caret-transparent"
                            />

                            <p
                                className={
                                    'absolute left-3 top-1/2 transform -translate-y-1/2 bg-sidebar'
                                }
                            >
                                {formatNumber(growthRate)}
                            </p>

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
                                        type="number"
                                        label={
                                            locale === 'vi'
                                                ? 'Độ biến động (%):'
                                                : 'Volatility (%):'
                                        }
                                        value={volatility}
                                        onChange={e =>
                                            setVolatility(
                                                Number(e.target.value)
                                            )
                                        }
                                        min="0"
                                        step="0.1"
                                        className="app-text-input pr-10"
                                    />
                                </div>

                                <div>
                                    <FloatingLabelInput
                                        type="number"
                                        label={
                                            locale === 'vi'
                                                ? 'Số lần mô phỏng:'
                                                : 'Number of Simulations:'
                                        }
                                        value={simulations}
                                        onChange={e =>
                                            setSimulations(
                                                Number(e.target.value)
                                            )
                                        }
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
                                ? 'Biểu đồ dự báo đầu tư'
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
                                        strokeDasharray="3 3"
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
                                        }}
                                    />
                                    <YAxis
                                        tickFormatter={value =>
                                            `$${(value / 1000).toFixed(2)}K`
                                        }
                                    />
                                    <Tooltip
                                        formatter={value => [
                                            `$ ${Number(value).toLocaleString('en-US')}`,
                                            'Value',
                                        ]}
                                        labelFormatter={value =>
                                            `${timeUnit === 'year' ? 'Year' : timeUnit === 'month' ? 'Month' : 'Day'} ${value}`
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
                                                ? 'Giá trị tài khoản'
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
                                        ? 'Giá trị đầu tư ban đầu'
                                        : 'Starting Investment'}
                                </p>
                                <p className="font-bold dark:text-[var(--brand-color)]">
                                    $ {formatNumber(initialCapital)}
                                </p>
                            </div>
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi' ? 'Kỳ Hạn' : 'Term'}
                                </p>
                                <p className="font-bold dark:text-[var(--brand-color)]">
                                    {timeValue}{' '}
                                    {`${timeUnit}${timeValue !== 1 ? 's' : ''}`}
                                </p>
                            </div>
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi'
                                        ? 'Lãi Suất'
                                        : 'Growth Rate'}
                                </p>
                                <p className="font-bold dark:text-[var(--brand-color)]">
                                    {growthRate} %/{growthUnit}
                                </p>
                            </div>
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi'
                                        ? 'Giá trị cuối kỳ'
                                        : 'Final Value'}
                                </p>
                                <p className="font-bold dark:text-[var(--brand-color)]">
                                    ${' '}
                                    {formatNumber(
                                        chartData[chartData.length - 1]
                                            ?.value || 0
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

export default function InvestorToolsComp() {
    const { t, locale } = useI18n();
    const [tabsList, setTabsList] = useState<TabItem[]>([]);

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
                        <div className={'flex gap-4'}>
                            {group.items.map(item => (
                                <ToolContent
                                    key={item.key}
                                    toolKey={item.key}
                                    src={item}
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

    return <AppTabs tabsList={tabsList} size={1} />;
}
