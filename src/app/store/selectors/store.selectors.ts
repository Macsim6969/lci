import { StoreInterface } from "../model/store.model";

export const selectIsLogin = (store: {store: StoreInterface}) => store.store.isLogin;