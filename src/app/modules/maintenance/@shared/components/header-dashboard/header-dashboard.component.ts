import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';
import { Dashboard } from '../../../../payroll/@shared/interfaces/payroll.interface';
import { selectMaintenanceDashboard, selectMaintenanceList } from '../../../../../store/selectors/maintenance.selectors';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss', '../../../../../shared/styles/dashboard.scss']
})
export class HeaderDashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public maintenanceDashboard: Dashboard[];

  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamDashboardInfo();
  }

  private streamDashboardInfo() {
    combineLatest(([this.translate.stream('dashboardMaintenance'), this.store.pipe(select(selectMaintenanceDashboard))])).pipe(takeUntil(this.destroy$))
      .subscribe(([dashboardData, totalData]) => {
        this.maintenanceDashboard = dashboardData.map((item: any) => {
          switch (item.icon) {
            case 'scheduled':
              return { ...item, total: totalData ? Object.values(totalData)[0].scheduled : 0 };
            case 'completed':
              return { ...item, total: totalData ? Object.values(totalData)[0]?.completed : 0 };
            case 'pending':
              return { ...item, total: totalData ? Object.values(totalData)[0]?.pending : 0 };
            case 'overdue':
              return { ...item, total: totalData ? Object.values(totalData)[0]?.overdue : 0 };
            default:
              return item;
          }
        });
      })
  }

  ngOnDestroy(): void {

  }

}
