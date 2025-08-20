// src/components/TableOfContents.tsx

import React, { useMemo } from 'react';
import parse from 'html-react-parser';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'; // Adjust path if needed

interface TableOfContentsProps {
    content: string; // The rich text HTML string
}

export function TableOfContents({ content }: TableOfContentsProps) {
    // The logic for extracting headlines remains the same.
    const headlines = useMemo(() => {
        const extractedHeadlines: string[] = [];
        if (!content) {
            return [];
        }

        parse(content, {
            replace: domNode => {
                if (
                    domNode.type === 'tag' &&
                    domNode.name === 'strong' &&
                    domNode.children[0]?.type === 'text'
                ) {
                    const text = domNode.children[0].data.trim();
                    const cleanedText = text.replace(/^\d+\s*\.\s*/, '').trim();

                    if (cleanedText) {
                        extractedHeadlines.push(cleanedText);
                    }
                }
                return null;
            },
        });

        return extractedHeadlines;
    }, [content]);

    // The Accordion structure is now ALWAYS rendered.
    return (
        <Accordion
            type="single"
            className="bg-[var(--brand-black-bg)] w-full rounded-2xl px-6 py-1 overflow-hidden"
            collapsible
            defaultValue={'item-1'}
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg cursor-pointer font-semibold">
                    Table of Contents
                </AccordionTrigger>
                <AccordionContent className="text-base font-thin leading-tight pt-4">
                    {headlines.length > 0 ? (
                        <ul className="list-decimal list-inside space-y-4">
                            {headlines.map((text, index) => (
                                <li key={`${text}-${index}`}>
                                    <a href="#">{text}</a>
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
