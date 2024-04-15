import { createSelector } from "@ngrx/store";
import { selectFilesState } from "..";
import * as fromFiles from '../reducers/files.reducer';
import { selectCurrentQuestion } from "./questions.selectors";

export const selectQuestionImgPath = createSelector(
    selectFilesState,
    selectCurrentQuestion,
    (state: fromFiles.FilesState, question) => state.lastImgPath ? state.lastImgPath : question?.img
);