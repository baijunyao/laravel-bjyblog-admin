import { TableListData as BaseTableListData } from '@/models/data'

export interface TableListItem {
  id: number;
  name: string;
  icon: string;
  client_id: string;
  client_secret: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: TableListItem[];
}
