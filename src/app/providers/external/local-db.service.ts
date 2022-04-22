import { Injectable } from '@angular/core';
import { ITodoItem } from 'src/app/models.interface';
import { LoggerService } from '../common/logger.service';

export type DBKey = 'tasks';
export type DBValue = ITodoItem[] | null;
const PREFIX = 'sw_todo_db/';
const TASKS_KEY = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class LocalDbService {
  private readonly DB = localStorage;
  private _tasks: ITodoItem[] = [];

  constructor(private _logger: LoggerService) {}

  public get tasks() {
    return this._tasks;
  }

  public set updateTasks(value: ITodoItem[]) {
    if (!value || !value.length) {
      this._logger.warn(`[DB] Called updateTasks with empty or falsy value, update wasn't made`);
      return;
    }

    this.updateDB(TASKS_KEY, value);
    this._tasks = value;
  }

  /** Saves or update passed key with passed value, pass null to clear key */
  private updateDB(key: DBKey, value: DBValue) {
    const CURRENT_KEY = PREFIX + key;

    value !== null
      ? this.DB.setItem(CURRENT_KEY, JSON.stringify(value))
      : this.DB.removeItem(CURRENT_KEY);
  }

  private removeKey(key: DBKey, ) {
      this.updateDB(key, null);
  }

  /** Loads everything stored on localStorage */
  public initDB() {
    this._tasks =
      (JSON.parse(
        this.DB.getItem(PREFIX + TASKS_KEY) as string
      ) as ITodoItem[]) || [];
  }

}
