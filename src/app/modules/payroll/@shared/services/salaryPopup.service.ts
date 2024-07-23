import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class SalaryPopupSerivce {
  private isSalaryCreateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set _isSalaryCreate(value: boolean) {
    this.isSalaryCreateSubject.next(value);
  }

  get _isSalaryCreate$() {
    return this.isSalaryCreateSubject;
  }
}