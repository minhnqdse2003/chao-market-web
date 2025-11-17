'use client';
import { NewsType } from '../utils/data-utils';
import Image from 'next/image';
import NavSeparator from '@/components/nav-separator';
import Link from 'next/link';
import AppInteractionBlock from '@/components/app-interaction-block';
import { endPointBuild } from '@/utils/end-point-build';
import AppShareButton from '@/components/app-share-button';
import { useI18n } from '@/context/i18n/context';
import { T } from '@/components/app-translate';
import AppDateTimeDisplayLocalized from '@/components/app-date-time-display-localized';

const NewsComp = ({
    news,
    baseHref = '/news-event',
}: {
    news: NewsType[];
    baseHref?: string;
}) => {
    const { locale } = useI18n();
    const parsedNews = news.map(item => ({
        ...item,
        title: item.title[locale as 'en' | 'vi'],
        description: item.description[locale as 'en' | 'vi'],
    }));
    return (
        <>
            {parsedNews.map((item, idx) => (
                <div
                    className="flex flex-col w-full items-end cursor-pointer"
                    key={item.title}
                >
                    <Link
                        className="flex w-full gap-[2rem]"
                        href={endPointBuild(baseHref, item.slug)}
                    >
                        {/* Image Block */}
                        <Image
                            width={100}
                            height={100}
                            className="object-contain w-full max-w-3/10 h-[10rem] rounded-lg"
                            src={item.image}
                            alt="news-image"
                        />
                        {/* News Information Block */}
                        <div className="w-7/10 flex flex-col gap-4">
                            {/* Title section */}
                            <div className="flex justify-between">
                                <p className="text-size-20 dark:text-[var(--brand-color)] text-brand-text font-semibold leading-relaxed">
                                    {item.title}
                                </p>
                                {/* Interaction block */}
                                <AppInteractionBlock
                                    dislike={item.dislike}
                                    like={item.like}
                                    views={item.views}
                                />
                            </div>
                            {/* Description section */}
                            <div
                                className={
                                    'text-[var(--brand-grey-foreground)] leading-relaxed'
                                }
                            >
                                {item.description}
                            </div>
                        </div>
                    </Link>
                    <div className="w-[calc(70%-2rem)] flex justify-between">
                        {/* Date & Reference source */}
                        <div className="flex w-fit text-sm gap-4 text-[var(--brand-grey-foreground)]/70 font-medium">
                            <p>
                                <T keyName={'common.market'} />:{' '}
                                <span
                                    className={
                                        'text-brand-text dark:text-[var(--brand-color)]'
                                    }
                                >
                                    {
                                        <T
                                            keyName={`common.marketType.${item.market.toLowerCase()}`}
                                        />
                                    }
                                </span>
                            </p>
                            <p>
                                <AppDateTimeDisplayLocalized
                                    date={new Date(item.date)}
                                />
                            </p>
                            <p>
                                <T keyName={'common.source'} />:{' '}
                                {item.referenceSource}
                            </p>
                        </div>
                        <AppShareButton slug={item.slug} />
                    </div>
                    {idx !== news.length - 1 && (
                        <NavSeparator isTrigger={false} />
                    )}
                </div>
            ))}
        </>
    );
};

export default NewsComp;
