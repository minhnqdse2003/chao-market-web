// src/components/TableOfContents.tsx
import React, { useMemo } from 'react';
import parse, { DOMNode } from 'html-react-parser';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface TableOfContentsProps {
    content: string;
}

interface Headline {
    id: string;
    text: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
    // Extract headlines from strong tags with simple IDs
    const headlines = useMemo<Headline[]>(() => {
        const extractedHeadlines: Headline[] = [];
        if (!content) return [];

        let index = 0;
        parse(content, {
            replace: (domNode: DOMNode) => {
                if (
                    domNode.type === 'tag' &&
                    domNode.name === 'strong' &&
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
    }, [content]);

    return (
        <Accordion
            type="single"
            className="dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] w-full rounded-2xl px-6 py-1 overflow-hidden shadow-sm"
            collapsible
            defaultValue={'item-1'}
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg cursor-pointer font-semibold">
                    Table of Contents
                </AccordionTrigger>
                <AccordionContent className="text-base font-thin leading-tight pt-4">
                    {headlines.length > 0 ? (
                        <ul className="list-decimal list-inside text-[var(--brand-grey-foreground)] space-y-4">
                            {headlines.map(headline => (
                                <li
                                    key={headline.id}
                                    className={
                                        'dark:hover:text-[var(--brand-color)] transition-colors! duration-300' +
                                        ' ease-in-out' +
                                        ' hover:font-semibold'
                                    }
                                >
                                    <a href={`#${headline.id}`}>
                                        {headline.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No table of contents available for this article.
                        </p>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
