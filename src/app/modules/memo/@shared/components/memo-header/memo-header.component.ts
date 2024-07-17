import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MemoList } from '../../interfaces/memo.interface';
import { Router } from '@angular/router';
import { MemoService } from '../../services/memo.service';
import { Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectStaffMiniList } from '../../../../../store/selectors/store.selectors';
import { StaffMiniList } from '../../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-memo-header',
  templateUrl: './memo-header.component.html',
  styleUrl: './memo-header.component.scss'
})
export class MemoHeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() memoList: MemoList[];
  public staffs: StaffMiniList[];
  constructor(
    private router: Router,
    private memoService: MemoService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.getStaffMiniListFromStore();
  }

  private getStaffMiniListFromStore() {
    this.store.pipe(select(selectStaffMiniList), takeUntil(this.destroy$))
      .subscribe((data: StaffMiniList[]) => {
        this.staffs = data;
      })
  }

  public openCreateMemo() {
    this.router.navigate(['/memo/create']).then();
  }

  public changeData(event: any) {
    this.memoService._searchText = event.target.value;
  }

  public setFilter(name: any){
    this.memoService._filterText = event.target['value'];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
