/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { useTheme } from 'next-themes';

export interface ChartDataPoint {
    date: number;
    equityPercentage: number;
    gainPercentage: number;
    depositAmount?: number;
    withdrawalAmount?: number;
}

interface AccountChartProps {
    data: ChartDataPoint[];
}

export function AccountChart({ data }: AccountChartProps) {
    // Format date for x-axis & tooltip
    const formatDate = (timestamp: number) =>
        format(new Date(timestamp), 'MMM dd, yy');

    const { theme } = useTheme();

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const mainDataPoint = data.find(d => d.date === label);
            return (
                <div className="dark:bg-brand-dialog bg-white p-2 border dark:border-[var(--brand-color)] border-black rounded-lg">
                    <p className="text-[var(--brand-grey-foreground)] font-bold">
                        {formatDate(label)}
                    </p>
                    {payload.map((entry: any, index: number) => (
                        <p
                            key={index}
                            style={{ color: entry.color }}
                            className={'font-bold'}
                        >
                            {entry.dataKey === 'equityPercentage' &&
                                `Equity: ${entry.value.toFixed(2)}%`}
                            {entry.dataKey === 'gainPercentage' &&
                                `Gain: ${entry.value.toFixed(2)}%`}
                        </p>
                    ))}
                    {mainDataPoint?.depositAmount &&
                        mainDataPoint.depositAmount > 0 && (
                            <p className="text-green-500 font-bold">
                                Deposit: $
                                {Math.abs(
                                    mainDataPoint.depositAmount
                                ).toLocaleString()}
                            </p>
                        )}
                    {mainDataPoint?.withdrawalAmount &&
                        mainDataPoint.withdrawalAmount > 0 && (
                            <p className="text-red-500 font-bold">
                                Withdrawal: $
                                {Math.abs(
                                    mainDataPoint.withdrawalAmount
                                ).toLocaleString()}
                            </p>
                        )}
                </div>
            );
        }
        return null;
    };

    // Calculate Y-axis domain with padding
    const allYValues = data.flatMap(point => [
        point.equityPercentage,
        point.gainPercentage,
    ]);
    const minY = Math.min(...allYValues);
    const maxY = Math.max(...allYValues);

    const roundedMinY = Math.floor(minY);
    const roundedMaxY = Math.ceil(maxY);

    const minYWithPadding = roundedMinY - 20;
    const maxYWithPadding = roundedMaxY + 20;

    const yAxisDomain = [minYWithPadding, maxYWithPadding];

    // Deposit markers
    const depositData = data
        .filter(p => p.depositAmount && p.depositAmount > 0)
        .map(p => ({
            date: p.date,
            markerValue: maxYWithPadding,
        }));

    // Withdrawal markers
    const withdrawalData = data
        .filter(p => p.withdrawalAmount && p.withdrawalAmount > 0)
        .map(p => ({
            date: p.date,
            markerValue: minYWithPadding,
        }));

    return (
        <div className="w-full h-80">
            <ResponsiveContainer
                width="100%"
                height="100%"
                className={'[&>_*_.recharts-wrapper]:cursor-pointer!'}
            >
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={`${theme === 'dark' ? 'var(--brand-grey)' : '#000000'}`}
                    />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        ticks={data.map(d => d.date)} // guarantees uniqueness
                        tick={{
                            fill: 'var(--brand-grey-foreground)',
                            fontSize: 12,
                        }}
                        tickMargin={10}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="time"
                    />
                    <YAxis
                        tick={{
                            fill: 'var(--brand-grey-foreground)',
                            fontSize: 12,
                        }}
                        tickMargin={10}
                        domain={yAxisDomain}
                        tickFormatter={value => `${value}%`}
                        tickCount={6}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    {/* Equity Line */}
                    <Line
                        type="monotone"
                        dataKey="equityPercentage"
                        stroke="var(--brand-color)"
                        strokeWidth={2}
                        dot={{
                            stroke: 'var(--brand-color)',
                            strokeWidth: 2,
                            r: 3,
                        }}
                        activeDot={{ r: 6, stroke: 'var(--brand-color)' }}
                    />

                    {/* Gain Line - Orange-400 */}
                    <Line
                        type="monotone"
                        dataKey="gainPercentage"
                        stroke="var(--color-orange-400)"
                        strokeWidth={2}
                        dot={{
                            stroke: 'var(--color-orange-400)',
                            strokeWidth: 2,
                            r: 3,
                        }}
                        activeDot={{ r: 6, stroke: 'var(--color-orange-400)' }}
                    />

                    {/* Deposit Markers */}
                    <Line
                        type="monotone"
                        data={depositData}
                        dataKey="markerValue"
                        stroke="var(--color-green-400)"
                        strokeWidth={0}
                        dot={{
                            stroke: 'var(--color-green-400)',
                            strokeWidth: 2,
                            r: 5,
                            fill: 'var(--color-green-400)',
                        }}
                        activeDot={{
                            r: 7,
                            stroke: 'var(--color-green-400)',
                            fill: 'var(--color-green-400)',
                        }}
                    />

                    {/* Withdrawal Markers */}
                    <Line
                        type="monotone"
                        data={withdrawalData}
                        dataKey="markerValue"
                        stroke="var(--color-red-400)"
                        strokeWidth={0}
                        dot={{
                            stroke: 'var(--color-red-400)',
                            strokeWidth: 2,
                            r: 5,
                            fill: 'var(--color-red-400)',
                        }}
                        activeDot={{
                            r: 7,
                            stroke: 'var(--color-red-400)',
                            fill: 'var(--color-red-400)',
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export const seedData: ChartDataPoint[] = [
    {
        date: new Date('2024-01-01').getTime(),
        equityPercentage: 100,
        gainPercentage: 0,
        depositAmount: 10000,
        withdrawalAmount: 2000,
    },
    {
        date: new Date('2024-01-15').getTime(),
        equityPercentage: 102.5,
        gainPercentage: 2.5,
    },
    {
        date: new Date('2024-02-01').getTime(),
        equityPercentage: 98.2,
        gainPercentage: -1.8,
    },
    {
        date: new Date('2024-02-10').getTime(),
        equityPercentage: 95.8,
        gainPercentage: -4.2,
        withdrawalAmount: 2000,
    },
    {
        date: new Date('2024-03-01').getTime(),
        equityPercentage: 92.7,
        gainPercentage: -7.3,
    },
    {
        date: new Date('2024-03-15').getTime(),
        equityPercentage: 95.3,
        gainPercentage: -4.7,
    },
    {
        date: new Date('2024-04-01').getTime(),
        equityPercentage: 98.5,
        gainPercentage: -1.5,
    },
    {
        date: new Date('2024-04-20').getTime(),
        equityPercentage: 102.8,
        gainPercentage: 2.8,
        depositAmount: 5000,
    },
    {
        date: new Date('2024-05-01').getTime(),
        equityPercentage: 99.2,
        gainPercentage: -0.8,
    },
    {
        date: new Date('2024-05-15').getTime(),
        equityPercentage: 101.7,
        gainPercentage: 1.7,
    },
    {
        date: new Date('2024-06-01').getTime(),
        equityPercentage: 97.5,
        gainPercentage: -2.5,
        withdrawalAmount: 3000,
    },
    {
        date: new Date('2024-06-15').getTime(),
        equityPercentage: 95.8,
        gainPercentage: -4.2,
    },
];
