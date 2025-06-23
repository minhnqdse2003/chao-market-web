/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import { db } from '@/lib/db';
import { users, otpCodes } from '@/db/schema';
import { eq, and, gt, isNotNull } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { CustomAdapter } from './next-auth.adapter';

export const authOptions: NextAuthOptions = {
    adapter: CustomAdapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    ...profile,
                    id: profile.sub,
                };
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                otp: { label: 'OTP Code', type: 'text' },
            },
            async authorize(credentials) {
                if (!credentials?.email) {
                    console.log('Email not found');
                    return null;
                }

                const [user] = await db
                    .select()
                    .from(users)
                    .where(
                        and(
                            eq(users.email, credentials.email),
                            isNotNull(users.emailVerified)
                        )
                    )
                    .limit(1);

                if (!user) {
                    console.log('User not found {}');
                    return null;
                }

                // If OTP is provided, verify it
                if (!credentials.otp) {
                    const [otpRecord] = await db
                        .select()
                        .from(otpCodes)
                        .where(
                            and(
                                eq(otpCodes.userId, user.id),
                                eq(otpCodes.code, credentials.otp),
                                eq(otpCodes.verified, false),
                                gt(otpCodes.expires, new Date())
                            )
                        )
                        .limit(1);

                    if (!otpRecord) {
                        console.log('Otp record not found {}');
                        return null;
                    }

                    // Mark OTP as verified
                    await db
                        .update(otpCodes)
                        .set({ verified: true })
                        .where(eq(otpCodes.id, otpRecord.id));

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    };
                }

                // Verify password
                if (credentials.password && user.password) {
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValid) {
                        console.log('Password not matching');
                        return null;
                    } else {
                        console.log('Password match');
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
        newUser: '/dashboard',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const [existingUser] = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, user.id))
                    .limit(1);
                token.id = user.id;
                token.role = existingUser.role ?? 'USER';
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session as any).user.id = token.id as string;
                (session as any).user.role = token.role;
            }
            return session;
        },
    },
};
