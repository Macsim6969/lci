import { createAction, props } from "@ngrx/store";
import {  DashboardTotalInfo } from "../../modules/dashboard/@shared/interfaces/dashboard.interface";

export const DASHBOARDINFO = 'DASHBOARDINFO'

export const setDashbordInfo = createAction(
  DASHBOARDINFO,
  props<{ data: DashboardTotalInfo }>()
);