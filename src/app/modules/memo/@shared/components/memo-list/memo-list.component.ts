import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MemoList } from '../../interfaces/memo.interface';
import { TranslateService } from '@ngx-translate/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MemoService } from '../../services/memo.service';
import { GlobalIconService } from '../../../../../shared/services/icons/globalIcon.service';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrl: './memo-list.component.scss'
})
export class MemoListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() public memoList: MemoList[];
  @Input() public backMemoList: MemoList[];
  public memoDataType: { title: string }[];
  constructor(
    private translate: TranslateService,
    private router: Router,
    private memoService: MemoService,
    private globalIcon: GlobalIconService
  ) { }

  ngOnInit(): void {
    this.streamMemosListData();
    this.streamCheckSearchDataForList();
    this.streamCheckFilterList();
  }

  private streamMemosListData() {
    this.translate.stream('memoList').pipe(take(1)).subscribe((data: { title: string }[]) => {
      this.memoDataType = data;
    })
  }

  private streamCheckSearchDataForList() {
    this.memoService._searchText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data) {
        this.memoList = this.backMemoList.filter(
          (e: MemoList) => e.memoTitle.trim().toLocaleLowerCase().includes(data.toLocaleLowerCase())
        );
      } else {
        this.memoList = this.backMemoList
      }
    })
  }

  private streamCheckFilterList() {
    this.memoService._filterText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data === 'All') {
        this.memoList = this.backMemoList;
      } else if (data) {
        this.memoList = this.backMemoList.filter(
          (e: MemoList) => e.sentTo === data)
      }
    })
  }

  public checkMemoView(id: number) {
    const newValue = this.memoList.find((e: MemoList) => e.id === id);
    this.memoService._isMemoList = newValue;
    this.router.navigate(['/memo/view']).then();
  }

  ngOnDestroy(): void {

  }
}
