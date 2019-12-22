import { TableListData as BaseTableListData } from '@/models/data'

export interface SocialiteUser {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: string;
}

export interface TableListItem {
  id: number;
  content: string;
  is_audited: number;
  socialite_user: SocialiteUser;
  article: Article;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TableListData extends BaseTableListData{
  list: TableListItem[];
}
