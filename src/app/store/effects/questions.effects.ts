import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { QuestionService } from '../../services/question.service';
import { addQuestionRequest, addedQuestionSuccess, deleteQuestionRequest, deletedQuestionSuccess, loadQuestions, loadQuestionsSuccess, updateQuestionRequest, updatedQuestionSuccess } from '../actions/questions.actions';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { closeModal } from '../actions/modal.actions';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class QuestionsEffects {
  loadQuestions$ = createEffect(() => this.actions$.pipe(
    ofType(loadQuestions),
    exhaustMap((action) => this.questionService.getAll(action.quizId)
      .pipe(
        map(questions => {
          const sortQuestions = this.questionService.sortQuestions(questions);
          return loadQuestionsSuccess({questions: sortQuestions || []});
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  addQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(addQuestionRequest),
    mergeMap((action) => this.questionService.create(action.question)
      .pipe(
        map((createdQuestion) => {
          this.store.dispatch(closeModal());
          this.snackBar.open('Question has been created!', 'OK', {duration: 3000});
          return addedQuestionSuccess({question: createdQuestion});
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(deleteQuestionRequest),
    mergeMap((action) => this.questionService.delete(action.questionId)
      .pipe(
        map(() => {
          this.snackBar.open('Question has been deleted!', 'OK', {duration: 3000});
          return deletedQuestionSuccess({questionId: action.questionId});
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  updateQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(updateQuestionRequest),
    mergeMap((action) => this.questionService.update(action.update)
      .pipe(
        map(() => {
          this.store.dispatch(closeModal());
          this.snackBar.open('Question has been updated!', 'OK', {duration: 3000});
          return updatedQuestionSuccess({update: action.update});
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private questionService: QuestionService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {}
}