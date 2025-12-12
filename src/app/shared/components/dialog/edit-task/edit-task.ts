import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TaskStates } from '../../../enums/enums';

@Component({
  selector: 'app-edit-task',
  imports: [MatDialogTitle, MatDialogContent],
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
  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.showSkeleton = true;
    this.task = this.data;
  }
}
