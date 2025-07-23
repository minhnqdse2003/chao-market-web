'use-client';
import React from 'react';
import { NewsType } from '../utils/data-utils';
import { Eye, Share, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import NavSeparator from '@/components/nav-separator';

const NewsComp = ({ news }: { news: NewsType[] }) => {
    return (
        <>
            {news.map((item, idx) => (
                <div
                    className="flex flex-col w-full items-end"
                    key={item.title}
                >
                    <div className="flex w-full gap-[2rem]">
                        {/* Image Block */}
                        <Image
                            width={1920}
                            height={1080}
                            className="object-cover w-full max-w-3/10 h-[10rem] rounded-lg"
                            src={item.image}
                            alt="news-image"
                        />
                        {/* News Information Block */}
                        <div className="w-7/10 flex flex-col gap-4">
                            {/* Title section */}
                            <div className="flex justify-between">
                                <p className="font-bold">{item.title}</p>
                                {/* Interaction block */}
                                <div className="flex gap-4 [&_*_svg]:size-3 text-sm">
                                    {/* Like */}
                                    <div className="flex items-center gap-1">
                                        <div>
                                            <ThumbsUpIcon />
                                        </div>
                                        {item.like}
                                    </div>
                                    {/* Dislike */}
                                    <div className="flex items-center gap-1">
                                        <div>
                                            <ThumbsDownIcon />
                                        </div>
                                        {item.dislike}
                                    </div>
                                    {/* Views */}
                                    <div className="flex items-center gap-1">
                                        <div>
                                            <Eye />
                                        </div>
                                        {item.views}
                                    </div>
                                </div>
                            </div>
                            {/* Description section */}
                            <div>{item.description}</div>
                        </div>
                    </div>
                    <div className="w-[calc(70%-2rem)] flex justify-between">
                        {/* Date & Reference source */}
                        <div className="flex w-fit gap-4">
                            <p className="dark:text-[var(--brand-grey-foreground)] font-semibold">
                                {item.date}
                            </p>
                            <p>{item.referenceSource}</p>
                        </div>
                        <Button className="dark:bg-[#525252] dark:text-white rounded-3xl font-normal">
                            <Share />
                            Share
                        </Button>
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
