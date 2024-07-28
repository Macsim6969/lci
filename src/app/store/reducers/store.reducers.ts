import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { newUserID, setIsLoginRegisterData, setUserData, setUsers } from "../actions/store.actions";
import { setDashbordInfo } from "../actions/dashboard.actions";
import { sendMemoData } from "../actions/memo.actions";
import { setStaffMiniList, setStaffUserProfile } from "../actions/staff.actions";
import { setPaymentsVouchers } from "../actions/paymentVouchers.actions";
import { setPayroallDashboard, setPayroallSalary } from "../actions/payroll.actions";
import { setMaintenanceDashboardData, setMaintenanceList } from "../actions/maintenance.actions";
import { sendNotificationData } from "../actions/notification.actions";
import { setSettings } from "../actions/settings.actions";


export const store: StoreInterface = {
  isLogin: false,
  idUser: '',
  userInfo: null,
  allUsersProfile: [],
  allUsers: null,
  dashboardInfo: null,
  memoList: [],
  staffMiniList: [],
  paymentsVouchers: [],
  payrollDashboard: null,
  payrollSalary: [],
  maintenanceDashboard: null,
  maintenanceList: [],
  notificationsList: [],
  settingsData: null
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
  on(setPaymentsVouchers, (state, action) => {
    return { ...state, paymentsVouchers: action.data }
  }),
  on(setPayroallDashboard, (state, action) => {
    return { ...state, payrollDashboard: action.data }
  }),
  on(setPayroallSalary, (state, action) => {
    return { ...state, payrollSalary: action.data }
  }),
  on(setMaintenanceDashboardData, (state, action) => {
    return { ...state, maintenanceDashboard: action.data }
  }),
  on(setMaintenanceList, (state, action) => {
    return { ...state, maintenanceList: action.data }
  }),
  on(sendNotificationData, (state, action) => {
    return { ...state, notificationsList: action.data }
  }),
  on(setSettings, (state, action) => {
    return { ...state, settingsData: action.data }
  })
)
