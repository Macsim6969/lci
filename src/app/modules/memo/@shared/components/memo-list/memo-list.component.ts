import { Component, Input, OnInit } from '@angular/core';
import { MemoList } from '../../interfaces/memo.interface';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrl: './memo-list.component.scss'
})
export class MemoListComponent implements OnInit {
  @Input() memoList: MemoList[];
  public memoDataType: { title: string }[];
  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.streamMemosListData();
  }

  private streamMemosListData() {
    this.translate.stream('memoList').pipe(take(1)).subscribe((data: { title: string }[]) => {
      this.memoDataType = data;
    })
  }
}
