import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PaymentVouchers } from '../../interfaces/paymentsVouchers.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GlobalIconService } from '../../../../../shared/services/icons/globalIcon.service';
import { PaymentVouchersService } from '../../services/payment-voucher.service';

@Component({
  selector: 'app-paym-voucher-list',
  templateUrl: './paym-voucher-list.component.html',
  styleUrl: './paym-voucher-list.component.scss'
})
export class PaymVoucherListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() public paymentVouchers: PaymentVouchers[];
  @Input() public backsPaymentVouchers: PaymentVouchers[];
  public memoDataType: { title: string }[];
  constructor(
    private translate: TranslateService,
    private router: Router,
    private paymentVouchersService: PaymentVouchersService,
    private globalIcon: GlobalIconService
  ) { }

  ngOnInit(): void {
    this.streamMemosListData();
    this.streamCheckFilterList();
  }

  private streamMemosListData() {
    this.translate.stream('paymentVoucher').pipe(take(1)).subscribe((data: { title: string }[]) => {
      this.memoDataType = data;
    })
  }


  private streamCheckFilterList() {
    this.paymentVouchersService._filterText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data === 'All') {
        this.paymentVouchers = this.backsPaymentVouchers;
      } else if (data) {
        this.paymentVouchers = this.backsPaymentVouchers.filter(
          (e: PaymentVouchers) => e.sendTo === data);
      }
    });
  }


  public checkMemoView(id: number) {
    const newValue = this.paymentVouchers.find((e: PaymentVouchers) => e.id === id);
    this.paymentVouchersService._ispPaymentVouchers = newValue;
    this.router.navigate(['/staff/view']).then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
