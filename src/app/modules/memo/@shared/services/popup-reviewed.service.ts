import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MemoList } from "../interfaces/memo.interface";


@Injectable()

export class PopupReviewedSerivce {
  private isPopupSendSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isMemoListDataSubject: BehaviorSubject<MemoList> = new BehaviorSubject<MemoList>(null);

  set _isPopupSend(value: boolean) {
    this.isPopupSendSubject.next(value);
  }

  get _isPopupSend$() {
    return this.isPopupSendSubject;
  }

  set _isMemoList(value: MemoList) {
    this.isMemoListDataSubject.next(value);
  }

  get _isMemoList$() {
    return this.isMemoListDataSubject;
  }

}