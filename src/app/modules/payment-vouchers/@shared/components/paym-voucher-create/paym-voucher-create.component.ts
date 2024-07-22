import { Component, OnInit } from '@angular/core';
import { PaymentPopupCreateService } from '../../services/payment-popup-create.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectStaffMiniList, selectUserInfo } from '../../../../../store/selectors/store.selectors';
import { combineLatest, take } from 'rxjs';
import { StaffMiniList, User } from '../../../../../shared/interfaces/user.interface';
import { PaymentVouchers } from '../../interfaces/paymentsVouchers.interface';
import { BackendService } from '../../../../../shared/services/backend.service';

@Component({
  selector: 'app-paym-voucher-create',
  templateUrl: './paym-voucher-create.component.html',
  styleUrl: './paym-voucher-create.component.scss'
})
export class PaymVoucherCreateComponent implements OnInit {
  public form: FormGroup;
  public staffList: StaffMiniList[];
  public userName: string;
  constructor(
    private paymentPopupCreate: PaymentPopupCreateService,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.getStaffMiniListFromStore();
  }

  private initializeForm(name: string) {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      preparedBy: new FormControl(name, [Validators.required]),
      sendTo: new FormControl('', [Validators.required])
    })
  }

  private getStaffMiniListFromStore() {
    combineLatest(([this.store.pipe(select(selectStaffMiniList)), this.store.pipe(select(selectUserInfo))])).pipe(take(1))
      .subscribe(([data, userInfo]) => {
        this.userName = userInfo.name + ' ' + userInfo.lastName;
        this.staffList = data.filter(e => e.name !== this.userName);
        this.initializeForm(this.userName)
      })
  }

  public submit() {
    const newData: PaymentVouchers = {
      id: this.form.value.id,
      subject: this.form.value.subject,
      preparedBy: this.form.value.preparedBy,
      sendTo: this.form.value.sendTo,
      data: new Date()
    }

    this.backendService.setPaymentVouchers(newData);
    this.form.reset();
    this.paymentPopupCreate._isOpenPopup = false;
  }


  public closePopup() {
    this.paymentPopupCreate._isOpenPopup = false;
  }

}
