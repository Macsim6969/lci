import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentVouchers } from '../../interfaces/paymentsVouchers.interface';

@Component({
  selector: 'app-paym-voucher-header',
  templateUrl: './paym-voucher-header.component.html',
  styleUrl: './paym-voucher-header.component.scss'
})
export class PaymVoucherHeaderComponent {
  @Input() public paymentVouchers: PaymentVouchers[];
  @Input() public staffsFilter: string[];
  
  constructor(
    private router: Router
  ) { }

  public openCreateMemo() {
    this.router.navigate(['/staff/add']).then();
  }


  public setFilter(name: any) {
    //  this.staffService._filterText = event.target['value'];
  }
}
