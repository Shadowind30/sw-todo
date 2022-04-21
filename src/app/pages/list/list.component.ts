import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodoItem } from 'src/app/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public todoList$: Observable<ITodoItem[]> = new Observable();
  constructor() { }

  ngOnInit(): void {
  }

}
