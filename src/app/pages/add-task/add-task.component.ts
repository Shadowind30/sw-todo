import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCentralService } from 'src/app/providers/core/data-central.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  private id: number = 0;

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
    this.id = +this.route.snapshot.params['id'] || 0;

    if (this.id > 0) {
      const task = this._central.getTask(this.id).task;
      this.task?.setValue(task);
    }
  }

  public handleSubmit() {
    this.id === 0 ? this.addTask() : this.updateTask();
  }

  public addTask() {
    const task = this.task?.value;
    const id = this.getId();

    this._central.addTask({ task, id });
    this.addTaskForm.reset();
    this.navigateHome();
  }

  public updateTask() {
    const task = this.task?.value;
    const id = this.id;

    this._central.updateTask({ task, id });
    this.addTaskForm.reset();
    this.navigateHome();
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
function take(
  arg0: number
): import('rxjs').OperatorFunction<import('@angular/router').Params, unknown> {
  throw new Error('Function not implemented.');
}
