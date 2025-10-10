import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppDropdown from '@/components/app-dropdown';
import { TimeAgo } from '@/components/time-ago';
import AppDateRangePicker from '@/components/app-date-range-picker';
import React, { useState } from 'react';

// Define the dropdown option type
interface DropdownOption {
    value: string;
    label: string;
}

const getNotificationTypeOptions = (): DropdownOption[] => [
    {
        value: 'all',
        label: 'All Notifications',
    },
    {
        value: 'unread',
        label: 'Unread',
    },
    {
        value: 'emails',
        label: 'Emails',
    },
    {
        value: 'push',
        label: 'Push Notifications',
    },
];

// Define notification type
interface Notification {
    title: string;
    href: string;
    date: string;
}

const NotificationsTab = () => {
    const [filterParams, setFilterParams] = useState<{
        date: { startDate?: Date; endDate?: Date };
        filterOptions: string;
    }>({
        date: {},
        filterOptions: 'all',
    });

    const handleFilterChange = (key: string, value: unknown) =>
        setFilterParams(prev => ({ ...prev, [key]: value }));

    // Sample notifications data
    const notifications: Notification[] = [
        {
            title: 'New message received',
            href: '/messages/1',
            date: '2023-05-15',
        },
        {
            title: 'Account security alert',
            href: '/security/1',
            date: '2023-05-14',
        },
        {
            title: 'Weekly summary available',
            href: '/reports/1',
            date: '2023-05-10',
        },
        {
            title: 'New feature update',
            href: '/updates/1',
            date: '2023-05-08',
        },
    ];

    return (
        <Card className={'bg-transparent'}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Notification Preferences</CardTitle>
                <div
                    className={
                        'flex min-w-[37.5rem] gap-2 justify-center items-center'
                    }
                >
                    <AppDateRangePicker
                        label="Date"
                        value={filterParams.date}
                        onChange={range => handleFilterChange('date', range)}
                        highlightOnActive={true}
                        shouldLabelVisible={false}
                    />
                    <AppDropdown
                        options={getNotificationTypeOptions()}
                        value={filterParams.filterOptions}
                        onValueChange={(value: string) =>
                            handleFilterChange('filterOptions', value)
                        }
                        labelVisible={false}
                        buttonClassName="w-fit min-w-[200px] justify-between"
                        contentClassName="w-full!"
                    />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">
                        Recent Notifications
                    </h3>
                    <div className="space-y-3">
                        {notifications.map((notification, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 border rounded-md hover:bg-muted cursor-pointer"
                            >
                                <div className="flex-1">
                                    <a
                                        href={notification.href}
                                        className="font-medium hover:underline"
                                    >
                                        {notification.title}
                                    </a>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <TimeAgo dateString={notification.date} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NotificationsTab;
