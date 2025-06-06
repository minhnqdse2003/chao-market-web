export interface BaseResponse<T = null> {
    message?: string;
    data?: T;
}
