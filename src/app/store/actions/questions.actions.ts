import { createAction, props } from "@ngrx/store";
import { IQuestion } from "../models/question";
import { Update } from "@ngrx/entity";

export const selectQuestion = createAction('[Questions API] Question Select', props<{ questionId: number | null | undefined }>());

export const loadQuestions = createAction('[Questions API] Questions Loaded', props<{ quizId: number | undefined }>());
export const loadQuestionsSuccess = createAction('[Questions API] Questions Loaded Success', props<{ questions: IQuestion[] }>());

export const addQuestionRequest = createAction('[Questions API] Questions Add', props<{ question: IQuestion }>());
export const addedQuestionSuccess = createAction('[Questions API] Questions Added Success', props<{ question: IQuestion }>());

export const deleteQuestionRequest = createAction('[Questions API] Questions Delete', props<{ questionId: number }>());
export const deletedQuestionSuccess = createAction('[Questions API] Questions Deleted Success', props<{ questionId: number }>());

export const updateQuestionRequest = createAction('[Questions API] Questions Update', props<{ update: Update<IQuestion> }>());
export const updatedQuestionSuccess = createAction('[Questions API] Questions Updated Success', props<{ update: Update<IQuestion> }>());