export interface IListItem {
  id: string;
  task: string;
}

export interface IList {
  id: number;
  items: IListItem[];
  name: string;
}

export interface IDnDTransfer {
  item: IListItem,
  containerId: number;
  previousContainerId: number;
  currentIndex: number;
}
