import { TableListPaginationType } from '@/models/data'

export interface SocialiteClientType {
  id: number;
  name: string;
  icon: string;
  client_id: string;
  client_secret: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SocialiteClientListType extends TableListPaginationType{
  list: SocialiteClientType[];
}
