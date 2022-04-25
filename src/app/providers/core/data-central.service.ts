import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IListItem, IList, IDnDTransfer } from 'src/app/models.interface';
import { LocalDbService } from '../external/local-db.service';

@Injectable({
  providedIn: 'root'
})
export class DataCentralService {

  private _lists: IList[] = [];

  private listsSubject = new BehaviorSubject(this._lists);

  constructor(private _localDB: LocalDbService) {
    this._lists = this._localDB.lists;
    this.listsSubject.next(this._lists);
   }

  private updateListsState() {
     this.listsSubject.next(this._lists);
     this._localDB.updateLists = this._lists;
  }

  public get lists$(): Observable<IList[]> {
    return this.listsSubject.asObservable();
  }

  public getTask(id: string, listId: number): IListItem {
    const list = this._lists.find(list => list.id === listId) as IList;
    return list.items.find(task => id === task.id) as IListItem || null;
  }

  public addTask(value: IListItem, listId: number) {
    const listIndex = this.getListIndex(listId);
    this._lists[listIndex].items.push(value);
    this.updateListsState()
  }

  public updateTask(task: IListItem, listId: number) {
    const listIndex = this.getListIndex(listId);
    const taskIndex = this._lists[listIndex].items.findIndex((tsk) => tsk.id === task.id);
    this._lists[listIndex].items[taskIndex] = task;
    this.updateListsState();
  }

  public updateList(updatedList: IList) {
    const listIndex = this.getListIndex(updatedList.id);
    this._lists[listIndex] = updatedList;
    this.updateListsState();
  }

  public deleteTask(id: string, listId: number) {
    const listIndex = this.getListIndex(listId);

    const currentList = this._lists[listIndex];
    const updatedItems = currentList.items.filter(task => task.id !== id);

    this._lists[listIndex].items = updatedItems;
    this.updateListsState();
  }

  public transferItem(transfer: IDnDTransfer) {
    const {item, currentIndex, containerId, previousContainerId} = transfer;

    const currentLists = [...this._lists];

    const previousListIndex = this.getListIndex(previousContainerId);
    const newListIndex = this.getListIndex(containerId);

    const previousList = currentLists[previousListIndex];
    const newList = currentLists[newListIndex];

    previousList.items = previousList.items.filter(it => it.id !== item.id);

    newList.items.splice(currentIndex, 0, item);

    currentLists[previousListIndex] = previousList;
    currentLists[newListIndex] = newList;

    this._lists = currentLists;
    this.updateListsState();
  }

  /** Get task total in a specified list */
  public getTasksAmount(listId: number): number {
    const listIndex = this.getListIndex(listId);
    return this._lists[listIndex].items.length;
  }

  private getListIndex(listId: number) {
    return this._lists.findIndex(list => list.id === listId);
  }

}
