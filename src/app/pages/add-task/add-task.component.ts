import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataCentralService } from 'src/app/providers/core/data-central.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  public addTaskForm = this.fb.group({
    task: ['', [Validators.required, Validators.minLength(3)]]
  });


  constructor(private fb: FormBuilder, private _central: DataCentralService, private router: Router) {}

  ngOnInit(): void {

  }

  public addTask() {
    const task = this.task?.value;
    const id = this.getId();

    this._central.newTask = {task, id};
    this.addTaskForm.reset();
    this.navigateHome()
  }

  private getId() {
    return this._central.tasksAmount + 1;
  }

  private navigateHome() {
    this.router.navigate(['']);
  }

  public get task() {
    return this.addTaskForm.get('task');
  }


}
