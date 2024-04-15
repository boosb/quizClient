import { createReducer, on } from "@ngrx/store";
import { cleanLastImgPath, uploadImgQuestionSuccess } from "../actions/files.actions";

export interface FilesState {
    lastImgPath: string | undefined
}

const initialFilesState: FilesState = {
    lastImgPath: undefined
}
  
export const filesReducer = createReducer(
    initialFilesState,

    on(uploadImgQuestionSuccess, (state, { imgPath }) => {
        return {
            ...state,
            lastImgPath: imgPath
        }
    }),
    on(cleanLastImgPath, (state, {}) => {
        return {
            ...state,
            lastImgPath: undefined
        }
    })
)