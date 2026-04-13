export type ListEntity = {
  id: string;
  title: string;
  position: number;
  created_at: Date;
  updated_at: Date;
}

export type cardEntity = {
  id: string;
  title: string;
  description: string;
  position: number;
  completed: boolean;
  dueDate: Date;
  list_id: string;
  created_at: Date;
  updated_at: Date;
}