import NewsEventPage, {
    generateMetadata as generateNewsEventMetadata,
    PageProps,
} from '@/app/(user-layout)/news-event/[slug]/page';

export async function generateMetadata(props: PageProps) {
    return generateNewsEventMetadata(props);
}

export default NewsEventPage;
