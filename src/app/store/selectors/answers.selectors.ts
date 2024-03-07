import { createSelector } from "@ngrx/store";
import * as fromAnswer from './../reducers/answers.reducer';
import { selectAnswerState } from "..";
import { IAnswer } from "../models/answer";

export const selectAnswers = createSelector(
    selectAnswerState,
    fromAnswer.selectAllAnswers
);

export const selectQustionAnswers = createSelector(
    selectAnswers,
    (answers: IAnswer[], props: any) => answers.filter(answer => answer.questionId === props.questionId)
);

export const selectCurrentAnswerId = createSelector(
    selectAnswerState,
    fromAnswer.getSelectedAnswerId
);

export const selectCurrentAnswer = createSelector(
    selectAnswerState,
    selectCurrentAnswerId,
    (state: fromAnswer.AnswersState, id) => id ? state.entities[id] : null
);