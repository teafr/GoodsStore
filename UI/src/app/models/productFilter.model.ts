export interface ProductFilter {
  minPrice?: number;
  maxPrice?: number;
  unit?: string;
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}