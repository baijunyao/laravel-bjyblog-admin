import { SocialiteClientType } from '@/pages/admin/socialiteClient/index/data.d'
import { EloquentType, TableListPaginationType } from '@/models/data'

export interface SocialiteUserType extends EloquentType{
  name: string;
  email: string;
  avatar: string;
  is_admin: number;
  is_blocked: number;
  login_times: number;
  socialite_client: SocialiteClientType;
}

export interface SocialiteUserListPaginationType extends TableListPaginationType{
  list: SocialiteUserType[];
}
