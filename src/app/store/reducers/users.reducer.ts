import { createReducer, on } from "@ngrx/store"
import { IUser } from "../models/user"
import { loadUsersSuccess } from "../actions/users.actions"

export interface UsersState {
    users: IUser[]
}

const initialUsersState: UsersState = {
    users: []
}
  
export const usersReducer = createReducer(
    initialUsersState,

    on(loadUsersSuccess, (state, {users}) => {
        return {
            ...state,
            users
        }
    }),
)