import DOMPurify from 'isomorphic-dompurify';
import '@/components/tiptap-templates/simple/rich-text-content.scss';

export default function RichTextPreview({ contents }: { contents: string }) {
    // Add simple IDs to strong elements in the content
    let index = 0;
    const contentWithIds = contents.replace(
        /<strong[^>]*>(.*?)<\/strong>/g,
        match => {
            const id = `title-${index}`;
            index++;
            return `<strong><span id="${id}"></span>${match.slice(8, -9)}</strong>`;
        }
    );

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
