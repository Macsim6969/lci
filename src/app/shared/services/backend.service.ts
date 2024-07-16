import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../store/model/store.model";
import { User } from '../interfaces/user.interface';
import { setStaffMiniList, setUserData, setUsers } from "../../store/actions/store.actions";
import { Observable } from "rxjs";
import { DashboardInfo, DashboardTotalInfo } from "../../modules/dashboard/@shared/interfaces/dashboard.interface";
import { setDashbordInfo } from "../../store/actions/dashboard.actions";
import { sendMemoData } from "../../store/actions/memo.actions";
import { MemoList } from "../../modules/memo/@shared/interfaces/memo.interface";

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
      const users = Object.values(userData)?.map(e => ({ name: e['profile'].name + ' ' + e['profile'].lastName, id: e['profile'].userID }));

      this.store.dispatch(setStaffMiniList({ data: users }));
      this.store.dispatch(setUsers({ data: userData }));
    });
  }

  public removeUser(userId: string) {
    return this.http.delete<User>(`${this.baseUrl}/users/${userId}.json`).subscribe();
  }

  public sendUserProfile(userData: User) {
    return this.http.put<User>(`${this.baseUrl}/users/${userData.userID}/profile.json`, userData).subscribe(() => {
      this.store.dispatch(setUserData({ data: userData }));
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

  public getMemo(userID: string) {
    return this.http.get<MemoList[]>(`${this.baseUrl}/users/${userID}/memo.json`).subscribe((data: MemoList[]) => {
      data ? this.store.dispatch(sendMemoData({ data: data })) : this.store.dispatch(sendMemoData({ data: [] }));
    })
  }

  public setMemo(userID: string, memoData: MemoList) {
    return this.http.post<MemoList>(`${this.baseUrl}/users/${userID}/memo.json`, memoData).subscribe(() => {
      this.getMemo(userID);
    })
  }

}
