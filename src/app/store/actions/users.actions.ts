import { createAction, props } from "@ngrx/store";
import { IUser } from "../models/user";

export const loadUsers = createAction('[Users API] Users Loaded');
export const loadUsersSuccess = createAction('[Users API] Users Loaded Success', props<{ users: IUser[] }>());