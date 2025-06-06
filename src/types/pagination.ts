export interface Pagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
}
export interface PaginatedResponse<T> extends Pagination {
    data: T[];
}
