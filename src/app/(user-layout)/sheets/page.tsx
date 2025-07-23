'use client';

import { useEffect, useState } from 'react';

export default function Sheets() {
    const [data, setData] = useState<Record<string, string>[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/sheets');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const sheetData = await response.json();
                if (sheetData.error) {
                    throw new Error(sheetData.error);
                }
                setData(sheetData);
                /* eslint-disable  @typescript-eslint/no-explicit-any */
            } catch (err: any) {
                setError(err.message || 'Error fetching data');
                console.error(err);
            }
        }

        fetchData();
    }, []);

    if (error) {
        return (
            <div className="container mx-auto p-4 text-red-500">{error}</div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Google Sheets Data (TimeLine)
            </h1>
            {data.length > 0 ? (
                <>
                    <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map(header => (
                                    <th
                                        key={header}
                                        className="border border-gray-300 p-2"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td
                                            key={i}
                                            className="border border-gray-300 p-2"
                                        >
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.map((row, index) => (
                        <p key={index}>
                            <strong>{row['Task'] || 'N/A'}</strong>:{' '}
                            {row['Estimate (hour)'] || 'N/A'} hours
                        </p>
                    ))}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
