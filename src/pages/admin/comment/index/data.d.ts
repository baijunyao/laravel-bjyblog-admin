import { EloquentType, TableListPaginationType } from '@/models/data'
import { SocialiteUserType } from '@/pages/admin/socialiteUser/index/data.d'
import { ArticleType } from '@/models/data.d'

export interface CommentType extends EloquentType{
  content: string;
  is_audited: number;
  socialite_user: SocialiteUserType;
  article: ArticleType;
}

export interface CommentListPaginationType extends TableListPaginationType{
  list: CommentType[];
}
