import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { addRequiest, addedSuccess, deleteRequiest, deletedSuccess, loadQuizzes, loadQuizzesSuccess, updateRequiest, updatedSuccess } from '../actions/quizzes.actions';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class QuizzesEffects {

  loadQuizzes$ = createEffect(() => this.actions$.pipe(
    ofType(loadQuizzes),
    exhaustMap(() => this.quizService.getAll()
      .pipe(
        map(quizzes => loadQuizzesSuccess({quizzes})),
        catchError((err) => {
          // todo вставить сюда обработку ошибок
          return EMPTY
        })
      ))
    )
  );

  addQuiz$ = createEffect(() => this.actions$.pipe(
    ofType(addRequiest),
    mergeMap((action) => this.quizService.create(action.quiz)
      .pipe(
        map(createdQuiz => {
          this.router.navigate([`/quizzes/edit/${createdQuiz.id}`]);
          this.snackBar.open('Quiz has been created!', 'OK', {duration: 3000});
          return addedSuccess({quiz: createdQuiz});
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteQuiz$ = createEffect(() => this.actions$.pipe(
      ofType(deleteRequiest),
      mergeMap((action) => this.quizService.delete(Number(action.quizId)) // todo хорошо бы поразбираться с этими mergeMap
        .pipe(
          map(() => {
            this.snackBar.open('Quiz has been deleted!', 'OK', {duration: 3000});
            return deletedSuccess({quizId: action.quizId});
          }),
          catchError(() => EMPTY)
        ))
    )
  );

  updateQuiz$ = createEffect(() => this.actions$.pipe(
    ofType(updateRequiest),
    mergeMap((action) => this.quizService.update(action.update)
      .pipe(
        map(() => {
          this.snackBar.open('Quiz has been updated!', 'OK', {duration: 3000});
          return updatedSuccess({update: action.update});
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}