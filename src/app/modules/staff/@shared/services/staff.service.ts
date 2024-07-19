import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../../../../shared/interfaces/user.interface";


@Injectable()

export class StaffService {

  private staffListSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private searchTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private filterTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  set _isStaffList(value: User) {
    this.staffListSubject.next(value);
  }

  get _isStaffList$() {
    return this.staffListSubject;
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