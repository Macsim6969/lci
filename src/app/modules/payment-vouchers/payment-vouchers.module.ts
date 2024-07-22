import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentVouchersComponent } from './payment-vouchers.component';
import { ShareModule } from '../../shared/module/share.module';
import { PaymVoucherHeaderComponent } from './@shared/components/paym-voucher-header/paym-voucher-header.component';
import { PaymVoucherListComponent } from './@shared/components/paym-voucher-list/paym-voucher-list.component';
import { PaymentVouchersService } from './@shared/services/payment-voucher.service';
import { PaymVoucherCreateComponent } from './@shared/components/paym-voucher-create/paym-voucher-create.component';
import { PaymentPopupCreateService } from './@shared/services/payment-popup-create.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: PaymentVouchersComponent}
]

@NgModule({
  declarations: [
    PaymentVouchersComponent,
    PaymVoucherHeaderComponent,
    PaymVoucherListComponent,
    PaymVoucherCreateComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[ 
    PaymentVouchersService,
    PaymentPopupCreateService
  ]
})
export class PaymentVouchersModule { }
