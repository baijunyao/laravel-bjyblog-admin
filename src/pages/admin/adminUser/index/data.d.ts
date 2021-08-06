import { EloquentType, TableListPaginationType } from '@/models/data'

export interface AdminUserType extends EloquentType{
  name: string;
  email: string;
  email_verified_at: string| null;
}

export interface AdminUserListPaginationType extends TableListPaginationType{
  list: AdminUserType[];
}
