import { useAppQuery } from '@/hooks/react-query/use-custom-query';
import { APP_QUERY_KEY } from '@/constant';
import { consultationServicesApis } from '@/app/api/consultation-services';
import { useCartStore } from '@/stores/cart.store';

export function useConsultationServices() {
    return useAppQuery({
        queryKey: [APP_QUERY_KEY.CONSULTATIONS_SERVICES],
        queryFn: async () => {
            return await consultationServicesApis.getAllConsultationServices();
        },
    });
}

export function useConsultationServicesModularApproach() {
    return useAppQuery({
        queryKey: [APP_QUERY_KEY.CONSULTATION_SERVICES_MODULAR],
        queryFn: async () => {
            return await consultationServicesApis.getAllConsultationServices(
                'Modular'
            );
        },
    });
}

export function useSelectedConsultationServices() {
    const itemIds = useCartStore(state => state.itemIds);

    return useAppQuery({
        // Include itemIds in the key so it refetches when the cart changes
        queryKey: [APP_QUERY_KEY.SELECTED_CONSULTATION_SERVICES, itemIds],
        queryFn: async () => {
            return await consultationServicesApis.getSelectedConsultationServices(
                itemIds
            );
        },
        options: {
            enabled: itemIds.length > 0,
        },
    });
}
