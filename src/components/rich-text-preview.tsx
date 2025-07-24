import DOMPurify from 'isomorphic-dompurify';
import '@/components/tiptap-templates/simple/rich-text-content.scss';

export default function RichTextPreview({ contents }: { contents: string }) {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(contents, {
                    ADD_TAGS: ['mark'],
                    ADD_ATTR: ['style'],
                }),
            }}
            className="rich-text-content"
        />
    );
}
