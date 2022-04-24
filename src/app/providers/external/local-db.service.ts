import { Injectable } from '@angular/core';
import { ITodoItem, ITodoList } from 'src/app/models.interface';
import { LoggerService } from '../common/logger.service';

export type DBKey = 'todos';
export type DBValue = ITodoList[] | null;
const PREFIX = 'sw_todo_db/';
const TODOS_KEY = 'todos';

@Injectable({
  providedIn: 'root',
})
export class LocalDbService {
  private readonly DB = localStorage;
  private _todos: ITodoList[] = [];

  constructor(private _logger: LoggerService) {}

  public get todos() {
    return this._todos;
  }

  public set updateTodos(value: ITodoList[]) {
    if (!value || !value.length) {
      this._logger.warn(`[DB] Called updateTodos with empty or falsy value, update wasn't made`);
      return;
    }

    this.updateDB(TODOS_KEY, value);
    this._todos = value;
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
    this._todos =
      (JSON.parse(
        this.DB.getItem(PREFIX + TODOS_KEY) as string
      ) as ITodoList[]) || [
        {
          id: 1,
          items: [],
          name: 'To Do'
        },
        {
          id: 2,
          items: [],
          name: 'In progress'
        },
        {
          id: 3,
          items: [],
          name: 'Done'
        }
      ];
  }

}
