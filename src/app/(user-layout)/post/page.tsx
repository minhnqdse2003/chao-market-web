'use client';
import { useEffect, useState } from 'react';
import {
    EditorRef,
    SimpleEditor,
} from '@/components/tiptap-templates/simple/simple-editor';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { createPost } from '@/app/api/posts';
import { useAppMutation } from '@/hooks/react-query/use-custom-mutation';
import { Post } from '@/db/schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { createTag, getAllTags } from '@/app/api/posts/tags';
import { toast } from 'sonner';

// Shadcn Form imports
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// React Hook Form and Zod imports
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    CreateNewPost,
    createPostSchema,
} from '@/types/post/request/create-post';

export default function PostPage() {
    const editorRef = useRef<EditorRef>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [newTagInput, setNewTagInput] = useState('');
    const [keywordsInput, setKeywordsInput] = useState('');

    // Fetch all available tags
    const { data: availableTags = [], isLoading: isLoadingTags } = useQuery({
        queryKey: ['tags'],
        queryFn: getAllTags,
    });

    // Initialize the form
    const form = useForm<CreateNewPost>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: '',
            description: '',
            content: '',
            referenceSource: '',
            type: 'news',
            slug: undefined,
            seoTitle: '',
            seoDescription: '',
            seoKeywords: [],
            ogImage: undefined,
            canonicalUrl: undefined,
            robots: '',
            tagIds: [],
        },
    });

    const { mutate, isPending } = useAppMutation<unknown, Partial<Post>>({
        mutationFn: async (data: Partial<Post>) => createPost(data),
        mutationKey: ['posts', 'create'],
        onSuccess: () => {
            form.reset();
            setSelectedTags([]);
            setNewTagInput('');
            setKeywordsInput('');
            if (editorRef.current) {
                editorRef.current.getEditor()?.commands.clearContent();
            }
            toast.success('Post created successfully');
        },
        onError: error => {
            toast.error('Failed to create post', {
                description:
                    error instanceof Error ? error.message : 'Unknown error',
            });
        },
    });

    const onSubmit = async (data: CreateNewPost) => {
        try {
            // Process keywords from comma-separated string to array
            const processedKeywords = keywordsInput
                .split(',')
                .map(k => k.trim())
                .filter(k => k.length > 0);

            const formData = {
                ...data,
                content: editorRef.current?.getHTML() || '',
                seoKeywords:
                    processedKeywords.length > 0
                        ? processedKeywords
                        : undefined,
                tagIds: selectedTags,
            };

            console.log('Submitting form data:', formData); // Debug log
            mutate(formData);
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Form submission failed');
        }
    };

    const toggleTagSelection = (tagId: string) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    const handleCreateNewTag = async () => {
        if (newTagInput.trim()) {
            try {
                const existingTag = availableTags.find(
                    (tag: { name: string }) =>
                        tag.name.toLowerCase() ===
                        newTagInput.trim().toLowerCase()
                );

                if (existingTag) {
                    toggleTagSelection(existingTag.id);
                    setNewTagInput('');
                    return;
                }

                const newTag = await createTag(newTagInput.trim());
                setSelectedTags(prev => [...prev, newTag.id]);
                setNewTagInput('');
                toast.success('Tag created successfully');
            } catch (error) {
                toast.error('Failed to create tag', {
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                });
            }
        }
    };

    useEffect(() => {
        const subscription = form.watch((value, { name, type }) => {
            console.log('Form changed:', { name, type, value });
        });
        return () => subscription.unsubscribe();
    }, [form]);

    return (
        <div className="w-full h-[90svh] overflow-y-auto p-4">
            <div>
                <SimpleEditor ref={editorRef}>
                    <Form {...form}>
                        <form
                            onSubmit={e => {
                                console.log('🎯 Form submit event triggered');
                                e.preventDefault(); // Prevent default browser submission
                                form.handleSubmit(
                                    data => {
                                        console.log(
                                            '✅ Valid form data:',
                                            data
                                        );
                                        onSubmit(data);
                                    },
                                    errors => {
                                        console.log(
                                            '❌ Form validation errors:',
                                            errors
                                        );
                                        toast.error(
                                            'Please check the form for errors'
                                        );
                                    }
                                )(e); // Pass the event to handleSubmit
                            }}
                            className="space-y-4 [&_*_input]:mt-2 [&_*_input:last-child]:mb-6"
                        >
                            <div className="flex justify-between items-center">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="w-2/3">
                                            <FormLabel>Title *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter post title"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-[var(--brand-color)] hover:bg-[var(--brand-color)] text-black"
                                    tabIndex={-1}
                                >
                                    {isPending
                                        ? 'Creating Post...'
                                        : 'Create Post'}
                                </Button>
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter post description"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Post Type *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select post type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="news">
                                                    News
                                                </SelectItem>
                                                <SelectItem value="events">
                                                    Events
                                                </SelectItem>
                                                <SelectItem value="community">
                                                    Community
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="referenceSource"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Reference Source (URL)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="https://example.com"
                                                type="url"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Tags Section */}
                            <div className="border-t pt-4 mt-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Tags
                                </h3>
                                {isLoadingTags ? (
                                    <p>Loading tags...</p>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {availableTags.map(
                                                (tag: {
                                                    id: string;
                                                    name: string;
                                                }) => (
                                                    <Badge
                                                        key={tag.id}
                                                        variant={
                                                            selectedTags.includes(
                                                                tag.id
                                                            )
                                                                ? 'default'
                                                                : 'outline'
                                                        }
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            toggleTagSelection(
                                                                tag.id
                                                            )
                                                        }
                                                    >
                                                        {tag.name}
                                                        {selectedTags.includes(
                                                            tag.id
                                                        ) && (
                                                            <X className="ml-1 h-3 w-3" />
                                                        )}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                value={newTagInput}
                                                onChange={e =>
                                                    setNewTagInput(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Create new tag"
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleCreateNewTag();
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                onClick={handleCreateNewTag}
                                                variant="outline"
                                            >
                                                Add Tag
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* SEO Fields Section */}
                            <div className="border-t pt-4 mt-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    SEO Settings
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Slug</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="custom-url-slug"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Leave blank to auto-generate
                                                    from title
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="seoTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SEO Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Title for search results"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="md:col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="seoDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        SEO Description
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Description for search results"
                                                            rows={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormItem>
                                            <FormLabel>SEO Keywords</FormLabel>
                                            <FormControl>
                                                <Input
                                                    value={keywordsInput}
                                                    onChange={e =>
                                                        setKeywordsInput(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="keyword1, keyword2, keyword3"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Separate keywords with commas
                                            </FormDescription>
                                        </FormItem>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="ogImage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Open Graph Image (URL)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="https://example.com/image.jpg"
                                                        type="url"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="canonicalUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Canonical URL
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="https://example.com/canonical"
                                                        type="url"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="robots"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Robots Meta Tag
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="index, follow"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </SimpleEditor>
            </div>
        </div>
    );
}
