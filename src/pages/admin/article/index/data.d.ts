import { TableListData as BaseTableListData } from '@/models/data'
import { TableListItem as Category } from '@/pages/admin/category/index/data'
import { TableListItem as Tag } from '@/pages/admin/tag/index/data'

export interface TableListItem {
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
  tags: Tag[],
  category: Category;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: TableListItem[];
}
