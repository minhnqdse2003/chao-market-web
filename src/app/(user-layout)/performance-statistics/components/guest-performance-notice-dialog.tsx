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
    const { isOpen: isNoticeOpen, dispatch } = usePerformanceStatisticStore();

    const notice = t(
        'performanceNotice.guest'
    ) as unknown as GuestNoticeTranslations;

    const noticeMember = t(
        'performanceNotice.member'
    ) as unknown as MemberNoticeTranslations;

    const linkStyle = 'text-[var(--brand-color)] hover:underline font-semibold';

    const descriptionGuestJsx = (
        <div className={'w-full'}>
            <p
                className="mb-4 dark:[&>a]:text-[var(--brand-color)] text-sm lg:text-base leading-7 [&>a]:font-bold [&>a]:hover:underline [&>a]:text-brand-text"
                dangerouslySetInnerHTML={{ __html: notice.desc1 }}
            />
            <p className={'text-sm lg:text-base'}>
                {notice.desc2}
                <Link href="/auth/sign-up" className={linkStyle}>
                    {notice.linkSignUp}
                </Link>
                {notice.desc3}
                <Link href="/auth/login" className={linkStyle}>
                    {notice.linkLogIn}
                </Link>
                {notice.desc4}
            </p>
        </div>
    );

    const descriptionMemberJsx = (
        <div className={'w-full'}>
            <p className="mb-4 text-[var(--brand-grey-foreground)] leading-7">
                <span>{noticeMember.desc1}</span>{' '}
                <span className={'text-brand-text font-bold'}>
                    {noticeMember.desc2}
                </span>
                <span
                    dangerouslySetInnerHTML={{ __html: noticeMember.desc3 }}
                    className={
                        '[&>a]:dark:text-[var(--brand-color)] [&>a]:font-bold [&>a]:hover:underline'
                    }
                />
            </p>
            <div
                className={'flex justify-start font-medium items-center w-full'}
            >
                <p>
                    <span
                        className={
                            'dark:text-[var(--brand-color)] font-medium text-brand-text w-full text-center'
                        }
                    >
                        {noticeMember.alreadyAgreeButton}.
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
        if (isAuthenticated && isNoticeOpen) {
            handleOnOpenChange(isNoticeOpen, 'member');
            console.log('set notice: ', isNoticeOpen);
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
                    contentClassName={
                        'w-full min-w-[95svw] lg:w-fit lg:min-w-[60svw]'
                    }
                />
            )}
            {isNoticeOpen && (
                <AppDialog
                    open={isNoticeOpen}
                    onOpenChange={open => handleOnOpenChange(open, 'member')}
                    trigger={<></>}
                    headerContent={
                        <h2 className="text-size-22 font-bold text-brand-text dark:text-[var(--brand-color)] text-center">
                            {noticeMember.title}
                        </h2>
                    }
                    mainContent={descriptionMemberJsx}
                    footerContent={<></>}
                    contentContainerClassName="w-full min-w-[65svw]!"
                />
            )}
        </>
    );
}
