import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { newUserID, setIsLoginRegisterData, setUserData, setUsers } from "../actions/store.actions";
import { setDashbordInfo } from "../actions/dashboard.actions";
import { sendMemoData } from "../actions/memo.actions";
import { setStaffMiniList, setStaffUserProfile } from "../actions/staff.action";
import { setPaymentsVouchers } from "../actions/paymentVouchers.action";


export const store: StoreInterface = {
  isLogin: false,
  idUser: '',
  userInfo: null,
  allUsersProfile: [],
  allUsers: null,
  dashboardInfo: null,
  memoList: [],
  staffMiniList: [],
  paymentsVouchers: []
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
  on(setUsers, (state, action) => {
    return { ...state, allUsers: action.data }
  }),
  on(setDashbordInfo, (state, action) => {
    return { ...state, dashboardInfo: action.data }
  }),
  on(sendMemoData, (state, action) => {
    return { ...state, memoList: action.data }
  }),
  on(setStaffMiniList, (state, action) => {
    return { ...state, staffMiniList: action.data }
  }),
  on(setStaffUserProfile, (state, action) => {
    return { ...state, allUsersProfile: action.data }
  }),
  on(setPaymentsVouchers, (state, action) =>{
    return {...state, paymentsVouchers: action.data}
  })
)
