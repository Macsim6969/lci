import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentVouchersComponent } from './payment-vouchers.component';
import { ShareModule } from '../../shared/module/share.module';
import { PaymVoucherHeaderComponent } from './@shared/components/paym-voucher-header/paym-voucher-header.component';
import { PaymVoucherListComponent } from './@shared/components/paym-voucher-list/paym-voucher-list.component';
import { PaymentVouchersService } from './@shared/services/payment-voucher.service';

const routes: Routes = [
  {path: '', component: PaymentVouchersComponent}
]

@NgModule({
  declarations: [
    PaymentVouchersComponent,
    PaymVoucherHeaderComponent,
    PaymVoucherListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers:[ 
    PaymentVouchersService
  ]
})
export class PaymentVouchersModule { }
