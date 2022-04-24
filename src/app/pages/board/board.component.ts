import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodoList } from 'src/app/models.interface';
import { DataCentralService } from 'src/app/providers/core/data-central.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public todoLists$ = new Observable<ITodoList[]>();
  constructor(private _central: DataCentralService) { }

  ngOnInit(): void {
    this.todoLists$ = this._central.todos$;
  }

}
