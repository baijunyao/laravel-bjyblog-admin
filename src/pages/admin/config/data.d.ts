import { EloquentType, TableListPaginationType } from '@/models/data'

export interface ConfigType extends EloquentType{
  name: string;
  value: string;
}

export interface ConfigListPaginationType extends TableListPaginationType{
  list: ConfigType[];
}
