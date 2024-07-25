import { setMaintenanceList } from './../../../store/actions/maintenance.actions';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../../store/model/store.model";
import { SalaryDefinition } from "../../../modules/payroll/@shared/interfaces/salary.interface";
import { MaintanceList } from '../../../modules/maintenance/@shared/interfaces/maintenance.interface';


@Injectable()

export class MaintenanceApiService {
  private baseUrl = 'https://lcii-cd674-default-rtdb.firebaseio.com';
  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,) {
  }

  public updateMaintenanceDashboard(data: SalaryDefinition) {
    return this.http.post<MaintanceList[]>(`${this.baseUrl}/maintenance.json`, data).subscribe(() => {
      this.getMaintenanceDashboard();
    })
  }

public getMaintenanceDashboard() {
   return this.http.get<MaintanceList[]>(`${this.baseUrl}/maintenance.json`).subscribe((data) =>{
      this.store.dispatch(setMaintenanceList({data: data}))
      
    })
  }
}