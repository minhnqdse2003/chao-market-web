/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResponse } from '@/types/base-response';
import { ROLE } from '@/types/role';
import { getToken } from 'next-auth/jwt';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';

type Handler = (req: NextRequest, context?: any) => Promise<Response>;

export const withAuth = (
    handler: Handler,
    roles: Array<ROLE> = []
): Handler => {
    return async (req, context) => {
        try {
            const token = await getToken({
                req,
            });

            const isAuthorized = roles.includes((token as any)?.role);
            if (roles.length > 0 && !isAuthorized) {
                const unauthenticatedResponse: BaseResponse = {
                    message: 'Unauthorized',
                };
                return NextResponse.json(unauthenticatedResponse, {
                    status: 401,
                });
            }

            return await handler(req, context);
        } catch (error) {
            if (error instanceof ApiError) {
                return NextResponse.json(
                    { message: error.message },
                    { status: error.statusCode }
                );
            }
            return NextResponse.json(
                { message: 'Internal Server Error' },
                { status: 500 }
            );
        }
    };
};
