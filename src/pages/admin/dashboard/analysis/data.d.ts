import { TableListItem as SocialiteUser } from '@/pages/admin/socialiteUser/index/data'
import { TableListItem as Comment } from '@/pages/admin/comment/index/data'
import { TableListItem as Article } from '@/pages/admin/article/index/data'

export interface LatestComments extends Comment {
  article: Article;
  socialite_user: SocialiteUser;
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

export interface AnalysisData {
  latest_socialite_users: SocialiteUser[];
  latest_comments: LatestComments[];
  versions: Versions;
  counts: Counts;
}
