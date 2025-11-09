/* eslint-disable @typescript-eslint/no-explicit-any */

import ProfileHeader from './components/profile-header';
import ProfileContent from './components/profile-content';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth.config';
import { getUsersById } from '@/services/user/get-users-by-id';
import { redirect } from 'next/navigation';

export default async function Page({
    searchParams,
}: {
    searchParams: { tab?: string };
}) {
    const session = await getServerSession(authOptions);
    const userData = session
        ? await getUsersById((session.user as any).id)
        : null;
    const { tab } = searchParams;

    if (userData === null) return redirect('/home');

    return (
        <div className="w-full h-full mx-auto space-y-6">
            <ProfileHeader userData={userData} />
            <ProfileContent
                searchParams={{ tab: tab || undefined }}
                userData={userData}
            />
        </div>
    );
}
