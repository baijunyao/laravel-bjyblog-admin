import { EloquentType, TableListPaginationType } from '@/models/data'

export interface SocialiteClientType extends EloquentType{
  name: string;
  icon: string;
  client_id: string;
  client_secret: string;
}

export interface SocialiteClientListType extends TableListPaginationType{
  list: SocialiteClientType[];
}
