import { ActionReducerMap, createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { QuizzesState, quizzesReducer } from "./reducers/quizzes.reducer";
import { getRouterSelectors, RouterReducerState, routerReducer } from "@ngrx/router-store";
import * as fromQuiz from './reducers/quizzes.reducer';

export interface AppState {
    quizzesState: fromQuiz.QuizzesState;
    router: RouterReducerState<any>;
}
  
export const reducers: ActionReducerMap<AppState, any> = {
    quizzesState: fromQuiz.quizzesReducer,
    router: routerReducer
}

export const selectQuizzesState = (state: AppState) => state.quizzesState;

export const selectQuizState = createFeatureSelector<fromQuiz.QuizzesState>('quiz');

export const {
  selectCurrentRoute,
  selectRouteParams
} = getRouterSelectors();

export const selectQuizzes = createSelector(
  selectQuizState,
  ( { entities } ) => Object.values(entities)
);

export const selectCurrentQuiz = createSelector(
  selectQuizState,
  selectRouteParams,
  (state: QuizzesState, { id }) => state.entities[id]
);
/*
export const selectCurrentQuizQuestions = createSelector(
  selectQuizzesState,
  selectRouteParams,
  (state: QuizzesState, { id }) => {
    const quiz = state.quizzes.find(quiz => quiz.id === Number(id))
    return quiz?.questions
  }
);*/

export const selectCurrentQuizQuestions = createSelector(
  selectQuizState,
  selectRouteParams,
  (state: QuizzesState, { id }) => state.entities[id]?.questions
);