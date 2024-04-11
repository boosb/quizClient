import { createReducer, on } from "@ngrx/store";
import { uploadImgQuestionSuccess } from "../actions/files.actions";

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
    })
)