import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LeafletMapComponent } from '../../../../../shared/components/map/leaflet-map/leaflet-map';
import { RestaurantService } from '../../../../../services/restaurant.service';
import { CurrencyPipe } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOrderComponent } from '../../../../../shared/components/dialog/confirm-order/confirm-order';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmPaymentComponent } from '../../../../../shared/components/dialog/confirm-payment/confirm-payment';
@Component({
  selector: 'app-restaurant',
  imports: [LeafletMapComponent, CurrencyPipe, Tooltip, Toast, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.scss',
})
export class RestaurantComponent implements OnInit, OnDestroy {
  protected items: { id: number; value: string }[] = [
    { id: 1, value: 'Home' },
    { id: 2, value: 'Menu' },
    { id: 3, value: 'Chart' },
  ];
  protected section: string = 'Home';
  protected restaurantService: RestaurantService = inject(RestaurantService);
  protected menu!: {
    menuVoice: string;
    items: { nome: string; prezzo: number; ingredienti: string[]; note?: string }[];
  }[];
  protected chart: { nome: string; prezzo: number; ingredienti: string[]; note?: string }[] = [];
  protected dialog: MatDialog = inject(MatDialog);
  protected paymentOpened: boolean = false;
  protected paymentForm: FormGroup = new FormGroup({});
  protected currentYear: number = 0;
  protected formSubmitted: boolean = false;
  constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.menu = this.restaurantService.getMenu();
    this.currentYear = Number(new Date().getFullYear().toString().substring(2, 4));
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(19),
        Validators.maxLength(19),
        Validators.pattern(/^\d{4}( \d{4}){3}$/),
      ]),
      expirationMonth: new FormControl('', [
        Validators.required,
        Validators.max(12),
        Validators.maxLength(2),
        Validators.min(Number(0o1)),
      ]),
      expirationYear: new FormControl('', [
        Validators.required,
        Validators.max(99),
        Validators.maxLength(2),
        Validators.min(Number(this.currentYear)),
      ]),
      securityCode: new FormControl('', [
        Validators.required,
        Validators.min(111),
        Validators.max(999),
      ]),
      cardHolder: new FormControl('', [Validators.required, Validators.pattern('^.+\\s.+$')]),
    });
  }

  confirmItem(
    item: { nome: string; prezzo: number; ingredienti: string[]; note?: string },
    action: string
  ) {
    const dialogRef = this.dialog.open(ConfirmOrderComponent, { data: [item, action] });
    dialogRef
      .afterClosed()
      .subscribe(
        (datas: {
          add: boolean;
          item: { nome: string; prezzo: number; ingredienti: string[] };
        }) => {
          if (datas && datas.add) {
            if (action == 'add') {
              this.chart.push(item);
            } else {
              this.chart = this.chart.filter((i) => i != item);
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Product added',
              detail:
                action == 'add'
                  ? 'You added the product to the chart'
                  : 'You removed the product from the chart',
            });
            if (this.chart.length == 0) {
              this.paymentOpened = false;
              this.paymentForm.reset();
              this.paymentForm.updateValueAndValidity();
            }
          } else {
            this.messageService.add({
              severity: 'info',
              summary: 'Nothing done',
              detail: "You haven't added the product to the chart",
            });
          }
          this.cdr.markForCheck();
        }
      );
  }

  getTotal(chart: { nome: string; prezzo: number; ingredienti: string[] }[]): number {
    if (chart && chart.length > 0) {
      var a = 0;
      chart.forEach((c) => (a += c.prezzo));
      return a;
    }
    return 0;
  }

  pay() {
    this.formSubmitted = true;
    if (this.paymentForm.valid) {
      let currentMonth = new Date().getMonth();
      if (
        currentMonth + 1 > this.paymentForm.controls['expirationMonth'].value &&
        this.currentYear == this.paymentForm.controls['expirationYear'].value
      ) {
        this.messageService.add({
          severity: 'contrast',
          summary: 'Attention',
          detail: "Your payment card has been rejected. You're card is expired.",
        });
        this.paymentOpened = false;
        this.paymentForm.reset();
        this.paymentForm.updateValueAndValidity();
        this.chart = [];
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Payment accepted',
          detail: 'Your payment card has been accepted.',
        });
        this.paymentOpened = false;
        this.paymentForm.reset();
        this.paymentForm.updateValueAndValidity();
        this.chart = [];
        const dialogRef = this.dialog.open(ConfirmPaymentComponent, { disableClose: true });
        dialogRef.afterClosed().subscribe({
          next: (data: any) => {
            this.section = 'Menu';
          },
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Attention',
        detail: 'Fill the form with right values.',
      });
    }
  }
  adeguateCardNumberValue(event: any) {
    let value: string = this.paymentForm.controls['cardNumber'].value || '';
    if (
      event &&
      event.data != ' ' &&
      event.data != null &&
      !(this.paymentForm.controls['cardNumber'].value as string).endsWith(' ')
    ) {
      if (value.length == 4) {
        this.paymentForm.controls['cardNumber'].setValue(
          this.paymentForm.controls['cardNumber'].value + ' '
        );
      } else if (value.length == 9) {
        this.paymentForm.controls['cardNumber'].setValue(
          this.paymentForm.controls['cardNumber'].value + ' '
        );
      } else if (value.length == 14) {
        this.paymentForm.controls['cardNumber'].setValue(
          this.paymentForm.controls['cardNumber'].value + ' '
        );
      }
    }
    this.paymentForm.controls['cardNumber'].updateValueAndValidity();
  }

  limitExpirationMonth() {
    if (
      this.paymentForm.controls['expirationMonth'].value &&
      String(this.paymentForm.controls['expirationMonth'].value).length > 2
    ) {
      this.paymentForm.controls['expirationMonth'].setValue(
        String(this.paymentForm.controls['expirationMonth'].value).substring(0, 2)
      );
    }
    this.paymentForm.controls['expirationMonth'].updateValueAndValidity();
  }
  limitExpirationYear() {
    if (
      this.paymentForm.controls['expirationYear'].value &&
      String(this.paymentForm.controls['expirationYear'].value).length > 2
    ) {
      this.paymentForm.controls['expirationYear'].setValue(
        String(this.paymentForm.controls['expirationYear'].value).substring(0, 2)
      );
    }
    this.paymentForm.controls['expirationYear'].updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.paymentForm.reset();
    this.chart = [];
    this.paymentOpened = false;
    this.paymentForm.updateValueAndValidity();
  }
}
