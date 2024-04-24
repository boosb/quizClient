import { createSelector } from "@ngrx/store";
import { selectAuthState } from "..";
import * as fromAuth from '../reducers/auth.reducer';

export const selectUser = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.user
);

export const selectUserHistoryQuizzes = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.user?.historyQuizzes
);
  
export const selectUserRole = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.role
);

export const selectIsEmailConfirmed = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.user?.isEmailConfirmed
);

export const selectError = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.errorText
);