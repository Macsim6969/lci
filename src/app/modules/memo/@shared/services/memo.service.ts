import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MemoList } from "../interfaces/memo.interface";


@Injectable()

export class MemoService {

  private memoListSubject: BehaviorSubject<MemoList> = new BehaviorSubject<MemoList>(null);
  private searchTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private filterTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  set _isMemoList(value: MemoList) {
    this.memoListSubject.next(value);
  }

  get _isMemoList$() {
    return this.memoListSubject;
  }

  set _searchText(value: string){
    this.searchTextSubject.next(value);
  }

  get _searchText$(){
    return this.searchTextSubject;
  }

  set _filterText(value: string){
    this.filterTextSubject.next(value);
  }

  get _filterText$(){
    return this.filterTextSubject;
  }
}