'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { newProductSchema } from '@/types/product/request/create-product';
import { createProduct } from '@/app/api/products';
import { queryClient } from '@/lib/query-client';
import { toast } from 'sonner';

export default function CreateProductPage() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const form = useForm<z.infer<typeof newProductSchema>>({
        resolver: zodResolver(newProductSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            stock: null,
            imageUrl: null,
        },
    });

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product created successfully!');
            form.reset();
            setImagePreview(null);
        },
        onError: error => {
            toast.error(error.message || 'Something went wrong!');
        },
    });

    function onSubmit(data: z.infer<typeof newProductSchema>) {
        mutation.mutate(data);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                form.setValue('imageUrl', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mx-auto py-10 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Create New Product</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter product name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter product description"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            {...field}
                                            onChange={e =>
                                                field.onChange(
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter stock quantity"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={e =>
                                                field.onChange(
                                                    e.target.value === ''
                                                        ? null
                                                        : parseInt(
                                                              e.target.value
                                                          )
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                            <FormItem>
                                <FormLabel>Product Image</FormLabel>
                                <FormControl>
                                    <div className="flex items-start gap-6">
                                        {imagePreview && (
                                            <div className="relative overflow-hidden rounded-md border">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-32 w-32 object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="cursor-pointer"
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Upload a product image
                                                (optional)
                                            </p>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Creating...' : 'Create Product'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
