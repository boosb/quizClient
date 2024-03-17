import { createAction, props } from "@ngrx/store";
import { IUser } from "../models/user";
import { Update } from "@ngrx/entity";

export const login = createAction('[Auth API] Login', props<{ user: IUser }>());
export const loginSuccess = createAction('[Auth API] Login Success', props<{ user: IUser }>());
export const loginError = createAction('[Auth API] Login Error', props<{ errorText: string }>());

export const confirmEmail = createAction('[Auth API] Confirm Email', props<{ urlParams: any }>());
export const confirmEmailSuccess = createAction('[Auth API] Confirm Email Success', props<{ user: IUser }>());

export const logout = createAction('[Auth API] Logout');
export const logoutSuccess = createAction('[Auth API] Logout Success');

export const registration = createAction('[Auth API] Registration', props<{ user: IUser }>());
export const registrationSuccess = createAction('[Auth API] Registration Success', props<{ user: IUser }>());

export const updateUser = createAction('[Auth API] Update User', props<{ update: Update<IUser> }>());
export const updateUserSuccess = createAction('[Auth API] Update User Success', props<{ updatedUser: IUser }>());

export const uploadAvatar = createAction('[Auth API] Upload Avatar', props<{ userId: number | undefined, formData: FormData }>());
export const uploadAvatarSuccess = createAction('[Auth API] Upload Avatar Success', props<{ updatedUser: IUser }>());