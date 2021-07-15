import { TableListPaginationType } from '@/models/data'

export interface SiteType {
  id: number;
  name: string;
  description: string;
  url: string;
  sort: number;
  audit: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SiteListPaginationType extends TableListPaginationType{
  list: SiteType[];
}
