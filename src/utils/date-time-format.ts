import { formatInTimeZone } from 'date-fns-tz';
import { format } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

export const dateTimeFormat = (date: Date) => {
    const formatString = {
        'day-date-hour-minute': "EEEE, dd-MM-yyyy, h:mm a, 'UTC'xxx",
        day: "dd/MM/yyyy, h:mm a, 'UTC'xxx",
    };
    return formatInTimeZone(date, 'Etc/GMT-10', formatString.day);
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
    if (locale === 'vi') {
        // For Vietnamese: "8:00 Sáng, Thứ Bảy, 01.11.2025"
        const time = format(date, 'h:mm');
        const period = 'Sáng'; // Hardcoded as per requirement for morning
        const dayOfWeek = format(date, 'EEEE', { locale: vi });
        const datePart = format(date, 'dd.MM.yyyy');

        // Capitalize the first letter of the day of the week ("thứ bảy" -> "Thứ bảy")
        const capitalizedDay =
            dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
        return `${time} ${period}, ${capitalizedDay}, ${datePart}`;
    }

    // Default to English format: "8:00 AM Saturday, 01.11.2025"
    return format(date, 'h:mm a EEEE, dd.MM.yyyy', {
        locale: enUS,
    });
};
