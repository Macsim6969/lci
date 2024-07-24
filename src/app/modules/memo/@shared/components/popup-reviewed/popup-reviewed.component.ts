import { Component, OnInit } from '@angular/core';
import { PopupReviewedSerivce } from '../../services/popup-reviewed.service';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { combineLatest, take } from 'rxjs';
import { selectMemoList, selectStaffMiniList, selectUserInfo } from '../../../../../store/selectors/store.selectors';
import { StaffMiniList } from '../../../../../shared/interfaces/user.interface';
import { MemoList } from '../../interfaces/memo.interface';
import { Router } from '@angular/router';
import { BackendService } from '../../../../../shared/services/backendAPI/backend.service';

@Component({
  selector: 'app-popup-reviewed',
  templateUrl: './popup-reviewed.component.html',
  styleUrl: './popup-reviewed.component.scss'
})
export class PopupReviewedComponent implements OnInit {
  public userName: string;
  public staff: StaffMiniList[];
  private sentTo: string;
  constructor(
    private popupRevied: PopupReviewedSerivce,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.streamUsersFromStore();
  }

  private streamUsersFromStore() {
    combineLatest(([this.store.pipe(select(selectUserInfo)), this.store.pipe(select(selectStaffMiniList))])).pipe(take(1))
      .subscribe(([userName, staffList]) => {
        this.userName = userName.name + ' ' + userName.lastName;
        this.staff = staffList.filter((e: StaffMiniList) => e.name !== this.userName);
      })
  }

  public setFilter(event: any) {
    this.sentTo = event.target['value'];
  }

  public saveChanges() {
    this.store.pipe(select(selectMemoList), take(1)).subscribe((data) => {
      const memoList = this.popupRevied._isMemoList$.getValue();
      const blockId = Object.keys(data).find(key => data[key].id === memoList.id);

      const newData: MemoList = {
        ...memoList,
        sentFrom: this.userName,
        sentTo: this.sentTo
      }

      this.backendService.updatedMemo(blockId, newData).add(() => {
        this.closePopup();
        this.router.navigate(['/memo']).then();
      });
    });

  }

  public closePopup() {
    this.popupRevied._isPopupSend = false;
  }
}
