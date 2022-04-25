import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { ListComponent } from './components/list/list.component';
import { BoardComponent } from './board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [BoardComponent, ListComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class BoardModule { }
