import ProfileHeader from './components/profile-header';
import ProfileContent from './components/profile-content';
import { use } from 'react';

export default function Page({
    searchParams,
}: {
    searchParams: { tab?: string };
}) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { tab } = use(searchParams);

    return (
        <div className="w-full h-full mx-auto space-y-6">
            <ProfileHeader />
            <ProfileContent searchParams={{ tab: tab || undefined }} />
        </div>
    );
}
