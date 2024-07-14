import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { newUserID, setIsLoginRegisterData } from "../actions/store.actions";


export const store: StoreInterface = {
  isLogin: false,
  idUser: ''
}

export const storeReducers = createReducer(store,
  on(newUserID, (state, action) => {
    return { ...state, idUser: action.id }
  }),
  on(setIsLoginRegisterData, (state, action) =>{
    return {...state, isLogin: action.data}
  })
)
