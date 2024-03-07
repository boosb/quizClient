import { createSelector } from "@ngrx/store";
import { selectQuestionState } from "..";
import * as fromQuestion from './../reducers/questions.reducer';

export const selectAllQuestions = createSelector(
    selectQuestionState,
    fromQuestion.selectAllQuestions
);

export const selectCurrentQuestionId = createSelector(
    selectQuestionState,
    fromQuestion.getSelectedQuestionId
);

export const selectCurrentQuestion = createSelector(
    selectQuestionState,
    selectCurrentQuestionId,
    (state: fromQuestion.QuestionsState, id) => id ? state.entities[id] : null
);