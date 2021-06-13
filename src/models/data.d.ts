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

export interface TagType {
  id: number;
  name: string;
  slug: string;
  keywords: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TagListType extends TableListData{
  list: TagType[];
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  keywords: string;
  description: string;
  sort: number;
  pid: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CategoryListType extends TableListData{
  list: CategoryType[];
}

export interface ArticleType {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  author: string;
  markdown: string;
  html: string;
  description: string;
  keywords: string;
  cover: string;
  is_top: number;
  views: number;
  tags: TagType[],
  category: CategoryType;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ArticleListType extends TableListData{
  list: ArticleType[];
}
