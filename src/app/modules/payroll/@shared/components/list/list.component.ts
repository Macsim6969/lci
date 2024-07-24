import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SalaryDefinition } from '../../interfaces/salary.interface';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { SalaryPopupSerivce } from '../../services/salaryPopup.service';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectPayrollSalary } from '../../../../../store/selectors/payroll.select';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public listData: SalaryDefinition[];
  public dataHeaderList: [{ title: string }];

  constructor(
    private translate: TranslateService,
    private salaryPopup: SalaryPopupSerivce,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamJsonData();
    this.getPayrollSalary();
  }

  private streamJsonData() {
    this.translate.stream('payroll.salary').pipe(takeUntil(this.destroy$))
      .subscribe((data: [{ title: string }]) => {
        this.dataHeaderList = data;
      })
  }

  private getPayrollSalary() {
    this.store.pipe(select(selectPayrollSalary), takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.listData = Object.values(data);
        }
      })
  }

  public openSalaryPopup() {
    this.salaryPopup._isSalaryCreate = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
