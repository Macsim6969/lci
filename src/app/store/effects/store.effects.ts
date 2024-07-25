import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { Injectable } from "@angular/core";
import { tap, withLatestFrom } from "rxjs";
import { startGetData } from "../actions/store.actions";
import { selectUserId } from "../selectors/store.selectors";
import { BackendService } from "../../shared/services/backendAPI/backend.service";
import { PayrollApiService } from "../../shared/services/backendAPI/payrollApi.service";
import { MaintenanceApiService } from "../../shared/services/backendAPI/maintenanceApi.service";

@Injectable()
export class AuthEffects {


  startAuth = createEffect(
    () => this.actions$.pipe(
      ofType(startGetData),
      withLatestFrom(this.store.pipe(select(selectUserId))),
      tap(([action, id]) => {
        this.backendService.getUserInfo(id);
        this.backendService.getDashboardInfo(id);
        this.backendService.getMemo();
        this.backendService.getUsers();
        this.backendService.getPaymentVouchers();
        this.backendService.getPayrollData();
        this.payrollApi.getPayrollSalary();
        this.maintenanceApi.getMaintenanceDashboard();
        
      })
    )
    ,
    { dispatch: false }
  );

  constructor(private actions$: Actions,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService,
    private payrollApi: PayrollApiService,
    private maintenanceApi: MaintenanceApiService
  ) { }

}