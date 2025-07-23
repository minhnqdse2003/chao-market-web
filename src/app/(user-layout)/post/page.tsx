'use client';
import { useState } from 'react';
import {
    EditorRef,
    SimpleEditor,
} from '@/components/tiptap-templates/simple/simple-editor';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useAppQuery } from '@/hooks/react-query/use-custom-query';
import { createPost, getPost, getPosts } from '@/app/api/posts';
import { useAppMutation } from '@/hooks/react-query/use-custom-mutation';
import { Post } from '@/db/schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    CreateNewPost,
    createPostSchema,
} from '@/types/post/request/create-post';
import { z } from 'zod/v4';
import { toast } from 'sonner';

export default function PostPage() {
    const editorRef = useRef<EditorRef>(null);
    const [formData, setFormData] = useState<CreateNewPost>({
        title: '',
        description: '',
        content: '',
        referenceSource: '',
    });
    const [errors, setErrors] = useState<string | null>(null);

    const { data: posts, isFetching } = useAppQuery({
        queryFn: getPosts,
        queryKey: ['posts'],
    });

    const { data: post, isFetching: postFetching } = useAppQuery({
        queryFn: () => getPost('1'),
        queryKey: ['posts', 1],
    });

    const { mutate, isSuccess, isPending, reset } = useAppMutation<
        unknown,
        Partial<Post>
    >({
        mutationFn: async (data: Partial<Post>) => createPost(data),
        mutationKey: ['posts', 'create'],
        onSuccess: () => {
            // Reset form
            setFormData({
                title: '',
                description: '',
                content: '',
                referenceSource: '',
            });
            reset();
        },
    });

    const handleSubmit = async (
        e: React.FormEvent,
        refContent: string | undefined
    ) => {
        e.preventDefault();
        const value: CreateNewPost = {
            ...formData,
            content: refContent || '',
        };
        const validatedData = createPostSchema.safeParse(value);
        if (validatedData.success) {
            mutate(validatedData.data);
        } else {
            setErrors(z.prettifyError(validatedData.error));
        }
    };

    const handleInputChange = (field: keyof CreateNewPost, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };
    if (isSuccess) {
        toast.success('Post created successfully');
    }

    return (
        <div className="w-full h-[90svh] overflow-y-auto p-4">
            <div>
                <Label>Content *</Label>
                <SimpleEditor ref={editorRef}>
                    <form
                        onSubmit={e =>
                            handleSubmit(e, editorRef.current?.getHTML())
                        }
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={e =>
                                    handleInputChange('title', e.target.value)
                                }
                                placeholder="Enter post title"
                                className={errors ? 'border-red-500' : ''}
                            />
                            {errors && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={e =>
                                    handleInputChange(
                                        'description',
                                        e.target.value
                                    )
                                }
                                placeholder="Enter post description"
                            />
                        </div>

                        <div>
                            <Label htmlFor="referenceSource">
                                Reference Source (URL)
                            </Label>
                            <Input
                                id="referenceSource"
                                value={formData.referenceSource}
                                onChange={e =>
                                    handleInputChange(
                                        'referenceSource',
                                        e.target.value
                                    )
                                }
                                placeholder="https://example.com"
                                type="url"
                                required={false}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="mt-4"
                        >
                            {isPending ? 'Creating Post...' : 'Create Post'}
                        </Button>
                    </form>
                </SimpleEditor>
            </div>

            <Button disabled={isFetching}>{JSON.stringify(posts)}</Button>
            <Button disabled={postFetching}>{JSON.stringify(post)}</Button>
        </div>
    );
}
