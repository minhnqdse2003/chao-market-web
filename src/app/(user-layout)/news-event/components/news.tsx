import { NewsType } from '../utils/data-utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import NavSeparator from '@/components/nav-separator';
import Link from 'next/link';
import { dateTimeFormat } from '@/utils/date-time-format';
import { ShareIcon } from '@image/index';
import AppInteractionBlock from '@/components/app-interaction-block';

const NewsComp = ({
    news,
    baseHref = '/news-event',
}: {
    news: NewsType[];
    baseHref?: string;
}) => {
    return (
        <>
            {news.map((item, idx) => (
                <Link
                    className="flex flex-col w-full items-end cursor-pointer"
                    key={item.title}
                    href={`${baseHref}/${item.slug}`}
                >
                    <div className="flex w-full gap-[2rem]">
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
                                <p className="text-lg font-bold">
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
                            <div>{item.description}</div>
                        </div>
                    </div>
                    <div className="w-[calc(70%-2rem)] flex justify-between">
                        {/* Date & Reference source */}
                        <div className="flex w-fit text-sm gap-4 dark:text-[var(--brand-grey-foreground)] font-semibold">
                            <p>{dateTimeFormat(new Date(item.date))}</p>
                            <p>Source: {item.referenceSource}</p>
                        </div>
                        <Button className="dark:bg-[#525252] dark:text-white rounded-3xl font-normal">
                            <Image
                                src={ShareIcon}
                                alt={'share-icon'}
                                width={100}
                                height={100}
                                className="size-3"
                            />
                            Share
                        </Button>
                    </div>
                    {idx !== news.length - 1 && (
                        <NavSeparator isTrigger={false} />
                    )}
                </Link>
            ))}
        </>
    );
};

export default NewsComp;
