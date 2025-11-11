// app/(user-layout)/news-event/[slug]/page.tsx
import RichTextPreview from '@/components/rich-text-preview';
import Image from 'next/image';
import { NewsEventMockBanner } from '@image/index';
import { notFound } from 'next/navigation';
import { getPost } from '@/app/api/posts';
import { TableOfContents } from '@/app/(user-layout)/news-event/[slug]/components/table-of-contents';
import { Clock } from 'lucide-react';
import AppInteractionBlock from '@/components/app-interaction-block';
import TagsAccordion from '@/app/(user-layout)/news-event/[slug]/components/tags';
import { Localized } from '@/types/localized';
import AppLocalizeRender from '@/components/app-localize-render';
import { T } from '@/components/app-translate';
import AppDateTimeDisplayLocalized from '@/components/app-date-time-display-localized';

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
                <Image
                    src={NewsEventMockBanner}
                    alt={'details-banner'}
                    width={1920}
                    height={1080}
                    className="w-full h-auto mb-8 object-cover"
                    priority
                />

                {/* Post Header */}
                <div className="flex flex-col gap-2 mb-4 w-full relative">
                    <div
                        className={
                            'flex gap-2 mb-2 items-center text-[var(--brand-grey-foreground)]'
                        }
                    >
                        <Clock className={'size-4'} />
                        {post.readingTime} <T keyName={'common.minRead'} />
                    </div>
                    <h1 className="text-3xl font-bold">
                        <AppLocalizeRender contents={post.title as Localized} />
                    </h1>
                    <div className="flex items-center text-[var(--brand-grey-foreground)]">
                        <span>
                            <T keyName={'common.market'} />: {post.market}
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
