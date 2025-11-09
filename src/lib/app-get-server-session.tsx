import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth.config';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function appGetServerSession(context: any) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return null;
    }

    return session;
}
