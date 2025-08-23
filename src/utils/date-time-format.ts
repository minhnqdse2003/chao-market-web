import { formatInTimeZone } from 'date-fns-tz';

export const dateTimeFormat = (date: Date) =>
    formatInTimeZone(
        date,
        'Etc/GMT-10', // GMT+10 is represented as Etc/GMT-10 in tz database
        "dd-MM-yyyy, h:mm a 'GMT'xxx"
    );
