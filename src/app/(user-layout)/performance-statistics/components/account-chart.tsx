// /* eslint-disable  @typescript-eslint/no-explicit-any */
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
// } from 'recharts';
// import { useTheme } from 'next-themes';
// import { useI18n } from '@/context/i18n/context';
// import { formatInTimeZone } from 'date-fns-tz';
// import { enUS, vi } from 'date-fns/locale';
//
// export interface ChartDataPoint {
//     date: number;
//     equityPercentage: number;
//     gainPercentage: number;
//     depositAmount?: number;
//     withdrawalAmount?: number;
// }
//
// interface AccountChartProps {
//     data: ChartDataPoint[];
// }
//
// export function AccountChart({ data }: AccountChartProps) {
//     const { t, locale } = useI18n();
//     // Format date for x-axis & tooltip
//     const formatDate = (timestamp: number) => {
//         try {
//             return formatInTimeZone(
//                 new Date(timestamp),
//                 'Etc/GMT-7',
//                 'dd.MM.yy',
//                 {
//                     locale: locale === 'vi' ? vi : enUS,
//                 }
//             );
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     const { theme } = useTheme();
//
//     // Custom tooltip
//     const CustomTooltip = ({ active, payload, label }: any) => {
//         if (active && payload && payload.length) {
//             const mainDataPoint = data.find(d => d.date === label);
//             // Use t() for Deposit and Withdraw labels
//             const depositLabel = t('common.deposit');
//             const withdrawalLabel = t('common.withdraw');
//             const gainLabel = t('common.gain');
//             const equityLabel = t('common.equity');
//
//             return (
//                 <div className="dark:bg-brand-dialog bg-white p-2 border dark:border-[var(--brand-color)] border-black rounded-lg">
//                     <p className="text-[var(--brand-grey-foreground)] font-bold">
//                         {formatDate(label)}
//                     </p>
//                     {payload.map((entry: any, index: number) => (
//                         <p
//                             key={index}
//                             style={{ color: entry.color }}
//                             className={'font-bold'}
//                         >
//                             {entry.dataKey === 'equityPercentage' &&
//                                 `${equityLabel}: ${entry.value.toFixed(2)}%`}
//                             {entry.dataKey === 'gainPercentage' &&
//                                 `${gainLabel}: ${entry.value.toFixed(2)}%`}
//                         </p>
//                     ))}
//                     {mainDataPoint?.depositAmount &&
//                         mainDataPoint.depositAmount > 0 && (
//                             <p className="text-green-500 font-bold">
//                                 {depositLabel}: $
//                                 {Math.abs(
//                                     mainDataPoint.depositAmount
//                                 ).toLocaleString()}
//                             </p>
//                         )}
//                     {mainDataPoint?.withdrawalAmount &&
//                         mainDataPoint.withdrawalAmount > 0 && (
//                             <p className="text-red-500 font-bold">
//                                 {withdrawalLabel}: $
//                                 {Math.abs(
//                                     mainDataPoint.withdrawalAmount
//                                 ).toLocaleString()}
//                             </p>
//                         )}
//                 </div>
//             );
//         }
//         return null;
//     };
//
//     // Calculate Y-axis domain with padding
//     const allYValues = data.flatMap(point => [
//         point.equityPercentage,
//         point.gainPercentage,
//     ]);
//     const minY = Math.min(...allYValues);
//     const maxY = Math.max(...allYValues);
//
//     const roundedMinY = Math.floor(minY);
//     const roundedMaxY = Math.ceil(maxY);
//
//     const minYWithPadding = roundedMinY - 20;
//     const maxYWithPadding = roundedMaxY + 20;
//
//     const yAxisDomain = [minYWithPadding, maxYWithPadding];
//
//     // Deposit markers
//     const depositData = data
//         .filter(p => p.depositAmount && p.depositAmount > 0)
//         .map(p => ({
//             date: p.date,
//             markerValue: maxYWithPadding,
//         }));
//
//     // Withdrawal markers
//     const withdrawalData = data
//         .filter(p => p.withdrawalAmount && p.withdrawalAmount > 0)
//         .map(p => ({
//             date: p.date,
//             markerValue: minYWithPadding,
//         }));
//
//     return (
//         <div className="w-full h-80">
//             <ResponsiveContainer
//                 width="100%"
//                 height="100%"
//                 className={'[&>_*_.recharts-wrapper]:cursor-pointer!'}
//             >
//                 <LineChart
//                     data={data}
//                     margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
//                 >
//                     <CartesianGrid
//                         strokeDasharray="3 3"
//                         stroke={`${theme === 'dark' ? 'var(--brand-grey)' : '#000000'}`}
//                     />
//                     <XAxis
//                         dataKey="date"
//                         tickFormatter={formatDate}
//                         ticks={data.map(d => d.date)} // guarantees uniqueness
//                         tick={{
//                             fill: 'var(--brand-grey-foreground)',
//                             fontSize: 12,
//                         }}
//                         tickMargin={10}
//                         angle={-45}
//                         textAnchor="end"
//                         height={60}
//                         type="number"
//                         domain={['dataMin', 'dataMax']}
//                         scale="time"
//                     />
//                     <YAxis
//                         tick={{
//                             fill: 'var(--brand-grey-foreground)',
//                             fontSize: 12,
//                         }}
//                         tickMargin={10}
//                         domain={yAxisDomain}
//                         tickFormatter={value => `${value}%`}
//                         tickCount={6}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//
//                     {/* Equity Line */}
//                     <Line
//                         type="monotone"
//                         dataKey="equityPercentage"
//                         stroke="var(--brand-color)"
//                         strokeWidth={2}
//                         dot={{
//                             stroke: 'var(--brand-color)',
//                             strokeWidth: 2,
//                             r: 3,
//                         }}
//                         activeDot={{ r: 6, stroke: 'var(--brand-color)' }}
//                     />
//
//                     {/* Gain Line - Orange-400 */}
//                     <Line
//                         type="monotone"
//                         dataKey="gainPercentage"
//                         stroke="var(--color-orange-400)"
//                         strokeWidth={2}
//                         dot={{
//                             stroke: 'var(--color-orange-400)',
//                             strokeWidth: 2,
//                             r: 3,
//                         }}
//                         activeDot={{ r: 6, stroke: 'var(--color-orange-400)' }}
//                     />
//
//                     {/* Deposit Markers */}
//                     <Line
//                         type="monotone"
//                         data={depositData}
//                         dataKey="markerValue"
//                         stroke="var(--brand-green)"
//                         strokeWidth={0}
//                         dot={{
//                             stroke: 'var(--brand-green)',
//                             strokeWidth: 2,
//                             r: 5,
//                             fill: 'var(--brand-green)',
//                         }}
//                         activeDot={{
//                             r: 7,
//                             stroke: 'var(--brand-green)',
//                             fill: 'var(--brand-green)',
//                         }}
//                     />
//
//                     {/* Withdrawal Markers */}
//                     <Line
//                         type="monotone"
//                         data={withdrawalData}
//                         dataKey="markerValue"
//                         stroke="var(--brand-red)"
//                         strokeWidth={0}
//                         dot={{
//                             stroke: 'var(--brand-red)',
//                             strokeWidth: 2,
//                             r: 5,
//                             fill: 'var(--brand-red)',
//                         }}
//                         activeDot={{
//                             r: 7,
//                             stroke: 'var(--brand-red)',
//                             fill: 'var(--brand-red)',
//                         }}
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }
//
// export const seedData: ChartDataPoint[] = [
//     {
//         date: new Date('2024-01-01').getTime(),
//         equityPercentage: 100,
//         gainPercentage: 0,
//         depositAmount: 10000,
//         withdrawalAmount: 2000,
//     },
//     {
//         date: new Date('2024-01-15').getTime(),
//         equityPercentage: 102.5,
//         gainPercentage: 2.5,
//     },
//     {
//         date: new Date('2024-02-01').getTime(),
//         equityPercentage: 98.2,
//         gainPercentage: -1.8,
//     },
//     {
//         date: new Date('2024-02-10').getTime(),
//         equityPercentage: 95.8,
//         gainPercentage: -4.2,
//         withdrawalAmount: 2000,
//     },
//     {
//         date: new Date('2024-03-01').getTime(),
//         equityPercentage: 92.7,
//         gainPercentage: -7.3,
//     },
//     {
//         date: new Date('2024-03-15').getTime(),
//         equityPercentage: 95.3,
//         gainPercentage: -4.7,
//     },
//     {
//         date: new Date('2024-04-01').getTime(),
//         equityPercentage: 98.5,
//         gainPercentage: -1.5,
//     },
//     {
//         date: new Date('2024-04-20').getTime(),
//         equityPercentage: 102.8,
//         gainPercentage: 2.8,
//         depositAmount: 5000,
//     },
//     {
//         date: new Date('2024-05-01').getTime(),
//         equityPercentage: 99.2,
//         gainPercentage: -0.8,
//     },
//     {
//         date: new Date('2024-05-15').getTime(),
//         equityPercentage: 101.7,
//         gainPercentage: 1.7,
//     },
//     {
//         date: new Date('2024-06-01').getTime(),
//         equityPercentage: 97.5,
//         gainPercentage: -2.5,
//         withdrawalAmount: 3000,
//     },
//     {
//         date: new Date('2024-06-15').getTime(),
//         equityPercentage: 95.8,
//         gainPercentage: -4.2,
//     },
// ];

