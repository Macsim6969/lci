import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { Subject, takeUntil } from 'rxjs';
import { selectMemoList } from '../../store/selectors/store.selectors';
import { MemoList } from './@shared/interfaces/memo.interface';
import { GlobalIconService } from '../../shared/services/icons/globalIcon.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrl: './memo.component.scss'
})
export class MemoComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public memoList: MemoList[];
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private globalIcon: GlobalIconService
  ) { }

  ngOnInit(): void {
    this.getMemoListFromStore();
  }

  private getMemoListFromStore() {
    this.store.pipe(select(selectMemoList), takeUntil(this.destroy$)).subscribe((data: MemoList[]) => {
      this.memoList = Object.values(data);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
