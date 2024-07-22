import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../shared/services/backend.service';
import { setStartPayrollData } from '../../shared/base/startData';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { Subject, takeUntil } from 'rxjs';
import { PayrollData } from './@shared/interfaces/payroll.interface';
import { selectPayroll } from '../../store/selectors/store.selectors';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public payrollDashboard: PayrollData;

  constructor(
    private backendService: BackendService,
    private store: Store<{ store: StoreInterface }>

  ) { }

  ngOnInit(): void {
    this.setNewSalaryDate();
  }

  private setNewSalaryDate() {
    this.store.pipe(select(selectPayroll), takeUntil(this.destroy$)).subscribe((data) => {
      console.log(data);
      if (!data) {
        this.backendService.setPayrollData(setStartPayrollData())
      } else {
        this.payrollDashboard = Object.values(data)[0];
      }
     })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
