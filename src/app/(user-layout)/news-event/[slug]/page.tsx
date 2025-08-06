import RichTextPreview from '@/components/rich-text-preview';
import { mockRichContent } from '@/app/(user-layout)/news-event/[slug]/utils';
import Image from 'next/image';
import { NewsEventMockBanner } from '@image/index';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import Tag from '@/app/(user-layout)/news-event/[slug]/components/tags';

// interface PageProps {
//     params: {
//         slug: string;
//     };
// }

export default function NewsEventPage() {
    // Get Slug
    // const { slug } = params;

    return (
        <div className="w-full">
            <Image
                src={NewsEventMockBanner}
                alt={'details-banner'}
                width={1920}
                height={1080}
                className="w-full h-auto mb-8 object-cover"
            />
            <div className="flex space-x-16 w-full">
                <RichTextPreview contents={mockRichContent} />
                <div className="basis-3/4 space-y-6">
                    <Accordion
                        type="single"
                        className="bg-[var(--brand-black-bg)] w-full rounded-2xl px-6 py-1 overflow-hidden)]"
                        collapsible
                        defaultValue={'item-1'}
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg cursor-pointer font-semibold">
                                Table of content
                            </AccordionTrigger>
                            <AccordionContent className="text-base font-thin leading-tight">
                                <ul className="list-decimal list-inside space-y-6">
                                    <li>
                                        <a href="#">
                                            Giá vàng miếng SJC sáng 19-5 tăng
                                            mạnh 800.000 đồng/lượng
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Đồng USD vẫn duy trì ở mức cao
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Kim loại quý này dự kiến tiếp tục
                                            biến động mạnh
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Rủi ro kinh tế toàn cầu có thể đẩy
                                            giá vàng tăng
                                        </a>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="bg-[var(--brand-black-bg)] w-full rounded-2xl p-6 overflow-hidden space-y-4">
                        <Label className="text-lg">Tags</Label>
                        <div className="flex flex-wrap gap-1">
                            {[
                                '#tỷlệ',
                                '#kinhtê',
                                '#chính sách',
                                '#xuấtkhẩu',
                                '#vàngbạc',
                                '#lợinhuận',
                                '#niêmyết',
                            ].map(tag => (
                                <Tag key={tag} label={tag} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
