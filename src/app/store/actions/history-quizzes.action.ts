import { createAction, props } from "@ngrx/store";
import { IHistoryQuizzes } from "../models/history-quizzes";
import { IHistory } from "../reducers/quiz-game.reducer";

// todo тут нужно взять userId, но мне нет большого смысла передавать его из компонента. Лучше взять внутри редьюсера из общего стора
export const loadHistoryQuizzesRequiest = createAction('[History Quizzes API] History Quizzes Load');
// todo как буд-то эти загрузчики ваще не оч нужны. Просто берем пользака при авторизации и из него берем всю ИСТОРИЮ
export const loadHistoryQuizzesSuccess = createAction('[History Quizzes API] History Quizzes Load Success', props<{ historyQuizzesAll: IHistoryQuizzes[] }>());

export const addHistoryQuizzesRequiest = createAction('[History Quizzes API] History Quizzes Add', props<{ historyData: IHistory, quizId: number }>());
export const addedHistoryQuizzesSuccess = createAction('[History Quizzes API] History Quizzes Added Success', props<{ historyQuizzes: IHistoryQuizzes }>());