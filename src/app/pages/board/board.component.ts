import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from 'src/app/models.interface';
import { DataCentralService } from 'src/app/providers/core/data-central.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public lists$ = new Observable<IList[]>();
  constructor(private _central: DataCentralService) { }

  ngOnInit(): void {
    this.lists$ = this._central.lists$;
  }

}
