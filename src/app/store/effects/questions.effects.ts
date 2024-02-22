import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { QuestionService } from '../../services/question.service';

@Injectable()
export class QuestionsEffects {
/*
  addQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(QuizzesActionTypes.ADD_QUESTION_REQUEST),
    mergeMap((action: QuizzesAddedQuestionAction) => this.questionService.create(action.payload.question)
      .pipe(
        map(createdQuestion => {
          //this.router.navigate([`/quizzes/edit/${createdQuestion.id}`])
         // this.notificationService.show(`Quiz has been created!`)
            console.log( createdQuestion, ' >>> createdQuestion' )
            return new QuizzesAddedQuestionSuccessAction({question: createdQuestion})
        }),
        catchError(() => EMPTY)
      ))
    )
  );
*/




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
  );*/

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private questionService: QuestionService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
}