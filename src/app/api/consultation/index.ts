import { z } from 'zod';
import { BaseResponse } from '@/types/base-response';
import { Consultation } from '@/db/schema';
import { consultationRequestSchema } from '@/app/api/consultation/route';

const API_BASE = '/api/consultation';

export type PayloadConsultationRequest = z.infer<
    typeof consultationRequestSchema
>;

const ConsultationsRequest = async (payload: PayloadConsultationRequest) => {
    const res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data: BaseResponse<Consultation> = await res.json();
    if (!res.ok) {
        throw new Error(
            data.message || 'Failed to submit consultation request'
        );
    }

    return data;
};

export const consultationsRequestApis = {
    ConsultationsRequest,
};
