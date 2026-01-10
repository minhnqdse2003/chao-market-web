'use client';
import { NewsType } from '../utils/data-utils';
import Image from 'next/image';
import NavSeparator from '@/components/nav-separator';
import Link from 'next/link';
import { endPointBuild } from '@/utils/end-point-build';
import AppShareButton from '@/components/app-share-button';
import { useI18n } from '@/context/i18n/context';
import { T } from '@/components/app-translate';
import AppDateTimeDisplayLocalized from '@/components/app-date-time-display-localized';
import { BrandLogoFtHat } from '@image/index';
import PostInteractionManager from '@/components/app-interaction-block';

const NewsComp = ({
    news,
    baseHref = '/chao-insights',
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
                <div key={item.title}>
                    <div className="flex w-full gap-8">
                        <div className="flex flex-col lg:flex-row gap-8 w-full items-center">
                            {/* Image Block */}
                            <Link
                                href={endPointBuild(baseHref, item.slug)}
                                className={'w-full h-full lg:max-w-[300px]'}
                            >
                                {item.image ? (
                                    <img
                                        className="object-cover w-full h-full rounded-lg aspect-16/9"
                                        src={item.image}
                                        alt="news-image"
                                    />
                                ) : (
                                    <Image
                                        width={100}
                                        height={100}
                                        className="object-contain w-full h-full rounded-lg aspect-16/9"
                                        src={BrandLogoFtHat}
                                        alt="news-image"
                                    />
                                )}
                            </Link>

                            <div className="w-full min-h-[18svh] gap-4 justify-between flex flex-col">
                                <div className="w-full flex flex-col gap-4">
                                    {/* Title section */}
                                    <div className="flex justify-between relative">
                                        <Link
                                            href={endPointBuild(
                                                baseHref,
                                                item.slug
                                            )}
                                            className="text-base lg:text-size-20 dark:text-[var(--brand-color)] text-brand-text font-semibold leading-relaxed max-w-3/4"
                                        >
                                            {item.title}
                                        </Link>
                                        {/* Interaction block */}
                                        <PostInteractionManager
                                            initialDislike={item.dislike}
                                            initialLike={item.like}
                                            initialViews={item.views}
                                            postId={item.id}
                                            initialInteractionType={
                                                item.currentInteractionType
                                            }
                                            containerClass={
                                                'lg:absolute top-0 right-0 z-10 flex gap-4 [&_*_svg]:size-4 text-sm'
                                            }
                                        />
                                    </div>
                                    {/* Description section */}
                                    <div
                                        className={
                                            'text-[var(--brand-grey-foreground)] text-sm leading-relaxed'
                                        }
                                    >
                                        {item.description}
                                    </div>
                                </div>

                                {/* Date & Reference source */}
                                <div className="flex w-full text-sm justify-between text-[var(--brand-grey-foreground)]/70 font-normal items-center">
                                    <div
                                        className={
                                            'flex w-fit text-xs lg:text-sm gap-4'
                                        }
                                    >
                                        <p>
                                            <T keyName={'common.market'} />:{' '}
                                            <span className={'text-brand-text'}>
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
                                        <p className={'hidden lg:block'}>
                                            <T keyName={'common.source'} />:{' '}
                                            {item.referenceSource}
                                        </p>
                                    </div>

                                    <AppShareButton slug={item.slug} />
                                </div>
                            </div>
                        </div>
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
