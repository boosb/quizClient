import { createReducer, on } from '@ngrx/store';
import { IUser } from '../models/user';
import { login, loginSuccess, logout, registrationSuccess } from '../actions/auth.actions';

export interface AuthState {
  user: IUser | null;
  role: string | null;
}

const initialAuthState: AuthState = {
    user: null,
    role: null
}

export const authReducer = createReducer(
    initialAuthState,

  on(loginSuccess, (state, { user }) => {
    return {
        ...state,
        user,
        role: user.role.name
    }
  }),
  on(logout, (state, {}) => {
    return {
        ...state,
        user: null,
        role: null
    }
  }),
  on(registrationSuccess, (state, { user }) => {
    return {
        ...state,
        user,
        role: user.role.name
    }
  }),
);