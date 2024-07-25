import { Component, OnDestroy, OnInit } from '@angular/core';
import { SalaryPopupSerivce } from '../../services/salaryPopup.service';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subject, take, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalaryDefinition } from '../../interfaces/salary.interface';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectPayrollSalary } from '../../../../../store/selectors/payroll.selectors';
import { PayrollApiService } from '../../../../../shared/services/backendAPI/payrollApi.service';
import { PopupService } from '../../../../../shared/services/popup.service';

@Component({
  selector: 'app-salary-popup',
  templateUrl: './salary-popup.component.html',
  styleUrl: './salary-popup.component.scss'
})
export class SalaryPopupComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public jobPosition: [{ title: string }];
  public levelPosition: [{ title: string }];
  public form: FormGroup;

  constructor(
    private salaryPopup: SalaryPopupSerivce,
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private payrollApi: PayrollApiService,
    private popupSerice: PopupService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getDataJobPositionAndLevel();
  }

  private initializeForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      allowance: new FormControl('', [Validators.required]),
      grossSalary: new FormControl('', [Validators.required]),
      deductions: new FormControl('', [Validators.required]),
      netSalary: new FormControl('', [Validators.required])
    })
  }

  private getDataJobPositionAndLevel() {
    combineLatest(([this.translate.stream('jobPositions'), this.translate.stream('jobLevel')])).pipe(takeUntil(this.destroy$))
      .subscribe(([jobTitle, jobLevel]) => {
        this.jobPosition = jobTitle;
        this.levelPosition = jobLevel;
      })
  }

  public submit() {

    this.store.pipe(select(selectPayrollSalary), take(1))
      .subscribe((data) => {
        console.log(this.form.value);
        const newDate: SalaryDefinition = {
          ...this.form.value,
          id: Object.values(data).length + 1
        }

        this.payrollApi.updatePayrollSalary(newDate)
        this.form.reset();
        this.salaryPopup._isSalaryCreate = false;
        this.popupSerice._isOpenDone = true;
      })

  }

  public closePopup() {
    this.salaryPopup._isSalaryCreate = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
