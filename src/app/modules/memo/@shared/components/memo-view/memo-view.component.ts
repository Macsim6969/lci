import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoService } from '../../services/memo.service';
import { MemoList } from '../../interfaces/memo.interface';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectMemoList } from '../../../../../store/selectors/store.selectors';
import { take } from 'rxjs';
import { PopupReviewedSerivce } from '../../services/popup-reviewed.service';
import { PopupService } from '../../../../../shared/services/popup.service';
import { BackendService } from '../../../../../shared/services/backendAPI/backend.service';

@Component({
  selector: 'app-memo-view',
  templateUrl: './memo-view.component.html',
  styleUrl: './memo-view.component.scss'
})
export class MemoViewComponent implements OnInit {
  public memoList: MemoList;
  constructor(
    private router: Router,
    private memoService: MemoService,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService,
    private popupReviewed: PopupReviewedSerivce,
    private popupSerive: PopupService
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

  public closeMemo() {
    this.store.pipe(select(selectMemoList), take(1)).subscribe((data) => {
      const blockId = Object.keys(data).find(key => data[key].id === this.memoList.id);
      const newData: MemoList = {
        ...this.memoList,
        finished: true
      }

      this.backendService.updatedMemo(blockId, newData).add(() => {
        this.popupSerive._isOpenDone = true;
        this.router.navigate(['/memo']).then();
      });
    })

  }

  public openPopup() {
    this.popupReviewed._isMemoList = this.memoList;
    this.popupReviewed._isPopupSend = true;
  }
}
