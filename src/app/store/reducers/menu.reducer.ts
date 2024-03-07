import { createReducer, on } from "@ngrx/store";
import { closeMenu, toggleMenu } from "../actions/menu.action";

export interface MenuState {
    isShow: boolean
}

const initialMenuState: MenuState = {
    isShow: false
}
  
export const menuReducer = createReducer(
    initialMenuState,

    on(toggleMenu, (state, {}) => {
        return {
            ...state,
            isShow: !state.isShow
        }
    }),
    on(closeMenu, (state, {}) => {
        return {
            ...state,
            isShow: false
        }
    })
)