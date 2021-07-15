import { TableListPaginationType } from '@/models/data'

export interface FriendType {
  id: number;
  name: string;
  url: string;
  sort: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FriendListPaginationType extends TableListPaginationType{
  list: FriendType[];
}
