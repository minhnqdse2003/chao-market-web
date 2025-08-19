// utils/slugify.ts
import { posts } from '@/db/schema';
import { and, eq, ne } from 'drizzle-orm';
import { db } from '@/lib/db';

// utils/slugify.ts
export function slugify(text: string): string {
    // Vietnamese character mapping
    const vietnameseMap: { [key: string]: string } = {
        à: 'a',
        á: 'a',
        ạ: 'a',
        ả: 'a',
        ã: 'a',
        â: 'a',
        ầ: 'a',
        ấ: 'a',
        ậ: 'a',
        ẩ: 'a',
        ẫ: 'a',
        ă: 'a',
        ằ: 'a',
        ắ: 'a',
        ặ: 'a',
        ẳ: 'a',
        ẵ: 'a',
        è: 'e',
        é: 'e',
        ẹ: 'e',
        ẻ: 'e',
        ẽ: 'e',
        ê: 'e',
        ề: 'e',
        ế: 'e',
        ệ: 'e',
        ể: 'e',
        ễ: 'e',
        ì: 'i',
        í: 'i',
        ị: 'i',
        ỉ: 'i',
        ĩ: 'i',
        ò: 'o',
        ó: 'o',
        ọ: 'o',
        ỏ: 'o',
        õ: 'o',
        ô: 'o',
        ồ: 'o',
        ố: 'o',
        ộ: 'o',
        ổ: 'o',
        ỗ: 'o',
        ơ: 'o',
        ờ: 'o',
        ớ: 'o',
        ợ: 'o',
        ở: 'o',
        ỡ: 'o',
        ù: 'u',
        ú: 'u',
        ụ: 'u',
        ủ: 'u',
        ũ: 'u',
        ư: 'u',
        ừ: 'u',
        ứ: 'u',
        ự: 'u',
        ử: 'u',
        ữ: 'u',
        ỳ: 'y',
        ý: 'y',
        ỵ: 'y',
        ỷ: 'y',
        ỹ: 'y',
        đ: 'd',
        À: 'A',
        Á: 'A',
        Ạ: 'A',
        Ả: 'A',
        Ã: 'A',
        Â: 'A',
        Ầ: 'A',
        Ấ: 'A',
        Ậ: 'A',
        Ẩ: 'A',
        Ẫ: 'A',
        Ă: 'A',
        Ằ: 'A',
        Ắ: 'A',
        Ặ: 'A',
        Ẳ: 'A',
        Ẵ: 'A',
        È: 'E',
        É: 'E',
        Ẹ: 'E',
        Ẻ: 'E',
        Ẽ: 'E',
        Ê: 'E',
        Ề: 'E',
        Ế: 'E',
        Ệ: 'E',
        Ể: 'E',
        Ễ: 'E',
        Ì: 'I',
        Í: 'I',
        Ị: 'I',
        Ỉ: 'I',
        Ĩ: 'I',
        Ò: 'O',
        Ó: 'O',
        Ọ: 'O',
        Ỏ: 'O',
        Õ: 'O',
        Ô: 'O',
        Ồ: 'O',
        Ố: 'O',
        Ộ: 'O',
        Ổ: 'O',
        Ỗ: 'O',
        Ơ: 'O',
        Ờ: 'O',
        Ớ: 'O',
        Ợ: 'O',
        Ở: 'O',
        Ỡ: 'O',
        Ù: 'U',
        Ú: 'U',
        Ụ: 'U',
        Ủ: 'U',
        Ũ: 'U',
        Ư: 'U',
        Ừ: 'U',
        Ứ: 'U',
        Ự: 'U',
        Ử: 'U',
        Ữ: 'U',
        Ỳ: 'Y',
        Ý: 'Y',
        Ỵ: 'Y',
        Ỷ: 'Y',
        Ỹ: 'Y',
        Đ: 'D',
    };

    // Replace Vietnamese characters
    let result = text;
    for (const [vietnameseChar, latinChar] of Object.entries(vietnameseMap)) {
        result = result.replace(new RegExp(vietnameseChar, 'g'), latinChar);
    }

    // Convert to lowercase and handle remaining special characters
    return result
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove remaining special characters
        .replace(/[\s_-]+/g, '-') // Convert spaces/hyphens/underscores to single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export async function createUniqueSlug(
    title: string,
    postId?: string
): Promise<string> {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    // Check if slug exists (excluding current post if updating)
    let existingPosts = await db
        .select({ id: posts.id })
        .from(posts)
        .where(
            postId
                ? and(eq(posts.slug, slug), ne(posts.id, postId))
                : eq(posts.slug, slug)
        );

    while (existingPosts.length > 0) {
        slug = `${baseSlug}-${counter}`;
        counter++;

        existingPosts = await db
            .select({ id: posts.id })
            .from(posts)
            .where(
                postId
                    ? and(eq(posts.slug, slug), ne(posts.id, postId))
                    : eq(posts.slug, slug)
            );
    }

    return slug;
}
