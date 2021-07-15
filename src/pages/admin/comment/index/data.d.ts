import { TableListPaginationType } from '@/models/data'

import { SocialiteUserType } from '@/pages/admin/socialiteUser/index/data.d'
import { ArticleType } from '@/models/data.d'

export interface CommentType {
  id: number;
  content: string;
  is_audited: number;
  socialite_user: SocialiteUserType;
  article: ArticleType;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CommentListPaginationType extends TableListPaginationType{
  list: CommentType[];
}
