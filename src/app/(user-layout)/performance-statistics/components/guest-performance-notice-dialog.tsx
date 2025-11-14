'use client';

import { useI18n } from '@/context/i18n/context';
import Link from 'next/link';
import { useEffect, useCallback, useMemo } from 'react';
import AppAlertDialog from '@/components/app-alert-dialog';
import {
    GuestNoticeTranslations,
    MemberNoticeTranslations,
} from '@/types/translations/performance-notice-translations';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useHistoryStore } from '@/stores/history-tracker.store';
import { usePerformanceStatisticStore } from '@/stores/performance-statistic.store';
import { PERFORMANCE_STATISTIC_DIALOG_ACTIONS } from '@/stores/actions/performance-statistic.action';
import AppDialog from '@/components/app-dialog';

export function GuestPerformanceNoticeDialog() {
    const { status } = useSession();
    const router = useRouter();
    const { t } = useI18n();
    const history = useHistoryStore(state => state.history);
    const {
        isOpen: isNoticeOpen,
        dispatch,
        isAccepted,
    } = usePerformanceStatisticStore();

    const notice = t(
        'performanceNotice.guest'
    ) as unknown as GuestNoticeTranslations;

    const noticeMember = t(
        'performanceNotice.member'
    ) as unknown as MemberNoticeTranslations;

    const linkStyle = 'text-[var(--brand-color)] hover:underline font-semibold';

    const descriptionGuestJsx = (
        <>
            <p
                className="mb-4 dark:[&>a]:text-[var(--brand-color)] text-base [&>a]:hover:underline [&>a]:text-brand-text"
                dangerouslySetInnerHTML={{ __html: notice.desc1 }}
            />
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
        <div className={'w-full'}>
            <p className="mb-4 text-[var(--brand-grey-foreground)]">
                <span>{noticeMember.desc1}</span>{' '}
                <span className={'text-brand-text'}>{noticeMember.desc2}</span>
                <span>{noticeMember.desc3}</span>{' '}
                <Link
                    href={'/terms-of-use'}
                    className={
                        'dark:text-[var(--brand-color)] text-brand-text hover:underline font-bold'
                    }
                >
                    {noticeMember.linkTerms}
                </Link>
                .
            </p>
            <div
                className={'flex justify-start font-medium items-center w-full'}
            >
                <p>
                    <span
                        className={
                            'dark:text-[var(--brand-color)]/80 text-brand-text w-full text-center'
                        }
                    >
                        {noticeMember.alreadyAgreeButton}
                    </span>
                </p>
            </div>
        </div>
    );

    const handleRedirectOnClickAcceptButton = () => {
        if (history.length > 1) {
            const previousPath = history[history.length - 2];
            router.push(previousPath);
        } else {
            router.push('/home');
        }
    };

    const setNoticeState = (open: boolean) => {
        dispatch({
            type: PERFORMANCE_STATISTIC_DIALOG_ACTIONS.SET_DIALOG,
            payload: open,
        });
    };

    const handleOnOpenChange = useCallback(
        (open: boolean, type: 'member' | 'guest') => {
            if (type === 'member') {
                setNoticeState(open);
            }
        },
        []
    );

    const isAuthenticated = useMemo(() => {
        return status === 'authenticated';
    }, [status]);

    useEffect(() => {
        if (isAuthenticated && !isAccepted) {
            handleOnOpenChange(isAuthenticated, 'member');
        }
    }, [status]);

    useEffect(() => {
        if (isAuthenticated && isNoticeOpen) {
            handleOnOpenChange(isNoticeOpen, 'member');
        }
    }, [isNoticeOpen]);

    return (
        <>
            {!isAuthenticated && status !== 'loading' && (
                <AppAlertDialog
                    open={!isAuthenticated}
                    content={{
                        title: notice.title,
                        description: descriptionGuestJsx,
                    }}
                    onClickCloseIcon={handleRedirectOnClickAcceptButton}
                    contentClassName={'w-fit min-w-fit'}
                />
            )}
            {isNoticeOpen && (
                <AppDialog
                    open={isNoticeOpen}
                    onOpenChange={open => handleOnOpenChange(open, 'member')}
                    trigger={<></>}
                    headerContent={
                        <h2 className="text-lg font-semibold">
                            {noticeMember.title}
                        </h2>
                    }
                    mainContent={descriptionMemberJsx}
                    footerContent={<></>}
                    contentContainerClassName="w-fit min-w-[50svw] max-w-[800px]"
                />
            )}
        </>
    );
}
