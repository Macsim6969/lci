import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreInterface } from '../../store/model/store.model';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectPaymentsVouchers } from '../../store/selectors/store.selectors';
import { PaymentVouchers } from './@shared/interfaces/paymentsVouchers.interface';

@Component({
  selector: 'app-payment-vouchers',
  templateUrl: './payment-vouchers.component.html',
  styleUrl: './payment-vouchers.component.scss'
})
export class PaymentVouchersComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public paymentVouchers: PaymentVouchers[];

  constructor(
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.getPaymentVouchers();
  }

  private getPaymentVouchers() {
    this.store.pipe(select(selectPaymentsVouchers), takeUntil(this.destroy$))
      .subscribe((data: PaymentVouchers[]) => {
        this.paymentVouchers = data;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

}
