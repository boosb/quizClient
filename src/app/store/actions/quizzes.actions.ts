import { createAction, props } from '@ngrx/store';
import { IQuiz } from '../models/quiz';
import { Update } from '@ngrx/entity';

export const selectQuiz = createAction('[Quizzes API] Quiz Select', props<{ quizId: number }>());

export const loadQuizzes = createAction('[Quizzes API] Quizzes Loaded');
export const loadQuizzesSuccess = createAction('[Quizzes API] Quizzes Loaded Success', props<{ quizzes: IQuiz[] }>());

export const addRequiest = createAction('[Quizzes API] Quizzes Add', props<{ quiz: IQuiz }>());
export const addedSuccess = createAction('[Quizzes API] Quizzes Added Success', props<{ quiz: IQuiz }>());

export const deleteRequiest = createAction('[Quizzes API] Quizzes Delete', props<{ quizId: string }>()); // todo попробовать привести все к числу, по-моему нет большого смысла в преобразовании типов
export const deletedSuccess = createAction('[Quizzes API] Quizzes Deleted Success', props<{ quizId: string }>());

export const updateRequiest = createAction('[Quizzes API] Quizzes Update', props<{ update: Update<IQuiz> }>());
export const updatedSuccess = createAction('[Quizzes API] Quizzes Updated Success', props<{ update: Update<IQuiz> }>());

