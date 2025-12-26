import { ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-confirm-payment',
  imports: [MatDialogTitle, MatDialogContent, MatProgressSpinnerModule],
  templateUrl: './confirm-payment.html',
  styleUrl: './confirm-payment.scss',
})
export class ConfirmPaymentComponent implements OnInit {
  protected showSpinner: boolean = false;
  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  constructor(
    public dialogRef: MatDialogRef<ConfirmPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.cdr.detectChanges();
    }, 1500);
    setTimeout(() => {
      this.dialogRef.close();
    }, 6000);
  }
}
