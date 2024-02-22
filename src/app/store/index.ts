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
    //quizzesState: fromQuiz.reducer,
    router: routerReducer
}

export const selectQuizzesState = (state: AppState) => state.quizzesState;

export const selectQuizState = createFeatureSelector<fromQuiz.QuizzesState>('quiz');
/*
export const selectQuizState = createFeature({
  name: "quiz",
  reducer: quizzesReducer
});*/

export const {
  selectCurrentRoute,
  selectRouteParams
} = getRouterSelectors();

export const testSelector = createSelector(
  selectQuizState,
  ( { entities } ) => Object.values(entities)
);

export const selectQuizzes = createSelector(
  selectQuizzesState,
  (state: QuizzesState) => {
    console.log(state, ' >>> STATE')
    return state.quizzes
  }
);

export const selectCurrentQuiz = createSelector(
  selectQuizzesState,
  selectRouteParams,
  (state: QuizzesState, { id }) => {
    console.log(state.quizzes, ' >>> state.quizzes---tt')
    return state.quizzes.find(quiz => quiz.id === Number(id))
  }
);

export const selectCurrentQuizQuestions = createSelector(
  selectQuizzesState,
  selectRouteParams,
  (state: QuizzesState, { id }) => {
    const quiz = state.quizzes.find(quiz => quiz.id === Number(id))
    return quiz?.questions
  }
);
/*
export const selectQuizEntities = createSelector(
  selectQuizState,
  fromQuiz.selectUserEntities
);

export const selectAllQuizzes = createSelector(
  selectQuizState,
  fromQuiz.selectAllUsers
);*/