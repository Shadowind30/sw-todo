import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodoItem } from 'src/app/models.interface';
import { DataCentralService } from 'src/app/providers/core/data-central.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public todoList$: Observable<ITodoItem[]> = new Observable();
  constructor(private _central: DataCentralService) { }

  ngOnInit(): void {
    this.todoList$ = this._central.tasks$;
  }

  public removeTask(id: number) {
    this._central.deleteTask(id);
  }

}
