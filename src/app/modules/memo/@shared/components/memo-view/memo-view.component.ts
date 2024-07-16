import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoService } from '../../services/memo.service';
import { MemoList } from '../../interfaces/memo.interface';

@Component({
  selector: 'app-memo-view',
  templateUrl: './memo-view.component.html',
  styleUrl: './memo-view.component.scss'
})
export class MemoViewComponent implements OnInit {
  public memoList: MemoList;
  constructor(
    private router: Router,
    private memoService: MemoService
  ) { }

  ngOnInit(): void {
    this.getMemoListView();
  }

  private getMemoListView() {
    this.memoList = this.memoService._isMemoList$.getValue();
    !this.memoList ? this.router.navigate(['/memo']).then() : null;
  }

  public backTo() {
    const memoElement = document.querySelector('.view_memo');
    const navigateToMemo = () => this.router.navigate(['/memo']);

    if (memoElement) {
      memoElement.classList.add('close_animation');
      memoElement.addEventListener('animationend', navigateToMemo, { once: true });
    } else {
      navigateToMemo();
    }
  }
}
