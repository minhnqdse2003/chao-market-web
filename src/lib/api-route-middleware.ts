/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResponse } from '@/types/base-response';
import { ROLE } from '@/types/role';
import { getToken } from 'next-auth/jwt';
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

            return handler(req, context);
        } catch (error) {
            console.log('500: {} ' + error);
            return NextResponse.json(
                { message: 'Internal Server Error' },
                { status: 500 }
            );
        }
    };
};
