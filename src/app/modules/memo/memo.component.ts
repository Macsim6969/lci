import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { Subject, takeUntil } from 'rxjs';
import { selectMemoList } from '../../store/selectors/store.selectors';
import { MemoList } from './@shared/interfaces/memo.interface';
import { GlobalIconService } from '../../shared/services/icons/globalIcon.service';
import { PopupReviewedSerivce } from './@shared/services/popup-reviewed.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrl: './memo.component.scss'
})
export class MemoComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public memoList: MemoList[];
  public isPopupSend: boolean;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private globalIcon: GlobalIconService,
    private popupReviewed: PopupReviewedSerivce
  ) { }

  ngOnInit(): void {
    this.getMemoListFromStore();
    this.streamIsPopupSendOpen();
  }

  private getMemoListFromStore() {
    this.store.pipe(select(selectMemoList), takeUntil(this.destroy$)).subscribe((data: MemoList[]) => {
      this.memoList = Object.values(data);
    })
  }

  private streamIsPopupSendOpen() {
    this.popupReviewed._isPopupSend$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isPopupSend = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
