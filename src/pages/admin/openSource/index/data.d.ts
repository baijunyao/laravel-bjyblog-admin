import { TableListData as BaseTableListData } from '@/models/data'

export interface TableListItem {
  id: number;
  sort: number;
  type: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: TableListItem[];
}
