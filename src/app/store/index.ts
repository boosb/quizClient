import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { getRouterSelectors, RouterReducerState, routerReducer } from "@ngrx/router-store";
import * as fromQuiz from './reducers/quizzes.reducer';
import * as fromQuestion from './reducers/questions.reducer';
import * as fromAnswer from './reducers/answers.reducer';
import * as fromMenu from './reducers/menu.reducer';
import * as fromModal from './reducers/modal.reducer';
import * as fromAuth from './reducers/auth.reducer';

export interface AppState {
    quizzesState: fromQuiz.QuizzesState;
    questionState: fromQuestion.QuestionsState;
    answerState: fromAnswer.AnswersState;
    menuState: fromMenu.MenuState;
    modalState: fromModal.ModalState;
    authState: fromAuth.AuthState;
    router: RouterReducerState<any>;
}
  
export const reducers: ActionReducerMap<AppState, any> = {
    quizzesState: fromQuiz.quizzesReducer,
    questionState: fromQuestion.qustionsReducer,
    answerState: fromAnswer.answersReducer,
    menuState: fromMenu.menuReducer,
    modalState: fromModal.modalReducer,
    authState: fromAuth.authReducer,
    router: routerReducer
}

export const selectQuizzesState = (state: AppState) => state.quizzesState;

export const selectQuizState = createFeatureSelector<fromQuiz.QuizzesState>('quizzes');
export const selectQuestionState = createFeatureSelector<fromQuestion.QuestionsState>('questions');
export const selectAnswerState = createFeatureSelector<fromAnswer.AnswersState>('answers');
export const selectMenuState = createFeatureSelector<fromMenu.MenuState>('menu');
export const selectModalState = createFeatureSelector<fromModal.ModalState>('modal');
export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const {
  selectCurrentRoute,
  selectRouteParams,
  selectQueryParams
} = getRouterSelectors();

// MENU selectors
export const selectMenuIsShow = createSelector(
  selectMenuState,
  (state: fromMenu.MenuState) => state.isShow
);

// MODAL selectors
export const selectModalDialog = createSelector(
  selectModalState,
  (state: fromModal.ModalState) => state.dialog
);

export const selectModalData = createSelector(
  selectModalState,
  (state: fromModal.ModalState) => state.data
);

export const selectModalShow = createSelector(
  selectModalState,
  (state: fromModal.ModalState) => state.isShow
);