import { StoreInterface } from "../model/store.model";

export const selectIsLogin = (store: {store: StoreInterface}) => store.store.isLogin;
export const selectUserId = (store : {store: StoreInterface}) => store.store.idUser;
export const selectUserInfo = (store: {store: StoreInterface}) => store.store.userInfo;
export const selectUsers = (store: {store: StoreInterface}) => store.store.allUsers;

export const selectMemoList = (store: {store: StoreInterface}) => store.store.memoList;

export const selectStaffMiniList = (store: {store: StoreInterface}) => store.store.staffMiniList;
export const selectUsersProfile = (store: {store: StoreInterface}) => store.store.allUsersProfile;
export const selectPaymentsVouchers = (store: {store: StoreInterface}) => store.store.paymentsVouchers;

export const selectNotifications = (store: {store: StoreInterface}) => store.store.notificationsList;