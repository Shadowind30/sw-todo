import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskRoutingModule } from './add-task-routing.module';



@NgModule({
  declarations: [AddTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddTaskRoutingModule
  ]
})
export class AddTaskModule { }
