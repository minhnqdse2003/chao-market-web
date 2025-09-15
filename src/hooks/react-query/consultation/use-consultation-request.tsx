import { useAppMutation } from '@/hooks/react-query/use-custom-mutation';
import { BaseResponse } from '@/types/base-response';
import { consultationsRequestApis } from '@/app/api/consultation';
import { Consultation } from '@/db/schema';
import { z } from 'zod';
import { consultationRequestSchema } from '@/app/api/consultation/route';

export function useConsultationRequest() {
    return useAppMutation<
        BaseResponse<Consultation>,
        z.infer<typeof consultationRequestSchema>
    >({
        mutationFn: (payload: z.infer<typeof consultationRequestSchema>) =>
            consultationsRequestApis.ConsultationsRequest(payload),
        onSuccessMessage: 'Consultation request submitted successfully',
        onErrorMessage: 'Consultation request submission failed',
    });
}
