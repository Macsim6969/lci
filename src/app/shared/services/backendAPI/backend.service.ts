import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { User } from "../../interfaces/user.interface";
import { setUserData, setUsers } from "../../../store/actions/store.actions";
import { StoreInterface } from "../../../store/model/store.model";
import { setStaffMiniList, setStaffUserProfile } from "../../../store/actions/staff.actions";
import { DashboardTotalInfo } from "../../../modules/dashboard/@shared/interfaces/dashboard.interface";
import { setDashbordInfo } from "../../../store/actions/dashboard.actions";
import { sendMemoData } from "../../../store/actions/memo.actions";
import { MemoList } from "../../../modules/memo/@shared/interfaces/memo.interface";
import { PaymentVouchers } from "../../../modules/payment-vouchers/@shared/interfaces/paymentsVouchers.interface";
import { setPaymentsVouchers } from "../../../store/actions/paymentVouchers.actions";
import { PayrollData } from "../../../modules/payroll/@shared/interfaces/payroll.interface";
import { setPayroallDashboard } from "../../../store/actions/payroll.actions";

@Injectable({ providedIn: 'root' })

export class BackendService {
  private baseUrl = 'https://lcii-cd674-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,) {
  }

  public getUserInfo(idUser) {
    return this.http.get<User>(`${this.baseUrl}/users/${idUser}/profile.json`).subscribe((userData: User) => {
      this.store.dispatch(setUserData({ data: userData }));
    });
  }

  public getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users.json`).subscribe((userData: User[]) => {
      const usersProfile = Object.values(userData)?.reduce((acc, val) => {
        acc.push(val['profile']);
        return acc;
      }, []);
      const users = Object.values(userData)?.map(e => ({ name: e['profile'].name + ' ' + e['profile'].lastName, id: e['profile'].userID }));
      this.store.dispatch(setStaffUserProfile({ data: usersProfile }));
      this.store.dispatch(setStaffMiniList({ data: users }));
      this.store.dispatch(setUsers({ data: userData }));
    });
  }

  public removeUser(userId: string) {
    return this.http.delete<User>(`${this.baseUrl}/users/${userId}.json`).subscribe();
  }

  public sendUserProfile(userData: User) {
    return this.http.put<User>(`${this.baseUrl}/users/${userData.userID}/profile.json`, userData).subscribe(() => {
      this.getUsers()
    });
  }

  public setDashboardInfo(userID: string, dashboardInfo: DashboardTotalInfo) {
    return this.http.put<DashboardTotalInfo>(`${this.baseUrl}/users/${userID}/dashboardInfo.json`, dashboardInfo).subscribe((data: DashboardTotalInfo) => {
      this.store.dispatch(setDashbordInfo({ data: data }))
    })
  }

  public getDashboardInfo(userID: string) {
    return this.http.get<DashboardTotalInfo>(`${this.baseUrl}/users/${userID}/dashboardInfo.json`).subscribe((data: DashboardTotalInfo) => {
      this.store.dispatch(setDashbordInfo({ data: data }))
    })
  }

  public getMemo() {
    return this.http.get<MemoList[]>(`${this.baseUrl}/memo.json`).subscribe((data: MemoList[]) => {
      data ? this.store.dispatch(sendMemoData({ data: data })) : this.store.dispatch(sendMemoData({ data: [] }));
    })
  }

  public setMemo(memoData: MemoList) {
    return this.http.post<MemoList>(`${this.baseUrl}/memo.json`, memoData).subscribe(() => {
      this.getMemo();
    })
  }

  public updatedMemo(idList: string, memoData: MemoList) {
    return this.http.put<MemoList>(`${this.baseUrl}/memo/${idList}.json`, memoData).subscribe(() => {
      this.getMemo();
    })
  }

  public getPaymentVouchers() {
    return this.http.get<PaymentVouchers[]>(`${this.baseUrl}/payments.json`).subscribe((data: PaymentVouchers[]) => {
      this.store.dispatch(setPaymentsVouchers({ data: data }));
    })
  }

  public setPaymentVouchers(memoData: PaymentVouchers) {
    return this.http.post<PaymentVouchers>(`${this.baseUrl}/payments.json`, memoData).subscribe(() => {
      this.getPaymentVouchers();
    })
  }

  public updatedPaymentVouchers(idList: string, memoData: PaymentVouchers) {
    return this.http.put<PaymentVouchers>(`${this.baseUrl}/payments/${idList}.json`, memoData).subscribe(() => {
      this.getPaymentVouchers();
    })
  }

  public setPayrollData(data: PayrollData){
    return this.http.post<PayrollData>(`${this.baseUrl}/payroll.json`, data).subscribe(() =>{
      this.getPayrollData();
    })
  }

  public getPayrollData(){
    return this.http.get<PayrollData>(`${this.baseUrl}/payroll.json`).subscribe((data: PayrollData) =>{
      this.store.dispatch(setPayroallDashboard({data: data}));
    })
  }
}
