import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {


  // startAuth = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(startGetData),
  //     withLatestFrom(this.store.pipe(select(selectUserId))),
  //     tap(([action, id]) => {
  //       const rules = JSON.parse(localStorage.getItem('rules'))
  //       this.backendService.getUserProfile(id);
  //       this.backendService.getMonitoringData(id);
  //       this.backendService.getAlluser();
  //       this.backendService.getCardsPayment(id);
  //       this.backendService.getCardsTransactions(id);
  //       this.backendService.getMediaChannels();
  //       this.backendService.getOffers();
  //       if(rules === 'brand'){
  //         this.backendService.getFromActiveOffer();
  //       }
  //     })
  //   )
  //   ,
  //   { dispatch: false }
  // );





  constructor(private actions$: Actions,
    private store: Store<{ store: StoreInterface }>
  ) { }

}