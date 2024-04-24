import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { getRouterSelectors, RouterReducerState, routerReducer } from "@ngrx/router-store";
import * as fromQuiz from './reducers/quizzes.reducer';
import * as fromQuestion from './reducers/questions.reducer';
import * as fromAnswer from './reducers/answers.reducer';
import * as fromMenu from './reducers/menu.reducer';
import * as fromModal from './reducers/modal.reducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromGame from './reducers/quiz-game.reducer';
import * as fromUsers from './reducers/users.reducer';
import * as fromFiles from './reducers/files.reducer';
import * as fromHistoryQuizzes from './reducers/history-quizzes.reducer';

export interface AppState {
    quizzesState: fromQuiz.QuizzesState;
    questionState: fromQuestion.QuestionsState;
    answerState: fromAnswer.AnswersState;
    menuState: fromMenu.MenuState;
    modalState: fromModal.ModalState;
    authState: fromAuth.AuthState;
    gameState: fromGame.GameState;
    users: fromUsers.UsersState;
    files: fromFiles.FilesState;
    historyQuizzes: fromHistoryQuizzes.HistoryQuizzesState;
    router: RouterReducerState<any>;
}
  
export const reducers: ActionReducerMap<AppState, any> = {
    quizzesState: fromQuiz.quizzesReducer,
    questionState: fromQuestion.qustionsReducer,
    answerState: fromAnswer.answersReducer,
    menuState: fromMenu.menuReducer,
    modalState: fromModal.modalReducer,
    authState: fromAuth.authReducer,
    gameState: fromGame.gameReducer,
    users: fromUsers.usersReducer,
    files: fromFiles.filesReducer,
    historyQuizzes: fromHistoryQuizzes.historyQuizzesReducer,
    router: routerReducer
}

export const selectQuizzesState = (state: AppState) => state.quizzesState;

export const selectQuizState = createFeatureSelector<fromQuiz.QuizzesState>('quizzes');
export const selectQuestionState = createFeatureSelector<fromQuestion.QuestionsState>('questions');
export const selectAnswerState = createFeatureSelector<fromAnswer.AnswersState>('answers');
export const selectMenuState = createFeatureSelector<fromMenu.MenuState>('menu');
export const selectModalState = createFeatureSelector<fromModal.ModalState>('modal');
export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const selectGameState = createFeatureSelector<fromGame.GameState>('game');
export const selectUsersState = createFeatureSelector<fromUsers.UsersState>('users');
export const selectFilesState = createFeatureSelector<fromFiles.FilesState>('files');
export const selectHistoryQuizzesState = createFeatureSelector<fromHistoryQuizzes.HistoryQuizzesState>('historyQuizzes');

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

// USERS
export const selectUsers = createSelector(
  selectUsersState,
  (state: fromUsers.UsersState) => state.users
);