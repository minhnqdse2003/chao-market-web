// app/(user-layout)/chao-insights/[slug]/page.tsx
import RichTextPreview from '@/components/rich-text-preview';
import { notFound } from 'next/navigation';
import { getPost } from '@/app/api/posts';
import { TableOfContents } from '@/app/(user-layout)/chao-insights/[slug]/components/table-of-contents';
import { Clock } from 'lucide-react';
import AppInteractionBlock from '@/components/app-interaction-block';
import TagsAccordion from '@/app/(user-layout)/chao-insights/[slug]/components/tags';
import { Localized } from '@/types/localized';
import AppLocalizeRender from '@/components/app-localize-render';
import { T } from '@/components/app-translate';
import AppDateTimeDisplayLocalized from '@/components/app-date-time-display-localized';
import { processFinalUrl } from '@/utils/minio/process-final-url';

export interface PageProps {
    params: {
        slug: string;
    };
}

// SEO Metadata Generation
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;

    try {
        const response = await getPost(slug);
        const post = response.data;

        if (!post) {
            return {
                title: 'Post Not Found',
                description: 'The requested post could not be found.',
            };
        }

        return {
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.description,
            keywords: post.seoKeywords?.join(', '),
            openGraph: {
                title: post.seoTitle || post.title,
                description: post.seoDescription || post.description,
                images: post.ogImage ? [post.ogImage] : [],
                type: 'article',
                publishedTime: new Date(post.createdAt).toISOString(),
                tags: post.tags?.map(tag => tag.name) || [],
            },
            twitter: {
                card: 'summary_large_image',
                title: post.seoTitle || post.title,
                description: post.seoDescription || post.description,
                images: post.ogImage ? [post.ogImage] : [],
            },
        };
    } catch (error) {
        console.error('Failed to generate metadata:', error);
        return {
            title: 'News & Events',
            description: 'Stay updated with our latest news and events.',
        };
    }
}

export default async function NewsEventPage({ params }: PageProps) {
    const { slug } = await params;

    try {
        const response = await getPost(slug);
        const post = response.data;

        if (!post) {
            notFound();
        }

        return (
            <div className="w-full">
                {/* Banner Image */}
                <img
                    src={
                        post.imageUrl
                            ? processFinalUrl(post.imageUrl)
                            : '/img/news-events-mock-banner.svg'
                    }
                    alt={'details-banner'}
                    className="w-full aspect-21/9 h-auto max-h-[514px] mb-8 object-cover"
                />

                {/* Post Header */}
                <div className="flex flex-col gap-2 mb-4 w-full relative">
                    <div
                        className={
                            'flex text-sm gap-2 mb-2 items-center text-[var(--brand-grey-foreground)]/70'
                        }
                    >
                        <Clock className={'size-4'} />
                        {post.readingTime} <T keyName={'common.minRead'} />
                    </div>
                    <h1 className="text-size-22 text-brand-text dark:text-[var(--brand-color)] font-bold">
                        <AppLocalizeRender contents={post.title as Localized} />
                    </h1>
                    <div className="flex items-center text-[var(--brand-grey-foreground)]/70 text-sm">
                        <span>
                            <T keyName={'common.market'} />:{' '}
                            <span
                                className={
                                    'dark:text-[var(--brand-color)]' +
                                    ' text-brand-text'
                                }
                            >
                                {
                                    <T
                                        keyName={`common.marketType.${post.market.toLowerCase()}`}
                                    />
                                }
                            </span>
                        </span>
                        <span className={'mx-2'} />
                        <span>
                            <AppDateTimeDisplayLocalized
                                date={new Date(post.createdAt)}
                            />
                        </span>
                        <span className={'mx-2'} />
                        <span>
                            <T keyName={'common.source'} />:{' '}
                            {post.referenceSource}
                        </span>
                    </div>
                    <AppInteractionBlock
                        like={post.likes}
                        dislike={post.dislikes}
                        views={post.views}
                        containerClass={
                            'absolute top-0 right-0 flex gap-4 [&_*_svg]:size-4 text-sm'
                        }
                        isShareButtonVisible={true}
                    />
                </div>

                {/* Main Content */}
                <div className="flex space-x-16 w-full">
                    {/* Rich Text Content */}
                    <div className="basis-3/4">
                        <RichTextPreview contents={post.content as Localized} />
                    </div>

                    {/* Sidebar */}
                    <div className="basis-1/4 space-y-6">
                        {/* Table of Contents */}
                        <TableOfContents content={post.content as Localized} />

                        {/* Tags Section */}
                        <TagsAccordion tags={post.tags} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('💥 Failed to load post:', error);
        notFound();
    }
}
