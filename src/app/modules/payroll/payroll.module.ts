import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollComponent } from './payroll.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { PayrollHeaderComponent } from './@shared/components/payroll-header/payroll-header.component';
import { PayrollIconService } from '../../shared/services/icons/payrollIcon.service';

const routes: Routes = [
  { path: '', component: PayrollComponent }
]

@NgModule({
  declarations: [
    PayrollComponent,
    PayrollHeaderComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PayrollIconService
  ]
})
export class PayrollModule { }
