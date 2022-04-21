import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule
  ]
})
export class ListModule { }
