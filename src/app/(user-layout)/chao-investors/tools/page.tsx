'use client';
import { useI18n } from '@/context/i18n/context';
import { AppTabs, TabItem } from '@/components/app-tabs';
import { useState, useEffect } from 'react';
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

import { Label } from '@/components/ui/label';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppDropdown, { DropdownOption } from '@/components/app-dropdown';

interface ToolConfig {
    key: string;
    viSrc: string;
    enSrc: string;
}

const toolConfigs: ToolConfig[] = [
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
];

function ToolContent({ toolKey, src }: { toolKey: string; src: ToolConfig }) {
    const { t, locale } = useI18n();

    return (
        <div key={src.key + locale}>
            <p className="mb-4">
                {t(
                    `investors.items.toolForInvestor.items.${toolKey}.description`
                )}
            </p>
            <iframe
                // This forces iframe to rerender when src changes
                height="650"
                src={locale === 'vi' ? src.viSrc : src.enSrc}
                className="w-full"
            />
        </div>
    );
}

function InterestCalculator() {
    const { locale } = useI18n();
    const [calculationType, setCalculationType] = useState<
        'simple' | 'compound' | 'monteCarlo'
    >('simple');
    const [timeUnit, setTimeUnit] = useState<'year' | 'month' | 'day'>('year');
    const [timeValue, setTimeValue] = useState<number>(10);
    const [initialCapital, setInitialCapital] = useState<number>(160655.97);
    const [growthRate, setGrowthRate] = useState<number>(75.9);
    const [volatility, setVolatility] = useState<number>(15);
    const [simulations, setSimulations] = useState<number>(1000);

    // Format number with commas
    const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    // Generate data for chart
    const generateChartData = () => {
        const data = [];

        if (calculationType === 'simple') {
            const yearlyInterest = initialCapital * (growthRate / 100);
            for (let i = 0; i <= timeValue; i++) {
                const value = initialCapital + yearlyInterest * i;
                data.push({
                    time: i,
                    value: value,
                });
            }
        } else if (calculationType === 'compound') {
            for (let i = 0; i <= timeValue; i++) {
                const value =
                    initialCapital * Math.pow(1 + growthRate / 100, i);
                data.push({
                    time: i,
                    value: value,
                });
            }
        } else if (calculationType === 'monteCarlo') {
            // For Monte Carlo, we'll simulate and show median path
            const results = [];
            for (let sim = 0; sim < simulations; sim++) {
                let balance = initialCapital;
                const scenario = [{ time: 0, value: initialCapital }];

                for (let i = 1; i <= timeValue; i++) {
                    const randomReturn = generateRandomNormal(
                        growthRate / 100,
                        volatility / 100
                    );
                    balance = balance * (1 + randomReturn);
                    scenario.push({ time: i, value: balance });
                }
                results.push(scenario);
            }

            // Calculate median for each time point
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

        return data;
    };

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

    const chartData = generateChartData();

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Left Panel - Controls */}
            <div className="w-full md:w-1/3">
                <Card className={'bg-transparent dark:bg-transparent h-full'}>
                    <CardHeader>
                        <CardTitle>
                            {locale === 'vi'
                                ? 'Tham số đầu vào'
                                : 'Input Parameters'}
                        </CardTitle>
                        <CardDescription>
                            {locale === 'vi'
                                ? 'Cấu hình các tham số cho mô phỏng đầu tư'
                                : 'Configure parameters for investment simulation'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label>
                                {locale === 'vi'
                                    ? 'Chế độ tính toán:'
                                    : 'Calculation Mode:'}
                            </Label>
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
                                buttonClassName="w-fit min-w-[200px] justify-between"
                                contentClassName="w-full!"
                            />
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Label>
                                    {locale === 'vi'
                                        ? 'Thời gian đầu tư:'
                                        : 'Investment Time:'}
                                </Label>
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
                                    buttonClassName="w-fit min-w-[200px] justify-between"
                                    contentClassName="w-full!"
                                />
                            </div>
                            <div className="flex-1">
                                <FloatingLabelInput
                                    type="number"
                                    label={
                                        locale === 'vi' ? 'Số lượng' : 'Amount'
                                    }
                                    value={timeValue}
                                    onChange={e =>
                                        setTimeValue(Number(e.target.value))
                                    }
                                    min="1"
                                    className="app-text-input pr-10"
                                />
                            </div>
                        </div>

                        <div>
                            <FloatingLabelInput
                                type="text"
                                label={
                                    locale === 'vi'
                                        ? 'Vốn đầu tư ban đầu (USD)'
                                        : 'Starting Equity (USD)'
                                }
                                value={formatNumber(initialCapital)}
                                onChange={e =>
                                    setInitialCapital(
                                        Number(e.target.value.replace(/,/g, ''))
                                    )
                                }
                                className="app-text-input pr-10"
                            />
                        </div>

                        <div>
                            <FloatingLabelInput
                                type="number"
                                label={
                                    locale === 'vi'
                                        ? 'Lãi suất (%/năm)'
                                        : 'Growth Rate (%/year)'
                                }
                                value={growthRate}
                                onChange={e =>
                                    setGrowthRate(Number(e.target.value))
                                }
                                min="0"
                                step="0.1"
                                className="app-text-input pr-10"
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

                        <div className="mt-4 p-3 text-brand-text rounded-md">
                            <h3 className="font-bold mb-2">
                                {calculationType === 'simple'
                                    ? locale === 'vi'
                                        ? 'Lãi Đơn'
                                        : 'Simple Interest'
                                    : calculationType === 'compound'
                                      ? locale === 'vi'
                                          ? 'Lãi Kép'
                                          : 'Compound Interest'
                                      : locale === 'vi'
                                        ? 'Monte Carlo'
                                        : 'Monte Carlo'}
                            </h3>
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
                    </CardContent>
                </Card>
            </div>

            {/* Right Panel - Chart */}
            <div className="w-full h-full md:w-2/3">
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
                        <div className="h-[500px]">
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
                                    <CartesianGrid strokeDasharray="3 3" />
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
                                            `$${(value / 1000).toFixed(0)}K`
                                        }
                                    />
                                    <Tooltip
                                        formatter={value => [
                                            `$${Number(value).toLocaleString('en-US')}`,
                                            'Value',
                                        ]}
                                        labelFormatter={value =>
                                            `${timeUnit === 'year' ? 'Year' : timeUnit === 'month' ? 'Month' : 'Day'} ${value}`
                                        }
                                        contentStyle={{
                                            background: '#252525',
                                            color: '#FFE400',
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={'#FFE400'}
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

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi'
                                        ? 'Giá trị đầu tư ban đầu:'
                                        : 'Starting Investment:'}
                                </p>
                                <p className="font-bold">
                                    ${formatNumber(initialCapital)}
                                </p>
                            </div>
                            <div className="p-3 text-brand-text rounded-md">
                                <p className="text-sm">
                                    {locale === 'vi'
                                        ? 'Giá trị cuối kỳ:'
                                        : 'Final Value:'}
                                </p>
                                <p className="font-bold">
                                    $
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
        const newTabsList = toolConfigs.map(tool => ({
            title: t(`investors.items.toolForInvestor.items.${tool.key}.title`),
            value: tool.key,
            renderContent: () =>
                Promise.resolve(
                    <ToolContent
                        key={`${locale}-${tool.key}`} // Add locale to key to force re-render
                        toolKey={tool.key}
                        src={tool}
                    />
                ),
        }));

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

    return <AppTabs tabsList={tabsList} />;
}
