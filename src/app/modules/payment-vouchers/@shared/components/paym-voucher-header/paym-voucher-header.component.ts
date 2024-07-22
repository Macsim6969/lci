import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentVouchers } from '../../interfaces/paymentsVouchers.interface';
import { PaymentPopupCreateService } from '../../services/payment-popup-create.service';

@Component({
  selector: 'app-paym-voucher-header',
  templateUrl: './paym-voucher-header.component.html',
  styleUrl: './paym-voucher-header.component.scss'
})
export class PaymVoucherHeaderComponent {
  @Input() public paymentVouchers: PaymentVouchers[];
  @Input() public staffsFilter: string[];

  constructor(
    private router: Router,
    private paymentPopupCreate: PaymentPopupCreateService
  ) { }

  public openPaymentVouchers() {
    this.paymentPopupCreate._isOpenPopup = true;
  }


  public setFilter(name: any) {
    //  this.staffService._filterText = event.target['value'];
  }
}
