import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MemoList } from "../../modules/memo/@shared/interfaces/memo.interface";
import { Subject, take, takeUntil } from "rxjs";
import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../../store/model/store.model";
import { selectMemoList, selectStaffMiniList, selectUsersProfile } from "../../store/selectors/store.selectors";
import { User } from "../interfaces/user.interface";

@Component({
  template: ''
})

export abstract class StaffListData implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public staffList: User[];
  public staffDataType: { title: string }[];
  constructor(
    protected translate: TranslateService,
    protected store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamMemosListData();
    this.getMemoListFromStore();
  }

  private streamMemosListData() {
    this.translate.stream('stafMiniList').pipe(take(1)).subscribe((data: { title: string }[]) => {
      this.staffDataType = data;
    })
  }

  private getMemoListFromStore() {
    this.store.pipe(select(selectUsersProfile), takeUntil(this.destroy$)).subscribe((data: User[]) => {
      this.staffList = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}