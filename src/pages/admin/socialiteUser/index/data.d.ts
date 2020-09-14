import { TableListData as BaseTableListData } from '@/models/data'

export interface SocialiteClient {
  id: number;
  name: string;
  icon: string;
}

export interface TableListItem {
  id: number;
  name: string;
  email: string;
  avatar: string;
  is_admin: number;
  is_blocked: number;
  login_times: number;
  socialite_client: SocialiteClient;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: TableListItem[];
}
