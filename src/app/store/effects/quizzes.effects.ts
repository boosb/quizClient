import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
//import { QuizzesActionTypes, QuizzesAddedAction, QuizzesAddedSuccessAction, QuizzesDeletedAction, QuizzesDeletedSuccessAction, QuizzesLoadedSuccessAction, QuizzesUpdatedAction, QuizzesUpdatedSuccessAction, loadQuizzes } from '../actions/quizzes.actions';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { addRequiest, addedSuccess, loadQuizzes, loadQuizzesSuccess } from '../actions/quizzes.actions';

@Injectable()
export class QuizzesEffects {

  loadQuizzes$ = createEffect(() => this.actions$.pipe(
    ofType(loadQuizzes),
    exhaustMap(() => {
      console.log('00')
      return this.quizService.getAll()
      .pipe(
        map(quizzes => {
          console.log(quizzes, ' >>> 1')
          const test = loadQuizzesSuccess({quizzes})
          console.log(test, ' >>>> test-test-test')
          return test
        }),
        catchError(() => EMPTY)
      )
    })
    )
  );

  addQuiz$ = createEffect(() => this.actions$.pipe(
    ofType(addRequiest),
    mergeMap((action) => {
      console.log(action, ' >>> ACTION')
      return this.quizService.create(action.quiz)
      .pipe(
        map(createdQuiz => {
          this.router.navigate([`/quizzes/edit/${createdQuiz.id}`])
          this.notificationService.show(`Quiz has been created!`)
          return addedSuccess({quiz: createdQuiz})
        }),
        catchError(() => EMPTY)
      )
    })
    )
  );
/*
  deleteQuiz$ = createEffect(() => this.actions$.pipe(
      ofType(QuizzesActionTypes.DeleteRequiest),
      mergeMap((action: QuizzesDeletedAction) => this.quizService.delete(action.payload.quizId) // todo хорошо бы поразбираться с этими mergeMap
        .pipe(
          map(() => {
            this.notificationService.show(`Quiz has been deleted!`)
            return new QuizzesDeletedSuccessAction({quizId: action.payload.quizId})
          }),
          catchError(() => EMPTY)
        ))
    )
  );

  updateQuiz$ = createEffect(() => this.actions$.pipe(
    ofType(QuizzesActionTypes.UpdateRequiest),
    mergeMap((action: QuizzesUpdatedAction) => {
      const {quizId, quiz} = action.payload;
      return this.quizService.update(quizId, quiz)
        .pipe(
          map(() => {
            this.notificationService.show(`Quiz has been updated!`)
            return new QuizzesUpdatedSuccessAction({quizId, quiz})
          }),
          catchError(() => EMPTY)
        )
    })
    )
  );
*/
  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
}