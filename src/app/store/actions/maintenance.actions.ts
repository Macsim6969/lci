import { createAction, props } from "@ngrx/store"
import { MaintanceList, MaintenanceDashboard } from "../../modules/maintenance/@shared/interfaces/maintenance.interface"

const SETMAINTENANCEDASHBOARD = 'SETMAINTENANCEDASHBOARD';
const SETMAINTENANCELIST = 'SETMAINTENANCELIST';

export const setMaintenanceDashboardData = createAction(
  SETMAINTENANCEDASHBOARD,
  props<{ data: MaintenanceDashboard }>()
)

export const setMaintenanceList = createAction(
  SETMAINTENANCELIST,
  props<{ data: MaintanceList[] }>()
)