export interface ITodoItem {
  id: number;
  task: string;
}

export interface ITodoList {
  id: number;
  items: ITodoItem[];
  name: string;
}
