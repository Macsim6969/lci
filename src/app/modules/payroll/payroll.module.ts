import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollComponent } from './payroll.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/module/share.module';
import { PayrollHeaderComponent } from './@shared/components/payroll-header/payroll-header.component';
import { PayrollIconService } from '../../shared/services/icons/payrollIcon.service';
import { PayrollContentComponent } from './@shared/components/payroll-content/payroll-content.component';
import { ListComponent } from './@shared/components/list/list.component';
import { CreateSalaryComponent } from './@shared/components/create-salary/create-salary.component';
import { SalaryPopupSerivce } from './@shared/services/salaryPopup.service';
import { SalaryComponent } from './@shared/components/salary/salary.component';
import { TaxComponent } from './@shared/components/tax/tax.component';

const routes: Routes = [
  {
    path: '', component: PayrollComponent, children: [
      { path: 'payroll', redirectTo: '/payroll/salary' },
      { path: 'salary', component: SalaryComponent },
      { path: 'tax', component: TaxComponent }
    ]
  }
]

@NgModule({
  declarations: [
    PayrollComponent,
    PayrollHeaderComponent,
    PayrollContentComponent,
    ListComponent,
    CreateSalaryComponent,
    SalaryComponent,
    TaxComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PayrollIconService,
    SalaryPopupSerivce
  ]
})
export class PayrollModule { }
