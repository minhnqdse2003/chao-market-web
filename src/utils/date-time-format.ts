import { formatInTimeZone } from 'date-fns-tz';
import { enUS, vi } from 'date-fns/locale';

export const dateTimeFormat = (date: Date) => {
    const formatString = {
        'day-date-hour-minute': "h:mm a ('UTC'xxx), EEEE, dd.MM.yyyy",
        day: "dd/MM/yyyy, h:mm a, 'UTC'xxx",
    };
    return formatInTimeZone(
        date,
        'Etc/GMT-10',
        formatString['day-date-hour-minute']
    );
};

/**
 * Formats a date object into a custom string based on the locale.
 * - For 'vi': "8:00 Sáng, Thứ Bảy, 01.11.2025"
 * - For 'en': "8:00 AM Saturday, 01.11.2025"
 * @param date The Date object to format.
 * @param locale The current locale ('vi' or 'en').
 * @returns A formatted date string.
 */
export const formatLastUpdatedDate = (date: Date, locale: string) => {
    const timeZone = 'Etc/GMT-7';

    if (locale === 'vi') {
        // Format each part of the date in the target timezone
        const time = formatInTimeZone(date, timeZone, 'h:mm');
        const period = 'Sáng'; // Hardcoded as per requirement
        const dayOfWeek = formatInTimeZone(date, timeZone, 'EEEE', {
            locale: vi,
        });
        const datePart = formatInTimeZone(date, timeZone, 'dd.MM.yyyy');

        // Get the UTC offset string like "UTC+07:00"
        // 'UTC' is a literal string, and XXX provides the offset in +/-HH:mm format
        const utcOffsetString = formatInTimeZone(date, timeZone, "'UTC'XXX");

        // Capitalize the first letter of the day
        const capitalizedDay =
            dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

        return `${time} ${period} (${utcOffsetString}), ${capitalizedDay}, ${datePart}`;
    }

    return formatInTimeZone(
        date,
        timeZone,
        "h:mm a ('UTC'xxx), EEEE, dd.MM.yyyy",
        {
            locale: enUS,
        }
    );
};
