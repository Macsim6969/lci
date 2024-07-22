import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class PaymentPopupCreateService{

  private isOpenPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set _isOpenPopup(value: boolean){
    this.isOpenPopupSubject.next(value);
  }

  get _isOpenPopup$(){
    return this.isOpenPopupSubject;
  }
}