import { getUserSettingsOrCreate } from '@/services/user/get-user-setting';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSettings = (id: string) =>
    useQuery({
        queryFn: () => getUserSettingsOrCreate(id),
        queryKey: ['user-settings-query'],
    });
