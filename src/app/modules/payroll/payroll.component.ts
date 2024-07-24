import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { PayrollDashboard } from './@shared/interfaces/payroll.interface';
import { PayrollIconService } from '../../shared/services/icons/payrollIcon.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalIconService } from '../../shared/services/icons/globalIcon.service';
import { selectPayroll } from '../../store/selectors/payroll.select';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public payrollDashboard: PayrollDashboard[];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private translate: TranslateService,
    private payrollIcon: PayrollIconService,
    private globalIcon: GlobalIconService

  ) { }

  ngOnInit(): void {
    this.streamDashboardInfo();
  }

  private streamDashboardInfo() {
    combineLatest(([this.translate.stream('dashboardPayroll'), this.store.pipe(select(selectPayroll))])).pipe(takeUntil(this.destroy$))
      .subscribe(([dashboardData, totalData]) => {
        this.payrollDashboard = dashboardData.map((item: any) => {
          switch (item.icon) {
            case 'gross':
              return { ...item, total: Object.values(totalData)[0] ?  Object.values(totalData)[0].gross : 0 };
            case 'loan':
              return { ...item, total:  Object.values(totalData)[0] ?  Object.values(totalData)[0]?.loan : 0 };
            case 'tax':
              return { ...item, total:  Object.values(totalData)[0] ?  Object.values(totalData)[0]?.tax : 0 };
            case 'net':
              return { ...item, total:  Object.values(totalData)[0] ?  Object.values(totalData)[0]?.net : 0 };
            default:
              return item;
          }
        });
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
