import { createSelector } from "@ngrx/store";
import { selectQuizState, selectRouteParams } from "..";
import * as fromQuiz from './../reducers/quizzes.reducer';

export const selectCurrentQuizId = createSelector(
    selectQuizState,
    fromQuiz.getSelectedQuizId
);

export const selectQuizIds = createSelector(
    selectQuizState,
    fromQuiz.selectQuizIds
);

export const selectQuizzes = createSelector( // todo хех, а этот селектор, похоже, уже есть в редьюсере
    selectQuizState,
    //( { entities } ) => Object.values(entities)
    fromQuiz.selectAllQuizzes
);

export const selectCurrentQuiz = createSelector(
    selectQuizState,
    selectRouteParams,
    (state: fromQuiz.QuizzesState, { id }) => state.entities[id]
);

export const selectCurrentQuizQuestions = createSelector(
    selectQuizState,
    selectRouteParams,
    (state: fromQuiz.QuizzesState, { id }) => state.entities[id]?.questions
);

export const selectAnswers = createSelector(
    selectQuizState,
    selectRouteParams,
    (state: fromQuiz.QuizzesState, { id }) => state.entities[id]?.questions
);