import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectMemoList, selectStaffMiniList, selectUserInfo } from '../../../../../store/selectors/store.selectors';
import { StaffMiniList, User } from '../../../../../shared/interfaces/user.interface';
import { combineLatest, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../../../../shared/services/popup.service';
import { MemoList } from '../../../../memo/@shared/interfaces/memo.interface';
import { BackendService } from '../../../../../shared/services/backendAPI/backend.service';

@Component({
  selector: 'app-staff-added',
  templateUrl: './staff-added.component.html',
  styleUrl: './staff-added.component.scss'
})
export class StaffAddedComponent implements OnInit {
  public staffList: StaffMiniList[];
  private userInfo: User;
  public form: FormGroup;
  private memoList: MemoList[];

  constructor(
    private router: Router,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.getStaffMiniListFromStore();
    this.initializeForm();
  }

  private getStaffMiniListFromStore() {
    combineLatest(([this.store.pipe(select(selectStaffMiniList)), this.store.pipe(select(selectUserInfo)), this.store.pipe(select(selectMemoList))])).pipe(take(1))
      .subscribe(([data, userInfo, memoList]) => {
        this.staffList = data;
        this.userInfo = userInfo;
        this.memoList = Object.values(memoList);
        !this.staffList && !this.userInfo && !this.memoList ? this.router.navigate(['/memo']).then() : null;
      })
  }

  private initializeForm() {
    this.form = new FormGroup({
      memoTitle: new FormControl('', [Validators.required]),
      sentFrom: new FormControl(this.userInfo.name + ' ' + this.userInfo.lastName, [Validators.required]),
      sentTo: new FormControl('', [Validators.required]),
      actionFilter: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      attachment: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    })
  }

  public backTo() {
    const memoElement = document.querySelector('.create_memo');
    const navigateToMemo = () => this.router.navigate(['/staff']);

    if (memoElement) {
      memoElement.classList.add('close_animation');
      memoElement.addEventListener('animationend', navigateToMemo, { once: true });
    } else {
      navigateToMemo();
    }
  }

  public submit() {
    const newData: MemoList = {
      ...this.form.value,
      memoType: 'Sent',
      id: this.memoList.length + 1
    }

    this.backendService.setMemo(newData).add(() => {
      this.popupService._isOpenDone = true;
    });
    this.form.reset();
    this.backTo();
  }
}
