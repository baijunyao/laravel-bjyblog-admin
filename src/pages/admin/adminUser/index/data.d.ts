import { TableListData as BaseTableListData } from '@/models/data'

export interface TableListItem {
  id: number;
  name: string;
  email: string;
  email_verified_at: string| null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: TableListItem[];
}
