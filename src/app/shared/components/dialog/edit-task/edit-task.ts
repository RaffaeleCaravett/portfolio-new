import { ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TaskStates } from '../../../enums/enums';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  imports: [MatDialogTitle, MatDialogContent, NgxSkeletonLoaderComponent, ReactiveFormsModule],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.scss',
})
export class EditTaskComponent implements OnInit {
  protected showSkeleton: boolean = false;
  protected task!: {
    id: number;
    name: string;
    state: TaskStates;
    assignedTo: string;
    createdAt: string;
    description: string;
  };
  protected taskForm: FormGroup = new FormGroup({});
  protected users: { id: number; fullname: string }[] = [
    { id: 1, fullname: 'Mario Rossi' },
    { id: 2, fullname: 'Luigi Bianchi' },
    { id: 3, fullname: 'Sesti Osseo' },
  ];
  protected states: { state: TaskStates }[] = [
    { state: TaskStates.TO_DO },
    { state: TaskStates.PROCESS },
    { state: TaskStates.COMPLETE },
  ];
  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.showSkeleton = true;
    this.task = this.data;
    this.taskForm = new FormGroup({
      title: new FormControl(this.task.name, Validators.required),
      state: new FormControl(this.task.state, Validators.required),
      assignedTo: new FormControl(this.task.assignedTo, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      createdAt: new FormControl(this.task.createdAt, Validators.required),
    });
    setTimeout(() => {
      this.showSkeleton = false;
      this.cdr.markForCheck();
    }, 2500);
  }
}
