import { DisclaimerAction } from '@/stores/actions/dislaimer.action';
import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';

interface DisclaimerStore {
    isRead: boolean;
    dispatch: (action: DisclaimerAction) => void;
}

export const useDisclaimerStore = create(
    persist<DisclaimerStore>(
        set => ({
            isRead: false,
            dispatch: (action: DisclaimerAction) => {
                switch (action.type) {
                    case 'MARK_AS_READ':
                        return set({ isRead: true });
                }
            },
        }),
        { name: 'disclaimer-local-storage' }
    )
);
