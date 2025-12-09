// app/(user-layout)/chao-insights/[slug]/page.tsx
import RichTextPreview from '@/components/rich-text-preview';
import { notFound } from 'next/navigation';
import { TableOfContents } from '@/app/(user-layout)/chao-insights/[slug]/components/table-of-contents';
import { Clock } from 'lucide-react';
import TagsAccordion from '@/app/(user-layout)/chao-insights/[slug]/components/tags';
import { Localized } from '@/types/localized';
import AppLocalizeRender from '@/components/app-localize-render';
import { T } from '@/components/app-translate';
import AppDateTimeDisplayLocalized from '@/components/app-date-time-display-localized';
import { processFinalUrl } from '@/utils/minio/process-final-url';
import PostInteractionManager from '@/components/app-interaction-block';
import { getPost } from '@/app/api/posts/[id]';

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
                    style={{
                        borderRadius: post.imageUrl ? '1rem' : '0',
                    }}
                />

                {/* Post Header */}
                <div className="flex flex-col gap-2 mb-4 w-full relative">
                    <div
                        className={
                            'flex text-xs lg:text-sm gap-2 mb-2 items-center text-[var(--brand-grey-foreground)]/70'
                        }
                    >
                        <Clock className={'size-4'} />
                        {post.readingTime} <T keyName={'common.minRead'} />
                    </div>
                    <h1 className="text-lg lg:text-size-22 text-brand-text dark:text-[var(--brand-color)] font-bold">
                        <AppLocalizeRender contents={post.title as Localized} />
                    </h1>
                    <div className="flex items-center text-[var(--brand-grey-foreground)]/70 text-xs lg:text-sm">
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
                    <PostInteractionManager
                        initialLike={post.likes}
                        initialDislike={post.dislikes}
                        initialViews={post.views}
                        containerClass={
                            'lg:absolute top-0 right-0 flex gap-4 [&_*_svg]:size-4 text-sm'
                        }
                        postId={post.id}
                        initialInteractionType={post.currentInteractionType}
                        isShareButtonVisible={true}
                    />
                </div>

                {/* Main Content */}
                <div className="flex flex-col-reverse lg:flex-row space-x-4 lg:space-x-16 w-full relative">
                    {/* Rich Text Content */}
                    <div className="lg:basis-3/4">
                        <RichTextPreview contents={post.content as Localized} />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:basis-1/4 lg:sticky top-12 right-0 h-fit space-y-6">
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
