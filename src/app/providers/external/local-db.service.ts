import { Injectable } from '@angular/core';
import { IListItem, IList } from 'src/app/models.interface';
import { LoggerService } from '../common/logger.service';

export type DBKey = 'lists';
export type DBValue = IList[] | null;
const PREFIX = 'sw_todo_db/';
const LISTS_KEY = 'lists';

@Injectable({
  providedIn: 'root',
})
export class LocalDbService {
  private readonly DB = localStorage;
  private _lists: IList[] = [];

  constructor(private _logger: LoggerService) {}

  public get lists() {
    return this._lists;
  }

  public set updateLists(value: IList[]) {
    if (!value || !value.length) {
      this._logger.warn(`[DB] Called updateLists with empty or falsy value, update wasn't made`);
      return;
    }

    this.updateDB(LISTS_KEY, value);
    this._lists = value;
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
    this._lists =
      (JSON.parse(
        this.DB.getItem(PREFIX + LISTS_KEY) as string
      ) as IList[]) || [
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
