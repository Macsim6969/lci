import { createAction, props } from "@ngrx/store"
import { User } from "../../shared/interfaces/user.interface";


export const SETALLUSERS = 'SETALLUSERS';
export const REGISTER = 'REGISTER';
export const USERID = 'USERID';
export const SETUSERDATA = 'SETUSERDATA';
export const STARTAFFECT = 'STARTAFFECT';
export const LOGINREGISTERDATA = 'LOGINREGISTERDATA';

export const setAllUsers = createAction(
  SETALLUSERS
);

export const newUserID = createAction(
  USERID,
  props<{ id: string }>()
);

export const setIsLoginRegisterData = createAction(
  LOGINREGISTERDATA,
  props<{data: boolean}>()
)

export const setRegiset = createAction(
  REGISTER
);

export const setUserData = createAction(
  SETUSERDATA,
  props<{ data: User }>()
);

export const startGetData = createAction(
  STARTAFFECT
);