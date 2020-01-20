import { TableListData as BaseTableListData } from '@/models/data'

export interface TableListItem {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: TableListItem[];
}
