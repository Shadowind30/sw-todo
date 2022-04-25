import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { ListComponent } from './components/list/list.component';
import { BoardComponent } from './board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [BoardComponent, ListComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    DragDropModule
  ]
})
export class BoardModule { }
