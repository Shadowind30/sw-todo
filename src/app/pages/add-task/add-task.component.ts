import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCentralService } from 'src/app/providers/core/data-central.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  private listId: number = 0;
  private id: string = 'new';

  public addTaskForm = this.fb.group({
    task: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private _central: DataCentralService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listId = +this.route.snapshot.params['listId'] || 0;
    this.id = this.route.snapshot.params['id'] || 'new';

    if (this.listId > 0 && this.id !== 'new') {
      const task = this._central.getTask(this.id, this.listId).task;
      this.task?.setValue(task);
    }
  }

  public handleSubmit() {
    this.id === 'new' ? this.addTask() : this.updateTask();
  }

  public addTask() {
    const task = this.task?.value;
    const id = this.getId();

    this._central.addTask({ task, id }, this.listId);
    this.addTaskForm.reset();
    this.navigateHome();
  }

  public updateTask() {
    const task = this.task?.value;
    const id = this.id;

    this._central.updateTask({ task, id }, this.listId);
    this.addTaskForm.reset();
    this.navigateHome();
  }

  private getId() {
    return uuid.v4();
  }

  private navigateHome() {
    this.router.navigate(['']);
  }

  public get task() {
    return this.addTaskForm.get('task');
  }
}
