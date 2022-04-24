import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskModule } from './pages/add-task/add-task.module';
import { BoardModule } from './pages/board/board.module';

@NgModule({
  declarations: [
    AppComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddTaskModule,
    RouterModule,
    BoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
