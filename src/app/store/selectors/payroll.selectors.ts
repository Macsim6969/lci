import { StoreInterface } from "../model/store.model";

export const selectPayroll = (store: {store: StoreInterface}) => store.store.payrollDashboard;
export const selectPayrollSalary = (store: {store: StoreInterface}) => store.store.payrollSalary;