import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-payment',
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './confirm-payment.html',
  styleUrl: './confirm-payment.scss',
})
export class ConfirmPaymentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 5000);
  }
}
