import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule)
  },
  {
    path: 'add-task',
    loadChildren: () => import('./pages/add-task/add-task.module').then(m => m.AddTaskModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: '*',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
