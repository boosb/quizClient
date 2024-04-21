import { createAction, props } from "@ngrx/store";
import { IQuiz } from "../models/quiz";
import { IAnswer } from "../models/answer";
import { IQuestion } from "../models/question";

export const startGame = createAction('[Game API] Quiz Game Start', props<{ quiz: IQuiz }>());
export const startGameSuccess = createAction('[Game API] Quiz Game Start Success', props<{ quiz: IQuiz, questions: IQuestion[] | undefined }>());

export const nextQuestion = createAction('[Game API] Quiz Game Next Question', props<{ questionNumber: number }>());
export const previousQuestion = createAction('[Game API] Quiz Game Previous Question', props<{ questionNumber: number }>());

export const answerSelect = createAction('[Game API] Quiz Game Answer Select', props<{ selectedAnswer: IAnswer }>());
export const answer = createAction('[Game API] Quiz Game Answer');
export const answerRight = createAction('[Game API] Quiz Game Answer Right');
export const answerWrong = createAction('[Game API] Quiz Game Answer Wrong');

export const timeOver = createAction('[Game API] Quiz Game Time Over'); // todo а может и не понадобится этот экшен

export const completeGame = createAction('[Game API] Quiz Game Complete', props<{ quizId: number | undefined }>());

export const closeGame = createAction('[Game API] Quiz Game Close');