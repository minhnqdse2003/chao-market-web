'use client';

import { format, formatDistanceToNow, differenceInHours } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { useI18n } from '@/context/i18n/context';
import { cn } from '@/lib/utils';

interface TimeAgoProps {
    dateString: string | number | Date;
    className?: string;
}

export const TimeAgo = ({ dateString, className }: TimeAgoProps) => {
    const { locale } = useI18n();
    if (!dateString) {
        return null;
    }

    try {
        const articleDate = new Date(dateString);
        const now = new Date();

        // Calculate the difference in hours between now and the article's date
        const hoursDifference = differenceInHours(now, articleDate);

        let formattedDate: string;

        if (hoursDifference < 24) {
            formattedDate = formatDistanceToNow(articleDate, {
                addSuffix: true,
                locale: locale === 'vi' ? vi : enUS,
            });
        } else {
            formattedDate = format(articleDate, 'dd/MM/yyyy, h:mm a', {
                locale: locale === 'vi' ? vi : enUS,
            });
        }

        return (
            <span className={cn(className, 'first-letter:uppercase')}>
                {formattedDate}
            </span>
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.error(
            'Invalid date provided to TimeAgo component:',
            dateString
        );
        return <span className={className}>{String(dateString)}</span>;
    }
};
