import { Action, createAction, props } from '@ngrx/store';
import { IQuiz } from '../models/quiz';
import { IQuestion } from '../models/question';
import { Update } from '@ngrx/entity';

export const loadQuizzes = createAction('[Quizzes API] Quizzes Loaded');
export const loadQuizzesSuccess = createAction('[Quizzes API] Quizzes Loaded Success', props<{ quizzes: IQuiz[] }>());

export const addRequiest = createAction('[Quizzes API] Quizzes Add', props<{ quiz: IQuiz }>());
export const addedSuccess = createAction('[Quizzes API] Quizzes Added Success', props<{ quiz: IQuiz }>());

export const deleteRequiest = createAction('[Quizzes API] Quizzes Delete', props<{ quizId: string }>());
export const deletedSuccess = createAction('[Quizzes API] Quizzes Deleted Success', props<{ quizId: string }>());

export const updateRequiest = createAction('[Quizzes API] Quizzes Update', props<{ update: Update<IQuiz> }>());
export const updatedSuccess = createAction('[Quizzes API] Quizzes Updated Success', props<{ update: Update<IQuiz> }>());

/*
export enum QuizzesActionTypes {
    Loaded = '[Quizzes API] Quizzes Loaded',
    LoadedSuccess = '[Quizzes API] Quizzes Loaded Success', // todo отрефакторить эти константы
    LoadedError = '[Quizzes API] Quizzes Loaded Error',

    AddRequiest = '[Quizzes API] Quizzes Add',
    AddedSuccess = '[Quizzes API] Quizzes Added Success',
    AddedError = '[Quizzes API] Quizzes Added Error',

    DeleteRequiest = '[Quizzes API] Quizzes Deleted',
    DeletedSuccess = '[Quizzes API] Quizzes Deleted Success',
    DeletedError = '[Quizzes API] Quizzes Deleted Error',

    UpdateRequiest = '[Quizzes API] Quizzes Updated',
    UpdatedSuccess = '[Quizzes API] Quizzes Updated Success',
    UpdatedError = '[Quizzes API] Quizzes Updated Error',

    OpenEdit = '[Quizzes API] Quizzes Open Edit',
    OpenEditSuccess = '[Quizzes API] Quizzes Open Edit Success',
    OpenEditError = '[Quizzes API] Quizzes Open Edit Error',

    ADD_QUESTION_REQUEST = '[Quizzes API] Quizzes Add Question',
    ADDED_QUESTION_SUCCESS = '[Quizzes API] Quizzes Added Question Success',
    ADDED_QUESTION_ERROR = '[Quizzes API] Quizzes Added Question Error',
}

// Loaded
export class QuizzesLoadedAction implements Action {
    public readonly type = QuizzesActionTypes.Loaded;
}

export class QuizzesLoadedSuccessAction implements Action {
    public readonly type = QuizzesActionTypes.LoadedSuccess;

    constructor(public payload: { quizzes: IQuiz[] }) {}
}

// Added
export class QuizzesAddedAction implements Action {
    public readonly type = QuizzesActionTypes.AddRequiest;

    constructor(public payload: { quiz: IQuiz }) {}
}

export class QuizzesAddedSuccessAction implements Action {
    public readonly type = QuizzesActionTypes.AddedSuccess;

    constructor(public payload: { quiz: IQuiz }) {}
}

// Deleted
export class QuizzesDeletedAction implements Action {
    public readonly type = QuizzesActionTypes.DeleteRequiest;

    constructor(public payload: { quizId: number | undefined }) {}
}

export class QuizzesDeletedSuccessAction implements Action {
    public readonly type = QuizzesActionTypes.DeletedSuccess;

    constructor(public payload: { quizId: number | undefined }) {}
}

// Update
export class QuizzesUpdatedAction implements Action {
    public readonly type = QuizzesActionTypes.UpdateRequiest;

    constructor(public payload: { 
        quizId: number | undefined,
        quiz: IQuiz
    }) {}
}

export class QuizzesUpdatedSuccessAction implements Action {
    public readonly type = QuizzesActionTypes.UpdatedSuccess;

    constructor(public payload: { 
        quizId: number | undefined,
        quiz: IQuiz
    }) {}
}

// todo Остался открытым вопрос: как лучше организовать работу с зависимыми сущностямим

// Add question
export class QuizzesAddedQuestionAction implements Action {
    public readonly type = QuizzesActionTypes.ADD_QUESTION_REQUEST;

    constructor(public payload: { question: IQuestion }) {}
}

export class QuizzesAddedQuestionSuccessAction implements Action {
    public readonly type = QuizzesActionTypes.ADDED_QUESTION_SUCCESS;

    constructor(public payload: { question: IQuestion }) {}
}


export type QuizzesActions = 
    | QuizzesLoadedSuccessAction 
    | QuizzesLoadedAction
    | QuizzesAddedAction
    | QuizzesAddedSuccessAction
    | QuizzesDeletedAction
    | QuizzesDeletedSuccessAction
    | QuizzesUpdatedAction
    | QuizzesUpdatedSuccessAction
    | QuizzesAddedQuestionAction
    | QuizzesAddedQuestionSuccessAction;*/