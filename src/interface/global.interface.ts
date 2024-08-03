export interface ReactChildren {
    children: React.ReactNode;
}

export interface PaginationInterface {
    currentPage: number;
    perpage: number;
    total: number;
    totalPages: number;
}

export const defaultPagination: PaginationInterface = {
    currentPage: 1,
    perpage: 10,
    totalPages: 1,
    total: 10,
};
