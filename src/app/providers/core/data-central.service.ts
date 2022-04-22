import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodoItem } from 'src/app/models.interface';
import { LocalDbService } from '../external/local-db.service';

@Injectable({
  providedIn: 'root'
})
export class DataCentralService {

  private _tasks: ITodoItem[] = [];

  private tasksSubject = new BehaviorSubject(this._tasks);

  constructor(private _localDB: LocalDbService) {
    this._tasks = this._localDB.tasks;
    this.tasksSubject.next(this._tasks);
   }

  private updateTaskState() {
     this.tasksSubject.next(this._tasks);
     this._localDB.updateTasks = this._tasks;
  }

  public get tasks$(): Observable<ITodoItem[]> {
    return this.tasksSubject.asObservable();
  }

  public getTask(id: number): ITodoItem {
    return this._tasks.find(task => id === task.id) as ITodoItem || null;
  }

  public addTask(value: ITodoItem) {
    this._tasks.push(value);
    this.updateTaskState()
  }

  public updateTask(task: ITodoItem) {
    const index = this._tasks.findIndex((tsk) => tsk.id === task.id);
    this._tasks[index] = task;
    this.updateTaskState();
  }

  public deleteTask(id: number) {
    this._tasks = this._tasks.filter(task => task.id !== id);
    this.updateTaskState();
  }

  public get tasksAmount(): number {
    return this._tasks.length;
  }

}
