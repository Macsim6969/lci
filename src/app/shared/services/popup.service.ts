import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class PopupService {

  private isOpenDoneSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set _isOpenDone(value: boolean) {
    this.isOpenDoneSubject.next(value);
  }

  get _isOpenDone$() {
    return this.isOpenDoneSubject;
  }
}