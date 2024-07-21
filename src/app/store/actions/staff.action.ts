import { createAction, props } from "@ngrx/store";
import { StaffMiniList, User } from "../../shared/interfaces/user.interface";

const STAFFMINILIST = 'STAFFMINILIST';
const USERSPROFILE = 'USERSPROFILE';

export const setStaffMiniList = createAction(
  STAFFMINILIST,
  props<{ data: StaffMiniList[] }>()
)


export const setStaffUserProfile = createAction(
  USERSPROFILE,
  props<{ data: User[] }>()
)