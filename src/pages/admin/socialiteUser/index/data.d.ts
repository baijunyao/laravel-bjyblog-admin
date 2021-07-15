import { TableListPaginationType } from '@/models/data'
import { SocialiteClientType } from '@/pages/admin/socialiteClient/index/data.d'

export interface SocialiteUserType {
  id: number;
  name: string;
  email: string;
  avatar: string;
  is_admin: number;
  is_blocked: number;
  login_times: number;
  socialite_client: SocialiteClientType;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: SocialiteUserType[];
}
