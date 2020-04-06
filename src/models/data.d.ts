export interface LaravelPagination {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface LaravelLinks {
  first: string;
  last: string;
}

export interface LaravelPaginationResponse {
  data: any;
  meta: LaravelPagination;
  links: LaravelLinks
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
  showSizeChanger: boolean;
}

export interface TableListData {
  list: any[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}
