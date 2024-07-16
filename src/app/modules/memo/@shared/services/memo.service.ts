import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MemoList } from "../interfaces/memo.interface";


@Injectable()

export class MemoService {

  private memoListSubject: BehaviorSubject<MemoList> = new BehaviorSubject<MemoList>(null);

  set _isMemoList(value: MemoList) {
    this.memoListSubject.next(value);
  }

  get _isMemoList$() {
    return this.memoListSubject;
  }
}