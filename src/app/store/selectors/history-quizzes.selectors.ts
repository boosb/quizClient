import { createSelector } from "@ngrx/store";
import { selectHistoryQuizzesState, selectQuizState } from "..";
import * as fromHistoryQuizzes from './../reducers/history-quizzes.reducer';

export const selectHistoryQuizzes = createSelector(
    selectHistoryQuizzesState,
    fromHistoryQuizzes.selectAllHistoryQuizzes
);