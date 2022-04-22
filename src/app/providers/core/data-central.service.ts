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

  public get tasks$(): Observable<ITodoItem[]> {
    return this.tasksSubject.asObservable();
  }

  public set newTask(value: ITodoItem) {
    this._tasks.push(value);
    this.tasksSubject.next(this._tasks);

    this._localDB.updateTasks = this._tasks;
  }

  public get tasksAmount(): number {
    return this._tasks.length;
  }
}
