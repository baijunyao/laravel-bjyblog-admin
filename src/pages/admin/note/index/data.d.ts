import { EloquentType, TableListPaginationType } from '@/models/data'

export interface NoteType extends EloquentType{
  content: string;
}

export interface NoteListPaginationType extends TableListPaginationType{
  list: NoteType[];
}
