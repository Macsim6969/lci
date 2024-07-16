import { StoreInterface } from "../model/store.model";

export const selectIsLogin = (store: {store: StoreInterface}) => store.store.isLogin;
export const selectUserId = (store : {store: StoreInterface}) => store.store.idUser;
export const selectUserInfo = (store: {store: StoreInterface}) => store.store.userInfo;
export const selectUsers = (store: {store: StoreInterface}) => store.store.allUsers;

export const selectMemoList = (store: {store: StoreInterface}) => store.store.memoList;

export const selectStaffMiniList = (store: {store: StoreInterface}) => store.store.staffMiniList;