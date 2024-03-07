import { createAction, props } from "@ngrx/store";
import { IUser } from "../models/user";

export const login = createAction('[Auth API] Login', props<{ user: IUser }>());
export const loginSuccess = createAction('[Auth API] Login Success', props<{ user: IUser }>());

export const logout = createAction('[Auth API] Logout');
export const logoutSuccess = createAction('[Auth API] Logout Success');

export const registration = createAction('[Auth API] Registration', props<{ user: IUser }>());
export const registrationSuccess = createAction('[Auth API] Registration Success', props<{ user: IUser }>());