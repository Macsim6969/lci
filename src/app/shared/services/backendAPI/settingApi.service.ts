import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../../store/model/store.model";
import { SalaryDefinition } from "../../../modules/payroll/@shared/interfaces/salary.interface";
import { setPayroallSalary } from "../../../store/actions/payroll.actions";
import { Settings } from "../../../modules/settings/@shared/interfaces/settings.interface";
import { setSettings } from "../../../store/actions/settings.actions";


@Injectable()

export class  SettingsApiService {
  private baseUrl = 'https://lcii-cd674-default-rtdb.firebaseio.com';
  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,) {
  }

  public updateSettingData(userId: string, data: Settings) {
    return this.http.put<Settings>(`${this.baseUrl}/users/${userId}/settings.json`, data).subscribe(() => {
      this.getSettingData(userId);
    })
  }

  public getSettingData(userId: string) {
    return this.http.get<Settings>(`${this.baseUrl}/users/${userId}/settings.json`).subscribe((data) => {
      this.store.dispatch(setSettings({ data: data }));
      document.documentElement.style.fontSize = `${data.size}px`;
    })
  }
}