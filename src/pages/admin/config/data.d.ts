import { TableListPaginationType } from '@/models/data'

export interface ConfigType {
  id: number;
  name: string;
  value: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ConfigListPaginationType extends TableListPaginationType{
  list: ConfigType[];
}
