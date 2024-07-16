import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { Injectable } from "@angular/core";
import { tap, withLatestFrom } from "rxjs";
import { BackendService } from "../../shared/services/backend.service";
import { startGetData } from "../actions/store.actions";
import { selectUserId } from "../selectors/store.selectors";
import { setStartDashboarfInfo } from "../../shared/base/startData";

@Injectable()
export class AuthEffects {


  startAuth = createEffect(
    () => this.actions$.pipe(
      ofType(startGetData),
      withLatestFrom(this.store.pipe(select(selectUserId))),
      tap(([action, id]) => {
        this.backendService.getUserInfo(id);
        this.backendService.getDashboardInfo(id);
        // this.backendService.getMemo(id);
      })
    )
    ,
    { dispatch: false }
  );

  constructor(private actions$: Actions,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService
  ) { }

}