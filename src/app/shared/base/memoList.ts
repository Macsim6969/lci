import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MemoList } from "../../modules/memo/@shared/interfaces/memo.interface";
import { Subject, take, takeUntil } from "rxjs";
import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../../store/model/store.model";
import { selectMemoList } from "../../store/selectors/store.selectors";

@Component({
  template: ''
})

export abstract class MemoListData implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public memoList: MemoList[];
  public memoDataType: { title: string }[];
  constructor(
    protected translate: TranslateService,
    protected store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamMemosListData();
    this.getMemoListFromStore();
  }

  private streamMemosListData() {
    this.translate.stream('memoMiniList').pipe(take(1)).subscribe((data: { title: string }[]) => {
      this.memoDataType = data;
    })
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