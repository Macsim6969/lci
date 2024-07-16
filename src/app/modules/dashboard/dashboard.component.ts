import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardIconService } from './@shared/services/dashboardIcon.service';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { DashboardInfo, DashboardTotalInfo } from './@shared/interfaces/dashboard.interface';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectDashboardData } from '../../store/selectors/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../shared/styles/dashboard.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public totalData: DashboardTotalInfo;
  public dashboardInfo: DashboardInfo[];
  constructor(
    private dashboardIcon: DashboardIconService,
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamDashboardInfo();
  }

  private streamDashboardInfo() {
    combineLatest(([this.translate.stream('dashboard'), this.store.pipe(select(selectDashboardData))])).pipe(takeUntil(this.destroy$))
      .subscribe(([dashboardData, totalData]) => {
        console.log(totalData)
        this.dashboardInfo = dashboardData.map((item: any) => {
          switch (item.icon) {
            case 'staff':
              return { ...item, total: totalData?.totalStaff };
            case 'application':
              return { ...item, total: totalData?.totalApplication };
            case 'projects':
              return { ...item, total: totalData?.totalProject };
            case 'departments': 
              return { ...item, total: totalData?.totalDepartments };
            default:
              return item;
          }
        });
      })

  }

  p

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
