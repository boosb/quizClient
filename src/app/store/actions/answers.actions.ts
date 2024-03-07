import { createAction, props } from "@ngrx/store";
import { IAnswer } from "../models/answer";
import { Update } from "@ngrx/entity";

export const selectAnswer = createAction('[Answers API] Answer Select', props<{ answerId: number | null | undefined }>());

export const loadAnswers = createAction('[Answers API] Answers Loaded', props<{ quizId: number | undefined }>());
export const loadAnswersSuccess = createAction('[Answers API] Answers Loaded Success', props<{ answers: IAnswer[] }>());

export const addAnswerRequest = createAction('[Answers API] Answer Add', props<{ answer: IAnswer }>());
export const addedAnswerSuccess = createAction('[Answers API] Answer Added Success', props<{ answer: IAnswer }>());

export const deleteAnswerRequest = createAction('[Answers API] Answer Delete', props<{ answerId: number }>());
export const deletedAnswerSuccess = createAction('[Answers API] Answer Deleted Success', props<{ answerId: number }>());

export const updateAnswerRequest = createAction('[Answers API] Answer Update', props<{ update: Update<IAnswer> }>());
export const updatedAnswerSuccess = createAction('[Answers API] Answer Updated Success', props<{ update: Update<IAnswer> }>());