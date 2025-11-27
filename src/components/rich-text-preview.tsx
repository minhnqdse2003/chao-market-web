'use client';
import DOMPurify from 'isomorphic-dompurify';
import '@/components/tiptap-templates/simple/rich-text-content.scss';
import { useI18n } from '@/context/i18n/context';
import { Localized } from '@/types/localized';
import { useEffect, useState } from 'react';

export default function RichTextPreview({ contents }: { contents: Localized }) {
    // Add simple IDs to strong elements in the content
    const { locale } = useI18n();
    const [localizedContents, setLocalizedContents] = useState<string>(
        contents[locale as 'en' | 'vi'] as string
    );
    let index = 0;

    const contentWithIds = localizedContents.replace(
        /<h1[^>]*>(.*?)<\/h1>/g,
        match => {
            const id = `title-${index}`;
            index++;
            return `<h1><span id="${id}"></span>${match}</h1>`;
        }
    );

    useEffect(() => {
        setLocalizedContents(contents[locale as 'en' | 'vi'] as string);
    }, [locale, contents]);

    console.log(localizedContents);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(contentWithIds, {
                    ADD_TAGS: ['mark', 'span'],
                    ADD_ATTR: ['style', 'id'],
                }),
            }}
            className="rich-text-content"
        />
    );
}
