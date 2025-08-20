// app/(user-layout)/news-event/[slug]/page.tsx
import RichTextPreview from '@/components/rich-text-preview';
import Image from 'next/image';
import { NewsEventMockBanner } from '@image/index';
import { Label } from '@/components/ui/label';
import Tag from '@/app/(user-layout)/news-event/[slug]/components/tags';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getPost } from '@/app/api/posts';
import { TableOfContents } from '@/app/(user-layout)/news-event/[slug]/components/table-of-contents';

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
                    alt={post.title || 'details-banner'}
                    width={1920}
                    height={1080}
                    className="w-full h-auto mb-8 object-cover"
                    priority
                />

                {/* Post Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <div className="flex items-center text-[var(--brand-grey-foreground)] mb-4">
                        <span>
                            {format(new Date(post.createdAt), 'MM/dd/yyyy')}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{post.readingTime} min read</span>
                        <span className="mx-2">•</span>
                        <span>{post.views} views</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex space-x-16 w-full">
                    {/* Rich Text Content */}
                    <div className="basis-3/4">
                        <RichTextPreview contents={post.content} />
                    </div>

                    {/* Sidebar */}
                    <div className="basis-1/4 space-y-6">
                        {/* Table of Contents */}
                        <TableOfContents content={post.content} />

                        {/* Tags Section */}
                        <div className="bg-[var(--brand-black-bg)] w-full rounded-2xl p-6 overflow-hidden space-y-4">
                            <Label className="text-lg">Tags</Label>
                            <div className="flex flex-wrap gap-1">
                                {post.tags && post.tags.length > 0
                                    ? post.tags.map(tag => (
                                          <Tag
                                              key={tag.id} // Unique key from database
                                              label={`#${tag.name}`}
                                          />
                                      ))
                                    : // Fallback tags
                                      [
                                          '#tỷlệ',
                                          '#kinhtê',
                                          '#chính sách',
                                          '#xuấtkhẩu',
                                          '#vàngbạc',
                                          '#lợinhuận',
                                          '#niêmyết',
                                      ].map((tag, index) => (
                                          <Tag key={index} label={tag} />
                                      ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('💥 Failed to load post:', error);
        notFound();
    }
}
