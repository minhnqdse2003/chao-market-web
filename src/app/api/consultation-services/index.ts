import { BaseResponse } from '@/types/base-response';
import { ConsultationServices } from '@/db/schema';

const API_BASE = '/api/consultation-services';

const getAllConsultationServices = async (type?: 'Holistic' | 'Modular') => {
    const requestEndpoint = type ? `${API_BASE}?type=${type}` : API_BASE;
    const response = await fetch(requestEndpoint);

    const JsonParsedObject = await response.json();

    if (!response.ok) {
        throw new Error(JsonParsedObject.message);
    }

    return JsonParsedObject as BaseResponse<Array<ConsultationServices>>;
};

export const consultationServicesApis = {
    getAllConsultationServices,
};
