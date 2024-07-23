import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SalaryDefinition } from '../../interfaces/salary.interface';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() public listData: SalaryDefinition[];
  public dataHeaderList: [{ title: string }];

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.streamJsonData();
  }

  private streamJsonData() {
    this.translate.stream('payroll.salary').pipe(takeUntil(this.destroy$))
      .subscribe((data: [{ title: string }]) => {
        this.dataHeaderList = data;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
