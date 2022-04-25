import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IListItem } from './models.interface';
import { LocalDbService } from './providers/external/local-db.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _localDB: LocalDbService) {
    this._localDB.initDB();
  }
}
