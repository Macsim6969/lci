import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../../../../shared/interfaces/user.interface";
import { PaymentVouchers } from "../interfaces/paymentsVouchers.interface";


@Injectable()

export class PaymentVouchersService {

  private staffListSubject: BehaviorSubject<PaymentVouchers> = new BehaviorSubject<PaymentVouchers>(null);
  private filterTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  set _ispPaymentVouchers(value: PaymentVouchers) {
    this.staffListSubject.next(value);
  }

  get _ispPaymentVouchers$() {
    return this.staffListSubject;
  }

  set _filterText(value: string){
    this.filterTextSubject.next(value);
  }

  get _filterText$(){
    return this.filterTextSubject;
  }
}