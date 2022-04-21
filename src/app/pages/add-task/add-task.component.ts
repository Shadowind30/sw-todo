import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ITodoItem } from 'src/app/interfaces';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  public addTaskForm = this.fb.group({
    task: ['', [Validators.required, Validators.minLength(3)]]
  });

  public todoList: ITodoItem[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

  }

  public addTask() {
    const task = this.task?.value;
    const id = this.getId();

    this.todoList.push({task, id});
    this.addTaskForm.reset();
  }

  private getId() {
    return this.todoList.length + 1;
  }

  public get task() {
    return this.addTaskForm.get('task');
  }

}
