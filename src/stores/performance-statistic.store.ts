// src/stores/performanceStatistic.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    PERFORMANCE_STATISTIC_DIALOG_ACTIONS,
    PerformanceStatisticAction,
} from '@/stores/actions/performance-statistic.action';

interface PerformanceStatisticStore {
    isOpen: boolean;
    isAccepted: boolean;
    dispatch: (action: PerformanceStatisticAction) => void;
}

export const usePerformanceStatisticStore = create(
    persist<PerformanceStatisticStore>(
        set => ({
            isOpen: false,
            isAccepted: false,
            dispatch: (action: PerformanceStatisticAction) => {
                switch (action.type) {
                    case PERFORMANCE_STATISTIC_DIALOG_ACTIONS.OPEN_DIALOG:
                        return set({ isOpen: true });
                    case PERFORMANCE_STATISTIC_DIALOG_ACTIONS.CLOSE_DIALOG:
                        return set({ isOpen: false });
                    case PERFORMANCE_STATISTIC_DIALOG_ACTIONS.MARK_AS_ACCEPTED:
                        return set({ isAccepted: true });
                    case PERFORMANCE_STATISTIC_DIALOG_ACTIONS.SET_DIALOG:
                        return set({ isOpen: action.payload });

                    default:
                        return;
                }
            },
        }),
        {
            name: 'performance-statistic-dialog-storage',
        }
    )
);
