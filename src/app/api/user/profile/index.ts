import { BaseResponse } from '@/types/base-response';
import { UserProfile } from '@/db/schema';
import { UserProfileData } from '@/app/api/user/profile/route';

const PROFILE_API_BASE = '/api/user/profile';

const GetUserProfileServerAction = async () => {
    const res = await fetch(PROFILE_API_BASE, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data: BaseResponse<UserProfile | null> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to get user profile');
    }

    return data;
};

const SaveUserProfileServerAction = async (payload: UserProfileData) => {
    const res = await fetch(PROFILE_API_BASE, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data: BaseResponse<UserProfile> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to save user profile');
    }

    return data;
};

export const profileApis = {
    GetUserProfileServerAction,
    SaveUserProfileServerAction,
};
