import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreInterface } from '../../store/model/store.model';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectPaymentsVouchers } from '../../store/selectors/store.selectors';
import { PaymentVouchers } from './@shared/interfaces/paymentsVouchers.interface';
import { GlobalIconService } from '../../shared/services/icons/globalIcon.service';
import { PaymentPopupCreateService } from './@shared/services/payment-popup-create.service';

@Component({
  selector: 'app-payment-vouchers',
  templateUrl: './payment-vouchers.component.html',
  styleUrl: './payment-vouchers.component.scss'
})
export class PaymentVouchersComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public paymentVouchers: PaymentVouchers[];
  public isOpenPopup: boolean;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private globalIcon: GlobalIconService,
    private paymentPopupCreate: PaymentPopupCreateService
  ) { }

  ngOnInit(): void {
    this.getPaymentVouchers();
    this.streamOpenPaymentPopupCreate();
  }

  private getPaymentVouchers() {
    this.store.pipe(select(selectPaymentsVouchers), takeUntil(this.destroy$))
      .subscribe((data: PaymentVouchers[]) => {
        this.paymentVouchers = Object.values(data);
      })
  }

  private streamOpenPaymentPopupCreate() {
    this.paymentPopupCreate._isOpenPopup$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isOpenPopup = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

}
