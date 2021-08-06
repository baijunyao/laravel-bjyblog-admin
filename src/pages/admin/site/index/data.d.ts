import { EloquentType, TableListPaginationType } from '@/models/data'

export interface SiteType extends EloquentType{
  name: string;
  description: string;
  url: string;
  sort: number;
  audit: number;
}

export interface SiteListPaginationType extends TableListPaginationType{
  list: SiteType[];
}
