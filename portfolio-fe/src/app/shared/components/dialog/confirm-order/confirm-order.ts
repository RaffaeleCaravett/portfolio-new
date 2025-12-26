import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-order',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './confirm-order.html',
  styleUrl: './confirm-order.scss',
})
export class ConfirmOrderComponent implements OnInit, OnDestroy {
  protected selectedItem!: { nome: string; prezzo: number; ingredienti: string[]; note?: string };
  protected action: string = '';
  protected addForm: FormGroup = new FormGroup({});
  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.selectedItem = this.data[0];
    this.action = this.data[1];
    this.addForm = new FormGroup({
      request: new FormControl(this.selectedItem?.note || '', Validators.maxLength(200)),
    });
  }
  close(add: boolean) {
    if (add == true) {
      this.selectedItem.note = this.addForm.controls['request'].value || '';
    }
    this.addForm.reset();
    this.dialogRef.close({ add: add, item: this.selectedItem });
  }
  ngOnDestroy() {
    this.addForm.reset();
  }
}
