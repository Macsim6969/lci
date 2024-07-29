import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../../store/model/store.model";
import { SalaryDefinition } from "../../../modules/payroll/@shared/interfaces/salary.interface";
import { setPayroallSalary } from "../../../store/actions/payroll.actions";


@Injectable({
  providedIn: 'root'
})

export class PayrollApiService {
  private baseUrl = 'https://lcii-cd674-default-rtdb.firebaseio.com';
  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,) {
  }

  public updatePayrollSalary(data: SalaryDefinition) {
    return this.http.post<SalaryDefinition>(`${this.baseUrl}/payrollSalary.json`, data).subscribe(() => {
      this.getPayrollSalary();
    })
  }

public getPayrollSalary() {
   return this.http.get<SalaryDefinition[]>(`${this.baseUrl}/payrollSalary.json`).subscribe((data) =>{
      this.store.dispatch(setPayroallSalary({data: data}))
    })
  }
}