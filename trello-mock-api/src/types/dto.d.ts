export type ListDto = {
  id: string;
  title?: string;
  position: number;
}

export type CardDto = {
  id: string;
  title: string;
  description: string;
  position: number;
  completed: boolean;
  dueDate: Date;
  list_id: string;
}