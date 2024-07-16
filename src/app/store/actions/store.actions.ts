import { createAction, props } from "@ngrx/store"
import { StaffMiniList, User } from "../../shared/interfaces/user.interface";


export const SETALLUSERS = 'SETALLUSERS';
export const REGISTER = 'REGISTER';
export const USERID = 'USERID';
export const SETUSERDATA = 'SETUSERDATA';
export const STARTAFFECT = 'STARTAFFECT';
export const LOGINREGISTERDATA = 'LOGINREGISTERDATA';
export const SETUSERS = 'SETUSERS'
export const STAFFMINILIST = 'STAFFMINILIST'


export const setAllUsers = createAction(
  SETALLUSERS
);

export const newUserID = createAction(
  USERID,
  props<{ id: string }>()
);

export const setIsLoginRegisterData = createAction(
  LOGINREGISTERDATA,
  props<{ data: boolean }>()
)

export const setRegiset = createAction(
  REGISTER
);

export const setUserData = createAction(
  SETUSERDATA,
  props<{ data: User }>()
);

export const setUsers = createAction(
  SETUSERS,
  props<{ data: User[] }>()
);

export const startGetData = createAction(
  STARTAFFECT
);


export const setStaffMiniList = createAction(
  STAFFMINILIST,
  props<{data: StaffMiniList[]}>()
)
