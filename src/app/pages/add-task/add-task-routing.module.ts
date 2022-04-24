import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './add-task.component';


const routes: Routes = [
  {
    path: '',
    component: AddTaskComponent
  },
  {
    path: ':listId/:id',
    component: AddTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTaskRoutingModule {}
