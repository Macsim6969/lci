import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";


export const store: StoreInterface = {
  isLogin: false
}

export const storeReducers = createReducer(store,
  // on(allUsers, (state, action) => {
  //   return { ...state, allUsers: action.data }
  // })
)

