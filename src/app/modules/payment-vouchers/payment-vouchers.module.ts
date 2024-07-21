import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentVouchersComponent } from './payment-vouchers.component';
import { ShareModule } from '../../shared/module/share.module';
import { PaymVoucherHeaderComponent } from './@shared/components/paym-voucher-header/paym-voucher-header.component';

const routes: Routes = [
  {path: '', component: PaymentVouchersComponent}
]

@NgModule({
  declarations: [
    PaymentVouchersComponent,
    PaymVoucherHeaderComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentVouchersModule { }
