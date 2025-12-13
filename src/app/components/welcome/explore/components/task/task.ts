import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskStates } from '../../../../../shared/enums/enums';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Tooltip } from 'primeng/tooltip';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  imports: [ReactiveFormsModule, CdkDropList, CdkDrag, Tooltip],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class TaskComponent implements OnInit {
  protected projectForm: FormGroup = new FormGroup({});
  protected selectedProject: {
    id: number;
    name: string;
    tasks: {
      id: number;
      name: string;
      state: TaskStates;
      assignedTo: string;
      createdAt: string;
    }[];
  } | null = null;
  protected projects: {
    id: number;
    name: string;
    tasks: { id: number; name: string; state: TaskStates; assignedTo: string; createdAt: string }[];
  }[] = [
    {
      id: 1,
      name: 'Project 1',
      tasks: [
        {
          id: 1,
          name: 'first task',
          state: TaskStates.TO_DO,
          assignedTo: 'Sesti Osseo',
          createdAt: '11-04-2025',
        },
        {
          id: 2,
          name: 'second task',
          state: TaskStates.TO_DO,
          assignedTo: 'Mario Rossi',
          createdAt: '13-06-2025',
        },
        {
          id: 3,
          name: 'third task',
          state: TaskStates.TO_DO,
          assignedTo: 'Luigi Bianchi',
          createdAt: '21-10-2025',
        },
      ],
    },
  ];
  protected toDo: {
    id: number;
    name: string;
    state: TaskStates;
    assignedTo: string;
    createdAt: string;
  }[] = [];
  protected progress: {
    id: number;
    name: string;
    state: TaskStates;
    assignedTo: string;
    createdAt: string;
  }[] = [];
  protected done: {
    id: number;
    name: string;
    state: TaskStates;
    assignedTo: string;
    createdAt: string;
  }[] = [];

  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected dialog: MatDialog = inject(MatDialog);
  ngOnInit(): void {
    this.projectForm = new FormGroup({
      project: new FormControl(''),
    });
  }

  selectProject() {
    this.selectedProject =
      this.projects.filter((p) => p.id == this.projectForm.controls['project'].value)[0] || null;
    this.toDo = this.selectedProject?.tasks?.filter((t) => t.state == TaskStates.TO_DO);
    this.progress = this.selectedProject?.tasks?.filter((t) => t.state == TaskStates.PROCESS);
    this.done = this.selectedProject?.tasks?.filter((t) => t.state == TaskStates.COMPLETE);
  }

  drop(
    event: CdkDragDrop<
      { id: number; name: string; state: TaskStates; assignedTo: string; createdAt: string }[],
      any,
      any
    >
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    setTimeout(() => {
      if (event.container.id == 'cdk-drop-list-0') {
        this.toDo.forEach((t) => {
          t.state = TaskStates.TO_DO;
        });
      } else if (event.container.id == 'cdk-drop-list-1') {
        this.progress.forEach((t) => {
          t.state = TaskStates.PROCESS;
        });
      } else if (event.container.id == 'cdk-drop-list-2') {
        this.done.forEach((t) => {
          t.state = TaskStates.COMPLETE;
        });
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  edit(t: { id: number; name: string; state: TaskStates; assignedTo: string; createdAt: string }) {
    const dialogRef = this.dialog.open({});
  }
}
