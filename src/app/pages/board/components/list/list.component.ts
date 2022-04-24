import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodoItem, ITodoList } from 'src/app/models.interface';
import { DataCentralService } from 'src/app/providers/core/data-central.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() public todoList: ITodoList = {
    id: 0,
    items: [],
    name: 'Unnamed'
  };

  constructor(private _central: DataCentralService) { }

  ngOnInit(): void {}

  public removeTask(id: number) {
    this._central.deleteTask(id, this.todoList.id);
  }

}
