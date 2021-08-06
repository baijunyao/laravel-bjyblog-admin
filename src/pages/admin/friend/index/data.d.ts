import { EloquentType, TableListPaginationType } from '@/models/data'

export interface FriendType extends EloquentType{
  name: string;
  url: string;
  sort: number;
}

export interface FriendListPaginationType extends TableListPaginationType{
  list: FriendType[];
}
