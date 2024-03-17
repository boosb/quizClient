import { createReducer, on } from '@ngrx/store';
import { IUser } from '../models/user';
import { confirmEmailSuccess, loginError, loginSuccess, logout, registrationSuccess, updateUserSuccess, uploadAvatarSuccess } from '../actions/auth.actions';

export interface AuthState {
  user: IUser | null;
  role: string | null;
  errorText: string | null
}

const initialAuthState: AuthState = {
    user: null,
    role: null,
    errorText: null
}

export const authReducer = createReducer(
    initialAuthState,

  on(loginSuccess, (state, { user }) => {
    return {
        ...state,
        user,
        role: user.role.name,
        errorText: null
    }
  }),
  on(loginError, (state, { errorText }) => {
    return {
        ...state,
        errorText
    }
  }),
  on(logout, (state, {}) => {
    return {
        ...state,
        user: null,
        role: null,
        errorText: null
    }
  }),
  on(registrationSuccess, (state, { user }) => {
    return {
        ...state,
        user,
        role: user.role.name,
        errorText: null
    }
  }),
  on(confirmEmailSuccess, (state, { user }) => {
    return {
        ...state,
        user,
        role: user.role.name,
        errorText: null
    }
  }),
  on(updateUserSuccess, (state, { updatedUser }) => {
    // todo Ваще тут возникла проблема. Хотел обновить объект на клиенте на основе update.changes, но не нашел как это сделать в TS
    // поэтому просто обновляю объект на сервере, а после получаю обновленного пользователя
    return {
        ...state,
        user: updatedUser,
        role: updatedUser.role.name,
        errorText: null
    }
  }),
  on(uploadAvatarSuccess, (state, { updatedUser }) => {
    // todo по сути такой же как updateUserSuccess, может можно как-то отрефакторить
    return {
        ...state,
        user: updatedUser,
        role: updatedUser.role.name,
        errorText: null
    }
  }),
);