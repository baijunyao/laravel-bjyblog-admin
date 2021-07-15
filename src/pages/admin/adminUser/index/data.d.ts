import { TableListPaginationType } from '@/models/data'

export interface AdminUserType {
  id: number;
  name: string;
  email: string;
  email_verified_at: string| null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AdminUserListPaginationType extends TableListPaginationType{
  list: AdminUserType[];
}
