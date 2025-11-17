'use client';

import { useI18n } from '@/context/i18n/context';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import AppDropdown, { DropdownOption } from '@/components/app-dropdown';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppTooltips from '@/components/app-tooltips';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import React, { useState, useEffect, useMemo, ReactNode } from 'react';
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
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { calculateAdjustedHeight } from '@/utils/height-utils';
import { useDebounce } from '@uidotdev/usehooks';
import { BsDash } from 'react-icons/bs';
import { AiOutlineDash } from 'react-icons/ai';

const LossRecoveryCalculator: React.FC = () => {
    const { locale, t } = useI18n();
    const { theme } = useTheme();
    const height = calculateAdjustedHeight() + 80;

    // === INPUTS ===
    const [initialPortfolio, setInitialPortfolio] = useState<number>(10000);
    const [lossInputValue, setLossInputValue] = useState<number>(50);
    const [lossInputMode, setLossInputMode] = useState<'percent' | 'amount'>(
        'percent'
    );
    const [expectedReturnRate, setExpectedReturnRate] = useState<number>(10); // % per period
    const [returnRateUnit, setReturnRateUnit] = useState<
        'year' | 'month' | 'day'
    >('year');

    // === FORMATTED INPUTS ===
    const [initialPortfolioInput, setInitialPortfolioInput] =
        useState<string>('10,000');
    const [lossInputValueInput, setLossInputValueInput] =
        useState<string>('50');
    const [expectedReturnRateInput, setExpectedReturnRateInput] =
        useState<string>('10');

    // === INTERNAL HELPERS ===
    const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            trailingZeroDisplay: 'stripIfInteger',
        });
    };

    // Sync format on change
    useEffect(
        () => setInitialPortfolioInput(formatNumber(initialPortfolio)),
        [initialPortfolio]
    );
    useEffect(
        () => setLossInputValueInput(formatNumber(Number(lossInputValue))),
        [lossInputValue]
    );
    useEffect(
        () => setExpectedReturnRateInput(formatNumber(expectedReturnRate)),
        [expectedReturnRate]
    );

    // Parse & clamp inputs safely
    const handleInitialPortfolioChange = (raw: string) => {
        const clean = raw.replace(/[^\d\.\-]/g, '');

        const val = Number(clean.replace(/,/g, ''));
        if (!isNaN(val) && val >= 0 && val <= 1_000_000_000) {
            setInitialPortfolioInput(clean);
            setInitialPortfolio(Math.min(val, 1_000_000_000));
        }
    };

    const handlelossInputValueInputChange = (raw: string) => {
        const clean = raw.replace(/[^\d\.\-]/g, '');

        const val = Number(clean.replace(/,/g, ''));
        if (!isNaN(val) && val >= 0 && lossInputMode === 'percent') {
            setLossInputValue(Math.min(val, 100));
            if (val <= 100) setLossInputValueInput(clean);

            return;
        }
        if (!isNaN(val) && val >= 0 && val <= initialPortfolio) {
            setLossInputValue(Math.min(val, initialPortfolio));
            setLossInputValueInput(clean);
        }
    };

    const handleReturnRateChange = (raw: string) => {
        const clean = raw.replace(/[^\d\.\-]/g, '');
        const val = Number(clean);
        if (!isNaN(val) && val >= 0) {
            setExpectedReturnRate(val);
            setExpectedReturnRateInput(clean);
        }
    };

    const getReturnUnitOptions = (locale: 'vi' | 'en'): DropdownOption[] => [
        { value: 'year', label: locale === 'vi' ? 'Năm' : 'Year' },
        { value: 'month', label: locale === 'vi' ? 'Tháng' : 'Month' },
        { value: 'day', label: locale === 'vi' ? 'Ngày' : 'Day' },
    ];

    const renderReturnRateUnit = () =>
        returnRateUnit === 'year'
            ? locale === 'vi'
                ? 'Năm'
                : 'Year'
            : returnRateUnit === 'month'
              ? locale === 'vi'
                  ? 'Tháng'
                  : 'Month'
              : locale === 'vi'
                ? 'Ngày'
                : 'Day';

    // === DERIVED VALUES (Business Logic) ===
    const lossAmount =
        lossInputMode === 'percent'
            ? (Number(lossInputValue) / 100) * initialPortfolio
            : Number(lossInputValue) || 0;

    const lossPercentOfInitial =
        lossInputMode === 'percent'
            ? Number(lossInputValue) || 0
            : (lossAmount / initialPortfolio) * 100;

    const recoveryAmountNeeded = lossAmount;

    const remainingPortfolio = Math.max(0, initialPortfolio - lossAmount);

    const recoveryReturnPercent =
        remainingPortfolio > 0
            ? (recoveryAmountNeeded / remainingPortfolio) * 100
            : 0;

    const burdenPercent = recoveryReturnPercent - lossPercentOfInitial;

    // === SIMPLE INTEREST CALCULATION (for chart) ===
    const simpleInterestPerPeriod =
        remainingPortfolio * (expectedReturnRate / 100);
    const periodsToRecoverSimple =
        simpleInterestPerPeriod > 0
            ? recoveryAmountNeeded / simpleInterestPerPeriod
            : Infinity;

    // === COMPOUND INTEREST CALCULATION (for chart) ===
    const periodsToBreakEven = () => {
        const r = expectedReturnRate / 100;
        if (
            initialPortfolio <= 0 ||
            remainingPortfolio <= 0 ||
            remainingPortfolio >= initialPortfolio ||
            r <= 0
        ) {
            return Infinity;
        }
        const ratio = initialPortfolio / remainingPortfolio;
        return Math.log(ratio) / Math.log(1 + r);
    };

    const maxPeriods = isFinite(periodsToBreakEven())
        ? Math.max(
              Math.ceil(periodsToBreakEven()) + 1,
              Math.ceil(periodsToRecoverSimple)
          )
        : 6;

    const chartData = useMemo(
        () =>
            Array.from({ length: maxPeriods + 1 }, (_, period) => {
                const simpleValue =
                    period === 0
                        ? remainingPortfolio
                        : remainingPortfolio + simpleInterestPerPeriod * period;

                const compoundValue =
                    period === 0
                        ? remainingPortfolio
                        : remainingPortfolio *
                          Math.pow(1 + expectedReturnRate / 100, period);

                return {
                    period,
                    remaining: remainingPortfolio,
                    target: initialPortfolio,
                    compound: Math.min(
                        compoundValue,
                        initialPortfolio +
                            (initialPortfolio - remainingPortfolio)
                    ),
                    simple: Math.min(
                        simpleValue,
                        initialPortfolio +
                            (initialPortfolio - remainingPortfolio)
                    ),
                };
            }) ?? [],
        [
            initialPortfolio,
            lossInputValue,
            lossInputMode,
            expectedReturnRate,
            returnRateUnit,
            maxPeriods,
        ]
    );

    const debounceChartData = useDebounce(chartData, 300);

    // Y-axis custom ticks: evenly spaced between [remaining, initial + step]
    const calcYAxis = () => {
        if (!Array.isArray(chartData) || chartData.length === 0) {
            return [0, 100];
        }

        // Extract valid numeric values for 'simple' and 'compound'
        const values = chartData
            .flatMap(d => [
                typeof d.simple === 'number' ? d.simple : NaN,
                typeof d.compound === 'number' ? d.compound : NaN,
            ])
            .filter(v => isFinite(v));

        // If no valid data, fallback
        if (values.length === 0) {
            return [0, 100];
        }

        const min = Math.min(...values);
        const max = Math.max(...values, 0);

        // Avoid zero or negative range
        if (max <= min) {
            const buffer = Math.max(1, Math.abs(min) * 0.1);
            return [min - buffer, max + buffer];
        }

        const step = (max - min) / 5;
        if (step === 0) {
            return [min - 1, max + 1]; // fallback safe range
        }

        const ticks = [];
        let current = min;

        // Prevent infinite loop: limit to 7 ticks max
        for (let i = 0; i < 7; i++) {
            ticks.push(current);
            current += step;
            if (current > max + step) break;
        }

        // Ensure last tick covers max
        if (ticks[ticks.length - 1] > max - step) {
            ticks.push(max + step);
        }

        // Remove duplicates & sort
        const uniqueTicks = [...new Set(ticks)].sort((a, b) => a - b);

        return uniqueTicks;
    };

    // === TOOLTIP CONTENTS ===
    const burdenTooltip = (
        <div className="max-w-[24rem] space-y-2 text-sm">
            <p className="font-bold">
                {locale === 'vi'
                    ? 'Tại sao có “chênh lệch hòa vốn”?'
                    : 'Why is there a "breakeven differential"?'}
            </p>
            <p>
                {locale === 'vi'
                    ? 'Khi bạn lỗ, bạn mất tiền trên vốn ban đầu. Khi gỡ lại, bạn kiếm lãi trên vốn còn lại (đã ít hơn).'
                    : 'When you incur a loss, you lose money from your initial capital. To recover, you earn profit on the reduced remaining capital.'}
            </p>
            <p className="dark:text-[var(--brand-color)] text-brand-text">
                {locale === 'vi'
                    ? '% Chênh Lệch Hòa Vốn = % Lãi Cần Hòa Vốn − % Lỗ / Danh Mục Ban Đầu'
                    : '% Breakeven Differential = % Profit Needed to Breakeven − % Loss / Initial Portfolio'}
            </p>
        </div>
    );

    const expectedReturnTooltip = (
        <div className="w-fit space-y-1 text-sm">
            <p
                dangerouslySetInnerHTML={{
                    __html:
                        locale === 'vi'
                            ? 'Lợi nhuận kỳ vọng mỗi kỳ (ngày, tháng, năm).<br/>Lợi nhuận tích lũy sẽ không tái đầu tư nếu' +
                              ' chọn' +
                              ' Lãi Đơn.'
                            : 'Expected return per period (day, month, year).<br/>Accumulated profits will not be reinvested if Simple Interest is selected.',
                }}
                className={
                    'text-nowrap leading-7 text-[var(--brand-grey-foreground)]'
                }
            />
        </div>
    );

    // === DROPDOWN OPTIONS ===
    const lossModeOptions: DropdownOption[] = [
        { value: 'percent', label: '%' },
        { value: 'amount', label: '$' },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-4 h-full">
            {/* LEFT: Controls */}
            <div className="w-full md:w-[23%]">
                <Card className="bg-transparent dark:bg-transparent h-full">
                    <CardHeader>
                        <CardTitle>
                            {locale === 'vi'
                                ? 'Thông Tin Danh Mục Đầu Tư'
                                : 'Portfolio Information'}
                        </CardTitle>
                        <CardDescription>
                            {locale === 'vi'
                                ? 'Nhập thông tin để phân tích điểm hòa vốn'
                                : 'Enter details to analyze breakeven point'}
                            .
                        </CardDescription>
                    </CardHeader>
                    <Separator className="my-2" />
                    <CardContent className="space-y-6">
                        {/* Initial Portfolio */}
                        <div className="relative">
                            <FloatingLabelInput
                                type="text"
                                label={
                                    <>
                                        {locale === 'vi'
                                            ? 'Giá Trị Danh Mục Ban Đầu'
                                            : 'Initial Portfolio Value'}{' '}
                                        ($)
                                    </>
                                }
                                value={initialPortfolioInput}
                                onChange={e =>
                                    handleInitialPortfolioChange(e.target.value)
                                }
                                className="app-text-input"
                            />
                            <AppTooltips
                                contents={
                                    <p>
                                        {locale === 'vi'
                                            ? 'Giới hạn: 1,000,000,000'
                                            : 'Limit: 1,000,000,000'}
                                    </p>
                                }
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 dark:hover:bg-transparent ${(!initialPortfolioInput || initialPortfolio === 0) && 'pointer-events-none hidden'}`}
                                    >
                                        <Info className="size-3" />
                                    </Button>
                                }
                            />
                        </div>

                        {/* Current Loss */}
                        <div className="relative">
                            <FloatingLabelInput
                                type="text"
                                label={
                                    <>
                                        {locale === 'vi'
                                            ? 'Giá Trị Lỗ Hiện Tại'
                                            : 'Current Loss'}{' '}
                                        (
                                        {lossInputMode === 'percent'
                                            ? '%'
                                            : '$'}
                                        )
                                    </>
                                }
                                value={lossInputValueInput}
                                onChange={e =>
                                    handlelossInputValueInputChange(
                                        e.target.value
                                    )
                                }
                                className="app-text-input pr-12"
                            />
                            <AppDropdown
                                options={lossModeOptions}
                                value={lossInputMode}
                                onValueChange={v =>
                                    setLossInputMode(v as 'percent' | 'amount')
                                }
                                labelVisible={false}
                                buttonClassName={
                                    'w-10 h-8 absolute right-2 top-1/2 -translate-y-1/2 bg-muted/30 hover:bg-muted' +
                                    ' text-xs' +
                                    ` ${(lossInputValue === 0 || !lossInputValueInput) && ' pointer-events-none hidden'}`
                                }
                                contentClassName="w-12"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 gap-1.5 w-full">
                            <SummaryCard
                                title={
                                    locale === 'vi'
                                        ? '% Lỗ / Danh Mục Ban Đầu'
                                        : '% Loss / Initial Portfolio'
                                }
                                value={`-${lossPercentOfInitial.toFixed(2)}%`}
                                color="text-red-500"
                            />
                            <SummaryCard
                                title={
                                    locale === 'vi'
                                        ? 'Số Tiền Lãi Cần Hòa Vốn'
                                        : 'Profit Needed to Breakeven'
                                }
                                value={`$ ${formatNumber(recoveryAmountNeeded)}`}
                                color="text-red-500"
                            />
                            <SummaryCard
                                title={
                                    locale === 'vi'
                                        ? 'Giá Trị Danh Mục Còn Lại'
                                        : 'Remaining Portfolio Value'
                                }
                                value={`$ ${formatNumber(remainingPortfolio)}`}
                                color="text-yellow-500"
                            />
                            <SummaryCard
                                title={
                                    locale === 'vi'
                                        ? '% Lãi Cần Hòa Vốn'
                                        : '% Profit Needed to Breakeven'
                                }
                                value={`${recoveryReturnPercent.toFixed(2)}%`}
                                color="text-green-500"
                            />
                            <SummaryCard
                                title={
                                    <>
                                        %{' '}
                                        {locale === 'vi'
                                            ? 'Chênh Lệch Hòa Vốn'
                                            : 'Breakeven Differential'}
                                    </>
                                }
                                value={`${burdenPercent.toFixed(2)}%`}
                                color={
                                    burdenPercent > 0
                                        ? 'text-orange-500'
                                        : 'text-gray-500'
                                }
                                tooltip={burdenTooltip}
                            />
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* RIGHT: Results + Chart */}
            <div className="w-full md:w-3/4 flex flex-col gap-4">
                {/* Chart */}
                <Card className="bg-transparent dark:bg-transparent flex-1">
                    <div
                        className={'flex gap-4 px-6 items-center max-h-[42px]'}
                    >
                        <div className={'w-fit h-fit space-y-1.5'}>
                            <CardTitle>
                                {locale === 'vi'
                                    ? 'Biểu Đồ Dự Báo Thời Gian Hòa Vốn'
                                    : 'Loss Recovery Projection'}
                            </CardTitle>
                            <CardDescription
                                className={'flex gap-2 items-center'}
                            >
                                {locale === 'vi'
                                    ? 'So sánh Lãi Đơn và Lãi Kép trong việc dự báo thời gian hòa vốn'
                                    : 'Compare Simple vs. Compound Interest for recovery'}
                                .{/* Expected Return */}
                            </CardDescription>
                        </div>
                        <div className="relative h-fit">
                            <FloatingLabelInput
                                type="text"
                                label={
                                    locale === 'vi'
                                        ? 'Lợi Nhuận Dự Kiến (%)'
                                        : 'Expected Return (%)'
                                }
                                value={expectedReturnRateInput}
                                onChange={e =>
                                    handleReturnRateChange(e.target.value)
                                }
                                className="app-text-input"
                            />
                            <AppDropdown
                                options={getReturnUnitOptions(
                                    locale as 'vi' | 'en'
                                )}
                                value={returnRateUnit}
                                onValueChange={v =>
                                    setReturnRateUnit(
                                        v as 'year' | 'month' | 'day'
                                    )
                                }
                                labelVisible={false}
                                buttonClassName={
                                    'w-12 h-8 absolute right-10 top-1/2 -translate-y-1/2 bg-muted/30' +
                                    ' hover:bg-muted text-xs' +
                                    ` ${(!expectedReturnRateInput || expectedReturnRate === 0) && ' pointer-events-none hidden'}`
                                }
                                contentClassName="w-20"
                            />
                            <AppTooltips
                                contents={expectedReturnTooltip}
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={
                                            'absolute right-2 top-1/2 -translate-y-1/2 dark:hover:bg-transparent' +
                                            ` ${(!expectedReturnRateInput || expectedReturnRate === 0) && ' pointer-events-none hidden'}`
                                        }
                                    >
                                        <Info className="size-3" />
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                    <CardContent className="pl-8">
                        <div
                            style={{ height: height - 182 }}
                            className={'relative'}
                        >
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                                className={'relative'}
                            >
                                <LineChart
                                    data={debounceChartData}
                                    margin={{
                                        top: 5,
                                        right: 20,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#92929250"
                                    />
                                    <XAxis
                                        dataKey="period"
                                        label={{
                                            value: `${renderReturnRateUnit()}`,
                                            position: 'insideBottomRight',
                                            offset: -5,
                                            style: {
                                                fontWeight: 'bold',
                                                color: 'red',
                                            },
                                        }}
                                    />
                                    <YAxis
                                        ticks={calcYAxis()}
                                        tickFormatter={val => {
                                            if (val >= 1e9)
                                                return `$${(val / 1e9).toFixed(1)}B`;
                                            if (val >= 1e6)
                                                return `$${(val / 1e6).toFixed(1)}M`;
                                            if (val >= 1e3)
                                                return `$${(val / 1e3).toFixed(0)}K`;
                                            return `$${val.toFixed(0)}`;
                                        }}
                                    />
                                    <Tooltip
                                        formatter={value => [
                                            `$${Number(value).toLocaleString()}`,
                                            '',
                                        ]}
                                        labelFormatter={label =>
                                            `${locale === 'vi' ? `Kỳ ${renderReturnRateUnit()}` : `Period ${renderReturnRateUnit()}`} ${label}`
                                        }
                                        contentStyle={{
                                            background:
                                                theme === 'dark'
                                                    ? '#252525'
                                                    : '#fff',
                                            color:
                                                theme === 'dark'
                                                    ? '#fff'
                                                    : '#000',
                                            borderRadius: '10px',
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                    <Legend
                                        content={() => (
                                            <ul className="flex flex-wrap gap-4 justify-center mt-2">
                                                {[
                                                    {
                                                        label:
                                                            locale === 'vi'
                                                                ? 'Danh Mục Còn Lại'
                                                                : 'Remaining',
                                                        color:
                                                            theme === 'dark'
                                                                ? '#ffe400'
                                                                : '#000000',
                                                        strokeDasharray: '0 0',
                                                        icon: BsDash,
                                                    },
                                                    {
                                                        label:
                                                            locale === 'vi'
                                                                ? 'Hòa Vốn'
                                                                : 'Break-Even',
                                                        color:
                                                            theme === 'dark'
                                                                ? '#ffffff'
                                                                : '#000000',
                                                        strokeDasharray: '4 2',
                                                        icon: AiOutlineDash,
                                                    },
                                                    {
                                                        label:
                                                            locale === 'vi'
                                                                ? 'Lãi Đơn'
                                                                : 'Simple Interest',
                                                        color:
                                                            theme === 'dark'
                                                                ? '#49a74e'
                                                                : '#358439',
                                                        strokeDasharray: '0 0',
                                                        icon: BsDash,
                                                    },
                                                    {
                                                        label:
                                                            locale === 'vi'
                                                                ? 'Lãi Kép'
                                                                : 'Compound Interest',
                                                        color: '#db2736',
                                                        strokeDasharray: '0 0',
                                                        icon: BsDash,
                                                    },
                                                ].map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center  gap-1.5 text-sm font-medium"
                                                        style={{
                                                            color: item.color,
                                                        }}
                                                    >
                                                        <item.icon className="size-6" />
                                                        {item.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="target"
                                        stroke={
                                            theme === 'dark' ? '#fff' : '#000'
                                        }
                                        strokeDasharray="4 2"
                                        dot={false}
                                        name={
                                            locale === 'vi'
                                                ? 'Hòa Vốn'
                                                : 'Break-Even'
                                        }
                                        legendType="line"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="remaining"
                                        stroke={
                                            theme === 'dark'
                                                ? '#ffe400'
                                                : '#000'
                                        }
                                        strokeDasharray="0 0"
                                        dot={false}
                                        name={
                                            locale === 'vi'
                                                ? 'Danh Mục Còn Lại'
                                                : 'Remaining'
                                        }
                                        legendType="line"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="compound"
                                        stroke="#db2736"
                                        dot={{ r: 4 }}
                                        name={
                                            locale === 'vi'
                                                ? 'Lãi Kép'
                                                : 'Compound Interest'
                                        }
                                        legendType="line"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="simple"
                                        stroke={
                                            theme === 'dark'
                                                ? '#49a74e'
                                                : '#358439'
                                        }
                                        dot={{ r: 4 }}
                                        name={
                                            locale === 'vi'
                                                ? 'Lãi Đơn'
                                                : 'Simple Interest'
                                        }
                                        legendType="line"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className="absolute left-0 top-1/2 transform -translate-x-3/5 -translate-y-1/2 -rotate-90 font-bold leading-relaxed text-brand-text dark:text-[#666]">
                                {locale === 'vi'
                                    ? 'Giá Trị Danh Mục'
                                    : 'Portfolio Value'}
                            </p>
                        </div>
                        <div className={'flex justify-between'}>
                            <SummaryCard
                                title={
                                    locale === 'vi'
                                        ? 'Lợi Nhuận Dự Kiến'
                                        : 'Projected Return'
                                }
                                value={`${recoveryAmountNeeded > 0 ? `$ ${formatNumber(recoveryAmountNeeded)}` : t('tool.valueIsNowEmpty')}`}
                                color="text-yellow-500"
                                align={'vertical'}
                            />
                            <SummaryCard
                                title={
                                    locale === 'vi'
                                        ? 'Kỳ Hoàn Vốn (Lãi Đơn)'
                                        : 'Breakeven Periods (Simple)'
                                }
                                value={
                                    isFinite(periodsToRecoverSimple)
                                        ? `${periodsToRecoverSimple.toFixed(1)} ${renderReturnRateUnit()}`
                                        : t('tool.valueIsNowEmpty')
                                }
                                color="text-blue-500"
                                align={'vertical'}
                            />
                            <SummaryCard
                                title={
                                    locale === 'vi'
                                        ? 'Kỳ Hoàn Vốn (Lãi Kép)'
                                        : 'Breakeven Periods (Compound)'
                                }
                                value={
                                    isFinite(periodsToBreakEven())
                                        ? `${periodsToBreakEven().toFixed(2)} ${renderReturnRateUnit()}`
                                        : t('tool.valueIsNowEmpty')
                                }
                                color="text-blue-500"
                                align={'vertical'}
                            />
                            <SummaryCard
                                title={
                                    locale === 'vi'
                                        ? 'Giá Trị Cuối Kỳ'
                                        : 'End of Period Value'
                                }
                                value={`${initialPortfolio > 0 ? `$ ${formatNumber(initialPortfolio)}` : t('tool.valueIsNowEmpty')}`}
                                color="text-blue-500"
                                align={'vertical'}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// Reusable summary card
const SummaryCard: React.FC<{
    title: string | ReactNode;
    value: string;
    color?: string;
    align?: 'vertical' | 'horizontal';
    tooltip?: React.ReactNode;
}> = ({ title, value, tooltip, align = 'horizontal' }) => {
    return (
        <div
            className={cn(
                'p-1 flex gap-2 items-center justify-between',
                `${align === 'vertical' ? 'flex-col gap-0 items-start' : 'flex-row'}`
            )}
        >
            <div className="flex items-start">
                <span
                    className={cn(
                        'font-medium text-sm text-brand-text',
                        `${align === 'vertical' ? 'text-sm' : ''}`
                    )}
                >
                    {title}
                    {align === 'horizontal' && ':'}
                </span>
                {tooltip && (
                    <AppTooltips
                        contents={tooltip}
                        trigger={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 dark:hover:bg-transparent"
                            >
                                <Info className="size-3" />
                            </Button>
                        }
                    />
                )}
            </div>
            <p className="text-base  font-bold text-brand-text dark:text-[var(--brand-color)]">
                {value}
            </p>
        </div>
    );
};

export default LossRecoveryCalculator;
