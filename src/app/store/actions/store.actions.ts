import { createAction, props } from "@ngrx/store"
import { StaffMiniList, User } from "../../shared/interfaces/user.interface";


const SETALLUSERS = 'SETALLUSERS';
const REGISTER = 'REGISTER';
const USERID = 'USERID';
const SETUSERDATA = 'SETUSERDATA';
const STARTAFFECT = 'STARTAFFECT';
const LOGINREGISTERDATA = 'LOGINREGISTERDATA';
const SETUSERS = 'SETUSERS';


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


