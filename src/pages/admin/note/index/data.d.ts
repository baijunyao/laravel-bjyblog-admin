import { TableListPaginationType } from '@/models/data'

export interface NoteType {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NoteListPaginationType extends TableListPaginationType{
  list: NoteType[];
}
