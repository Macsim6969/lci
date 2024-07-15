import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardIconService } from './@shared/services/dashboardIcon.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardInfo } from './@shared/interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../shared/styles/dashboard.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public dashboardInfo: DashboardInfo[];
  constructor(
    private dashboardIcon: DashboardIconService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.streamDashboardInfo();
  }

  private streamDashboardInfo() {
    this.translate.stream('dashboard').pipe(takeUntil(this.destroy$)).subscribe((data: DashboardInfo[]) => {
      this.dashboardInfo = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
