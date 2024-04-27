import { createSelector } from "@ngrx/store";
import { selectGameState } from "..";
import * as fromGame from '../reducers/quiz-game.reducer';

export const selectQuizGame = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.quiz
);

export const selectCurrentQuestion = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.currentQuestion
);
  
export const selectCounter = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.counter
);
  
export const selectCountQuestions = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.countQuestions
);
  
export const selectBtnState = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.btnState
);

export const selectSelectedAnswer = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.selectedAnswer
);

export const selectCompleteGame = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.isComplete
);

export const selectGameIsOn = createSelector(
    selectGameState,
    (state: fromGame.GameState) => !state.isComplete
);

export const selectHistoryGame = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.history
);

export const selectCurrentHistoryGame = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.history.currentHistory
);

export const selectIsLastAnswer = createSelector(
    selectGameState,
    (state: fromGame.GameState) => state.isLastAnswer
);