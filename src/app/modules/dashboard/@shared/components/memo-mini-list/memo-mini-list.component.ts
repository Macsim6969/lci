import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MemoList } from '../../../../memo/@shared/interfaces/memo.interface';
import { TranslateService } from '@ngx-translate/core';
import { GlobalIconService } from '../../../../../shared/services/icons/globalIcon.service';
import { MemoListData } from '../../../../../shared/base/memoList';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';

@Component({
  selector: 'app-memo-mini-list',
  templateUrl: './memo-mini-list.component.html',
  styleUrl: './memo-mini-list.component.scss'
})
export class MemoMiniListComponent extends MemoListData implements OnInit {
  constructor(
    override translate: TranslateService,
    override store: Store<{ store: StoreInterface }>,
    private globalIcon: GlobalIconService
  ) {
    super(translate, store)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
