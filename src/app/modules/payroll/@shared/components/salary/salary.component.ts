import { Component, OnDestroy, OnInit } from '@angular/core';
import { SalaryPopupSerivce } from '../../services/salaryPopup.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.scss'
})
export class SalaryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isSalaryPopup: boolean;
  constructor(
    private salaryPopup: SalaryPopupSerivce
  ) { }

  ngOnInit(): void {
    this.streamSalaryPopup();
  }

  private streamSalaryPopup() {
    this.salaryPopup._isSalaryCreate$.pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean) => {
        this.isSalaryPopup = data;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
