'use client';
// src/components/TableOfContents.tsx
import React, { useMemo } from 'react';
import parse, { DOMNode } from 'html-react-parser';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Localized } from '@/types/localized';
import { useI18n } from '@/context/i18n/context';
import { CURRENT_POST_HEADLINE } from '@/constant/current-headline';

interface TableOfContentsProps {
    content: Localized;
}

interface Headline {
    id: string;
    text: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const { locale, t } = useI18n();

    const headlines = useMemo<Headline[]>(() => {
        const extractedHeadlines: Headline[] = [];
        if (!content) return [];

        let index = 0;
        parse(content[locale as 'en' | 'vi'], {
            replace: (domNode: DOMNode) => {
                if (
                    domNode.type === 'tag' &&
                    domNode.name === CURRENT_POST_HEADLINE &&
                    domNode.children[0]?.type === 'text'
                ) {
                    const text = domNode.children[0].data.trim();
                    const cleanedText = text.replace(/^\d+\s*\.\s*/, '').trim();

                    if (cleanedText) {
                        const id = `title-${index}`;
                        index++;

                        extractedHeadlines.push({
                            id,
                            text: cleanedText,
                        });
                    }
                }
                return null;
            },
        });

        return extractedHeadlines;
    }, [content, locale]);

    return (
        <Accordion
            type="single"
            className="dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] w-full rounded-2xl px-6 py-1 overflow-hidden shadow-sm"
            collapsible
            defaultValue={'item-1'}
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm lg:text-lg cursor-pointer font-semibold">
                    {t('common.tableOfContent')}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-thin leading-tight pt-4">
                    {headlines.length > 0 ? (
                        <ul className="list-decimal list-inside text-[var(--brand-grey-foreground)] font-normal space-y-4">
                            {headlines.map(headline => (
                                <li
                                    key={headline.id}
                                    className={
                                        'dark:hover:text-[var(--brand-color)] transition-colors! duration-300' +
                                        ' ease-in-out' +
                                        ' hover:text-black'
                                    }
                                >
                                    <a href={`#${headline.id}`}>
                                        {headline.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm font-semibold text-[var(--brand-grey-foreground)]">
                            No table of contents available for this article.
                        </p>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
