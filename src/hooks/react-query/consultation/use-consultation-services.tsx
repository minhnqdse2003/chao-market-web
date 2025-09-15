import { useAppQuery } from '@/hooks/react-query/use-custom-query';
import { APP_QUERY_KEY } from '@/constant';
import { consultationServicesApis } from '@/app/api/consultation-services';

export function useConsultationServices() {
    return useAppQuery({
        queryKey: [APP_QUERY_KEY.CONSULTATIONS_SERVICES],
        queryFn: async () => {
            return await consultationServicesApis.getAllConsultationServices();
        },
    });
}
