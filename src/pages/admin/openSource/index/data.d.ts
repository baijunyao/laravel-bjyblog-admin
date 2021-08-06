import { EloquentType, TableListPaginationType } from '@/models/data'

export interface OpenSourceType extends EloquentType{
  sort: number;
  type: number;
  name: string;
}

export interface OpenSourceListPaginationType extends TableListPaginationType{
  list: OpenSourceType[];
}
