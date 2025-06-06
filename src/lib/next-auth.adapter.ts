/* eslint-disable @typescript-eslint/no-explicit-any */
import { Adapter } from 'next-auth/adapters';
import { db } from './db';
import { accounts, sessions, users, verificationTokens } from '@/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

export const CustomAdapter: Adapter = {
    ...DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    async createUser(user: any) {
        return await db
            .insert(users)
            .values({
                ...user,
                role: user.role || 'USER',
            })
            .returning()
            .then(res => res[0] ?? null);
    },
};
