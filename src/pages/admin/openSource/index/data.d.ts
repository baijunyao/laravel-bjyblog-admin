import { TableListPaginationType } from '@/models/data'

export interface OpenSourceType {
  id: number;
  sort: number;
  type: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OpenSourceListPaginationType extends TableListPaginationType{
  list: OpenSourceType[];
}
