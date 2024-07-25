import { StoreInterface } from "../model/store.model";

export const selectMaintenanceList = (store: {store: StoreInterface}) => store.store.maintenanceList;
export const selectMaintenanceDashboard = (store: {store: StoreInterface}) => store.store.maintenanceDashboard;