import { formatInTimeZone } from 'date-fns-tz';

export const dateTimeFormat = (date: Date) => {
    const formatString = {
        'day-date-hour-minute': "EEEE, dd-MM-yyyy, h:mm a, 'UTC'xxx",
        day: "dd/MM/yyyy, h:mm a, 'UTC'xxx",
    };
    return formatInTimeZone(date, 'Etc/GMT-10', formatString.day);
};
