import { Component, Input } from '@angular/core';
import { Dashboard } from '../../interfaces/payroll.interface';

@Component({
  selector: 'app-payroll-header',
  templateUrl: './payroll-header.component.html',
  styleUrls: ['./payroll-header.component.scss', '../../../../../shared/styles/dashboard.scss']
})
export class PayrollHeaderComponent {
  @Input() dashboardInfo: Dashboard[]

  constructor() { }

}
