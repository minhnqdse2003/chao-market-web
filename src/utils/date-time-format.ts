import { formatInTimeZone } from 'date-fns-tz';

export const dateTimeFormat = (date: Date) =>
    formatInTimeZone(date, 'Etc/GMT-10', "EEEE, dd-MM-yyyy, h:mm a, 'UTC'xxx");
