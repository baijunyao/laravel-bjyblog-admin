import { TableListData as BaseTableListData } from '@/models/data'

export interface TableListItem {
  id: number;
  name: string;
  slug: string;
  title: string;
  keywords: string;
  description: string;
  sort: number;
  pid: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: TableListItem[];
}
