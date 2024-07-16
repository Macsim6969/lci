import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { newUserID, setIsLoginRegisterData, setUserData, setUsers } from "../actions/store.actions";
import { setDashbordInfo } from "../actions/dashboard.actions";
import { sendMemoData } from "../actions/memo.actions";


export const store: StoreInterface = {
  isLogin: false,
  idUser: '',
  userInfo: null,
  allUsers: null,
  dashboardInfo: null,
  memoList: []
}

export const storeReducers = createReducer(store,
  on(newUserID, (state, action) => {
    return { ...state, idUser: action.id }
  }),
  on(setIsLoginRegisterData, (state, action) => {
    return { ...state, isLogin: action.data }
  }),
  on(setUserData, (state, action) => {
    return { ...state, userInfo: action.data }
  }),
  on(setUsers, (state, action) =>{
    return {...state, allUsers: action.data}
  }),
  on(setDashbordInfo, (state, action) =>{
    return {...state, dashboardInfo: action.data}
  }),
  on(sendMemoData, (state, action) =>{
    return {...state, memoList: action.data}
  })
)
