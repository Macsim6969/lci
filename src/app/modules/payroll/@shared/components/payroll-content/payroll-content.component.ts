import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-payroll-content',
  templateUrl: './payroll-content.component.html',
  styleUrl: './payroll-content.component.scss'
})
export class PayrollContentComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public tabsData: [{ title: string, route: string }];
  public isActiveTab: number = 1;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTabsDataFromJSon();

    this.choiceActiveTab(1, 'salary');
  }

  private getTabsDataFromJSon() {
    this.translate.stream('payroll.tabs').pipe(takeUntil(this.destroy$))
      .subscribe((data: [{ title: string, route: string }]) => {
        this.tabsData = data;
      })
  }

  public choiceActiveTab(newValue: number, title: string) {
    this.isActiveTab = newValue;
    this.router.navigate([`/payroll/${title}`]).then();

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
