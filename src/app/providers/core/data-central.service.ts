import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodoItem, ITodoList } from 'src/app/models.interface';
import { LocalDbService } from '../external/local-db.service';

@Injectable({
  providedIn: 'root'
})
export class DataCentralService {

  private _todos: ITodoList[] = [];

  private todosSubject = new BehaviorSubject(this._todos);

  constructor(private _localDB: LocalDbService) {
    this._todos = this._localDB.todos;
    this.todosSubject.next(this._todos);
   }

  private updateTodosState() {
     this.todosSubject.next(this._todos);
     this._localDB.updateTodos = this._todos;
  }

  public get todos$(): Observable<ITodoList[]> {
    return this.todosSubject.asObservable();
  }

  public getTask(id: number, listId: number): ITodoItem {
    const todo = this._todos.find(todo => todo.id === listId) as ITodoList;
    return todo.items.find(task => id === task.id) as ITodoItem || null;
  }

  public addTask(value: ITodoItem, listId: number) {
    const listIndex = this._todos.findIndex(todo => todo.id === listId);
    this._todos[listIndex].items.push(value);
    this.updateTodosState()
  }

  public updateTask(task: ITodoItem, listId: number) {
    const listIndex = this._todos.findIndex(todo => todo.id === listId);
    const taskIndex = this._todos[listIndex].items.findIndex((tsk) => tsk.id === task.id);
    this._todos[listIndex].items[taskIndex] = task;
    this.updateTodosState();
  }

  public deleteTask(id: number, listId: number) {
    const listIndex = this._todos.findIndex(todo => todo.id === listId);

    const currentList = this._todos[listIndex];
    const updatedItems = currentList.items.filter(task => task.id !== id);

    this._todos[listIndex].items = updatedItems;
    this.updateTodosState();
  }

  /** Get task total in a specified list */
  public getTasksAmount(listId: number): number {
    const listIndex = this._todos.findIndex(todo => todo.id === listId);
    return this._todos[listIndex].items.length;
  }

}
