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
import { EditTaskComponent } from '../../../../../shared/components/dialog/edit-task/edit-task';

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
      description: string;
    }[];
  } | null = null;
  protected projects: {
    id: number;
    name: string;
    tasks: {
      id: number;
      name: string;
      state: TaskStates;
      assignedTo: string;
      createdAt: string;
      description: string;
    }[];
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
          description: 'Casual description',
        },
        {
          id: 2,
          name: 'second task',
          state: TaskStates.TO_DO,
          assignedTo: 'Mario Rossi',
          createdAt: '13-06-2025',
          description: 'Casual description',
        },
        {
          id: 3,
          name: 'third task',
          state: TaskStates.TO_DO,
          assignedTo: 'Luigi Bianchi',
          createdAt: '21-10-2025',
          description: 'Casual description',
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
    description: string;
  }[] = [];
  protected progress: {
    id: number;
    name: string;
    state: TaskStates;
    assignedTo: string;
    createdAt: string;
    description: string;
  }[] = [];
  protected done: {
    id: number;
    name: string;
    state: TaskStates;
    assignedTo: string;
    createdAt: string;
    description: string;
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
      {
        id: number;
        name: string;
        state: TaskStates;
        assignedTo: string;
        createdAt: string;
        description: string;
      }[],
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

  edit(t: {
    id: number;
    name: string;
    state: TaskStates;
    assignedTo: string;
    createdAt: string;
    description: string;
  }) {
    const dialogRef = this.dialog.open(EditTaskComponent, { data: t });

    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        if (data) {
          t.name = data.title.value;
          t.description = data.description.value;
          t.assignedTo = data.assignedTo.value;
          t.state = data.state.value;
          this.cdr.markForCheck();

          if (t.state == TaskStates.COMPLETE) {
            if (!this.done.includes(t)) {
              this.done.push(t);
              this.toDo = this.toDo.filter((ta) => ta.id != t.id);
              this.progress = this.progress.filter((ta) => ta.id != t.id);
            }
          } else if (t.state == TaskStates.TO_DO) {
            if (!this.toDo.includes(t)) {
              this.toDo.push(t);
              this.done = this.done.filter((ta) => ta.id != t.id);
              this.progress = this.progress.filter((ta) => ta.id != t.id);
            }
          } else {
            if (!this.progress.includes(t)) {
              this.progress.push(t);
              this.toDo = this.toDo.filter((ta) => ta.id != t.id);
              this.done = this.done.filter((ta) => ta.id != t.id);
            }
          }
          this.cdr.markForCheck();
        }
      },
    });
  }
}
