import { Component, Input } from '@angular/core';
import { MemoList } from '../../interfaces/memo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memo-header',
  templateUrl: './memo-header.component.html',
  styleUrl: './memo-header.component.scss'
})
export class MemoHeaderComponent {
  @Input() memoList: MemoList[];
  foods = [
    { value: 'steak-0', viewValue: 'All memos' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(
    private router: Router
  ) { }

  public openCreateMemo() {
    this.router.navigate(['/memo/create']).then();
  }
}
