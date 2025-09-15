import { BaseResponse } from '@/types/base-response';
import { ConsultationServices } from '@/db/schema';

const API_BASE = '/api/consultation-services';

const getAllConsultationServices = async () => {
    const response = await fetch(API_BASE);

    const JsonParsedObject = await response.json();

    if (!response.ok) {
        throw new Error(JsonParsedObject.message);
    }

    return JsonParsedObject as BaseResponse<Array<ConsultationServices>>;
};

export const consultationServicesApis = {
    getAllConsultationServices,
};
