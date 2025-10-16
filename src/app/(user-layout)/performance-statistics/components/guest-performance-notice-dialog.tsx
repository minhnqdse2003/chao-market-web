'use client';

import { useI18n } from '@/context/i18n/context';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import AppAlertDialog from '@/components/app-alert-dialog';
import {
    GuestNoticeTranslations,
    MemberNoticeTranslations,
} from '@/types/translations/performance-notice-translations';
import { useSession } from 'next-auth/react';

export function GuestPerformanceNoticeDialog() {
    const { status } = useSession();
    const [isOpen, setIsOpen] = useState(status === 'unauthenticated');
    const { t } = useI18n();
    const notice = t(
        'performanceNotice.guest'
    ) as unknown as GuestNoticeTranslations;

    const noticeMember = t(
        'performanceNotice.member'
    ) as unknown as MemberNoticeTranslations;

    const linkStyle = 'text-[var(--brand-color)] hover:underline font-semibold';

    const descriptionGuestJsx = (
        <>
            <p className="mb-4">{notice.desc1}</p>
            <p>
                {notice.desc2}
                <Link href="/auth/signup" className={linkStyle}>
                    {notice.linkSignUp}
                </Link>
                {notice.desc3}
                <Link href="/auth/login" className={linkStyle}>
                    {notice.linkLogIn}
                </Link>
                {notice.desc4}
            </p>
        </>
    );

    const descriptionMemberJsx = (
        <>
            <p className="mb-4 text-brand-text">
                <span>{noticeMember.desc1}</span>{' '}
                <span className={'font-bold dark:text-[var(--brand-color)]'}>
                    {noticeMember.desc2}
                </span>{' '}
                <span>{noticeMember.desc3}</span>{' '}
                <Link
                    href={'/terms-of-use'}
                    className={
                        'dark:text-[var(--brand-color)] hover:underline font-bold'
                    }
                >
                    {noticeMember.linkTerms}
                </Link>
                .
            </p>
        </>
    );

    const isAuthenticated = status === 'authenticated';

    useEffect(() => {
        setIsOpen(status === 'unauthenticated' || isAuthenticated);
    }, [status]);

    return !isAuthenticated ? (
        <AppAlertDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            content={{
                title: notice.title,
                description: descriptionGuestJsx,
            }}
        />
    ) : (
        <AppAlertDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            content={{
                title: noticeMember.title,
                description: descriptionMemberJsx,
            }}
            accepted={{
                title: noticeMember.agreeButton,
                onChange: () => {
                    setIsOpen(false);
                },
            }}
        />
    );
}
