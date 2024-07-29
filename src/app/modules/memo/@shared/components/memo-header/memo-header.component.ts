import { StaffMiniList } from './../../../../../shared/interfaces/user.interface';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MemoList } from '../../interfaces/memo.interface';
import { Router } from '@angular/router';
import { MemoService } from '../../services/memo.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectStaffMiniList, selectUserInfo } from '../../../../../store/selectors/store.selectors';
import { User } from '../../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-memo-header', 
  templateUrl: './memo-header.component.html',
  styleUrls: ['./memo-header.component.scss', '../../../../../shared/styles/headerPage.scss']
})
export class MemoHeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() memoList: MemoList[];
  public staffs: StaffMiniList[];
  private user: User;
  public myName: string;
  constructor(
    private router: Router,
    private memoService: MemoService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.getStaffMiniListFromStore();
  }

  private getStaffMiniListFromStore() {
    combineLatest(([this.store.pipe(select(selectStaffMiniList)), this.store.pipe(select(selectUserInfo))])).pipe(takeUntil(this.destroy$))
      .subscribe(([data, user]) => {
        this.user = user;
        this.staffs = data.filter((e: StaffMiniList) => e.name !== (this.user.name + ' ' + this.user.lastName));
        this.staffs.push({ name: 'All', id: 'all' })
        this.myName = this.user.name + ' ' + this.user.lastName
      })
  }

  public openCreateMemo() {
    this.router.navigate(['/memo/create']).then();
  }

  public changeData(event: any) {
    this.memoService._searchText = event.target.value;
  }

  public setFilter(name: any) {
    this.memoService._filterText = event.target['value'];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
