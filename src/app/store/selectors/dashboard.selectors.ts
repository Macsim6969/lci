import { StoreInterface } from "../model/store.model";

export const selectDashboardData = (store: {store: StoreInterface}) => store.store.dashboardInfo;