/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Scatter,
    ReferenceLine,
} from 'recharts';
import { useTheme } from 'next-themes';
import { useI18n } from '@/context/i18n/context';
import { format } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

export interface ChartDataPoint {
    date: number;
    equityPercentage: number;
    gainPercentage: number;
    depositAmount?: number;
    withdrawalAmount?: number;
}

export function AccountChart({ data }: { data: any[] }) {
    const { t, locale } = useI18n();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    const formatDate = (ts: number) =>
        format(new Date(ts), 'dd MMM', { locale: locale === 'vi' ? vi : enUS });

    // Calculate Y-axis placement for markers
    const allValues = data.flatMap(d => [d.equityPercentage, d.gainPercentage]);
    const chartMin = Math.min(...allValues);

    // Prepare data: We add the 'markerY' property directly to the main objects
    // to ensure the Tooltip knows they exist at the same 'axis' point.
    const processedData = data.map(d => ({
        ...d,
        depositY: d.depositAmount > 0 ? chartMin : null,
        withdrawalY: d.withdrawalAmount > 0 ? chartMin : null,
    }));

    return (
        <div className="w-full h-80 font-sans">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={processedData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="colorEquity"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="var(--brand-color)"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--brand-color)"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={isDark ? '#333' : '#e5e5e5'}
                    />

                    <XAxis
                        dataKey="date"
                        type="number"
                        scale="time"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={formatDate}
                        tick={{
                            fill: 'var(--brand-grey-foreground)',
                            fontSize: 11,
                        }}
                        axisLine={false}
                        tickLine={false}
                        minTickGap={40}
                        tickCount={6}
                        hide={false}
                    />

                    <YAxis
                        orientation="right"
                        tick={{
                            fill: 'var(--brand-grey-foreground)',
                            fontSize: 10,
                        }}
                        tickFormatter={v =>
                            new Intl.NumberFormat(locale, {
                                notation: 'compact',
                                style: 'currency',
                                currency: 'USD',
                            }).format(v)
                        }
                        axisLine={false}
                        tickLine={false}
                        domain={['auto', 'auto']}
                    />

                    <Tooltip
                        // CRITICAL FIXES:
                        trigger="axis" // Snaps to the vertical line
                        shared={true} // Shows all data for that date
                        content={
                            <CustomTooltip
                                t={t}
                                locale={locale}
                                formatCurrency={formatCurrency}
                            />
                        }
                        cursor={{
                            stroke: isDark ? '#555' : '#ccc',
                            strokeWidth: 1,
                        }}
                    />

                    <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="circle"
                        formatter={value => (
                            <span className="text-xs font-medium">{value}</span>
                        )}
                    />

                    <ReferenceLine y={0} stroke={isDark ? '#444' : '#ccc'} />

                    <Area
                        name={t('common.equity')}
                        type="linear"
                        dataKey="equityPercentage"
                        stroke="var(--brand-color)"
                        strokeWidth={2}
                        fill="url(#colorEquity)"
                        dot={false}
                        activeDot={{ r: 4 }}
                        isAnimationActive={false}
                    />

                    <Area
                        name={t('common.gain')}
                        type="linear"
                        dataKey="gainPercentage"
                        stroke="#fb923c"
                        strokeWidth={2}
                        fill="transparent"
                        dot={false}
                        isAnimationActive={false}
                    />

                    {/* Deposit markers (only appear if value exists) */}
                    <Scatter
                        name={t('common.deposit')}
                        dataKey="depositY"
                        fill="#22c55e"
                        shape="circle"
                        isAnimationActive={false}
                    />

                    {/* Withdrawal markers (only appear if value exists) */}
                    <Scatter
                        name={t('common.withdraw')}
                        dataKey="withdrawalY"
                        fill="#ef4444"
                        shape="circle"
                        isAnimationActive={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

const CustomTooltip = ({
    active,
    payload,
    label,
    t,
    locale,
    formatCurrency,
}: any) => {
    // Check if we have data for this axis slice
    if (active && payload && payload.length) {
        // Since trigger="axis", payload[0].payload contains the full data object for this date
        const dataPoint = payload[0].payload;
        const dateLocale = locale === 'vi' ? vi : enUS;

        return (
            <div className="bg-white dark:bg-[#1a1a1a] p-3 border border-slate-200 dark:border-slate-800 shadow-xl rounded-lg min-w-[180px]">
                <p className="text-slate-400 text-[10px] uppercase font-bold mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">
                    {format(new Date(label), 'P', { locale: dateLocale })}
                </p>

                <div className="space-y-1.5 mb-2">
                    {/* Only show lines that represent the Area/Lines (not the Scatter markers) */}
                    {payload
                        .filter((p: any) => !p.dataKey.includes('Y'))
                        .map((entry: any, index: number) => (
                            <div
                                key={index}
                                className="flex justify-between items-center gap-4"
                            >
                                <span
                                    className="text-[11px]"
                                    style={{ color: entry.color }}
                                >
                                    {entry.name}:
                                </span>
                                <span className="font-mono font-bold text-[12px]">
                                    {formatCurrency(entry.value)}
                                </span>
                            </div>
                        ))}
                </div>

                {/* Always check the original dataPoint for deposits/withdrawals */}
                {(dataPoint.depositAmount > 0 ||
                    dataPoint.withdrawalAmount > 0) && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                        {dataPoint.depositAmount > 0 && (
                            <div className="flex justify-between items-center text-green-500">
                                <span className="text-[10px]">
                                    {t('common.deposit')}:
                                </span>
                                <span className="font-bold text-[11px]">
                                    +{formatCurrency(dataPoint.depositAmount)}
                                </span>
                            </div>
                        )}
                        {dataPoint.withdrawalAmount > 0 && (
                            <div className="flex justify-between items-center text-red-500">
                                <span className="text-[10px]">
                                    {t('common.withdraw')}:
                                </span>
                                <span className="font-bold text-[11px]">
                                    -
                                    {formatCurrency(dataPoint.withdrawalAmount)}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
    return null;
};
