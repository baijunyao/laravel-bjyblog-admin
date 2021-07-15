import { SocialiteUserType } from '@/pages/admin/socialiteUser/index/data'
import { CommentType as Comment } from '@/pages/admin/comment/index/data'
import { ArticleType } from '@/models/data.d'

export interface LatestComments extends Comment {
  article: ArticleType;
  socialite_user: SocialiteUserType;
}

export interface Versions {
  system: string;
  web_server: string;
  php: string;
  mysql: string;
}

export interface Counts {
  articles: string;
  comments: string;
  notes: string;
  socialite_users: string;
}

export interface DashboardType {
  latest_socialite_users: SocialiteUserType[];
  latest_comments: LatestComments[];
  versions: Versions;
  counts: Counts;
}
