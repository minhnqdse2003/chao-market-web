import { BaseResponse } from '@/types/base-response';
import { ConsultationServices } from '@/db/schema';
import { GetConsultationFilterRequestParams } from '@/types/custom-solution/request';

const API_BASE = '/api/consultation-services';

const getAllConsultationServices = async (
    type?: 'Holistic' | 'Modular',
    filterParams?: GetConsultationFilterRequestParams
) => {
    const finalRequestParams = {
        ...filterParams,
        mainType: type ?? undefined,
    };

    const searchParams = new URLSearchParams();

    Object.entries(finalRequestParams).forEach(([key, value]) => {
        if (value) {
            searchParams.append(key, value.toString());
        }
    });

    const requestEndpoint = `${API_BASE}?${searchParams.toString()}`;
    const response = await fetch(requestEndpoint);

    const JsonParsedObject = await response.json();

    if (!response.ok) {
        throw new Error(JsonParsedObject.message);
    }

    return JsonParsedObject as BaseResponse<Array<ConsultationServices>>;
};

const getSelectedConsultationServices = async (ids: string[]) => {
    const response = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
    });

    const JsonParsedObject = await response.json();

    if (!response.ok) {
        throw new Error(JsonParsedObject.message);
    }

    return JsonParsedObject as BaseResponse<Array<ConsultationServices>>;
};

export const consultationServicesApis = {
    getAllConsultationServices,
    getSelectedConsultationServices,
};
