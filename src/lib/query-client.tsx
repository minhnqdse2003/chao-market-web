// src/lib/react-query/queryClient.ts
import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

const defaultOptions: DefaultOptions = {
    queries: {
        refetchOnWindowFocus: true,
        retry: 1,
    },
    mutations: {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success('Operation completed successfully');
        },
    },
};

export const queryClient = new QueryClient({
    defaultOptions,
});
