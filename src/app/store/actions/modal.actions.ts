import { createAction, props } from "@ngrx/store";

export const showModalQuestions = createAction('[Modal API] Show Questions', props<{ data: { [key:string]: any } }>());
export const showModalAnswers = createAction('[Modal API] Show Answers', props<{ data: { [key:string]: any } }>());
export const showConfirm = createAction('[Modal API] Show Confirm', props<{ data: { [key:string]: any } }>());

export const closeModal = createAction('[Modal API] Close');