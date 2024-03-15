import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AnswerService } from "../../services/answer.service";
import { NotificationService } from "../../services/notification.service";
import { addAnswerRequest, addedAnswerSuccess, deleteAnswerRequest, deletedAnswerSuccess, loadAnswers, loadAnswersSuccess, updateAnswerRequest, updatedAnswerSuccess } from "../actions/answers.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "..";
import { closeModal } from "../actions/modal.actions";

@Injectable()
export class AnswersEffects {
  loadAnswers$ = createEffect(() => this.actions$.pipe(
    ofType(loadAnswers),
    exhaustMap((action) => this.answerService.getAllAtQuiz(action.quizId)
      .pipe(
        map(answers => loadAnswersSuccess({answers})),
        catchError(() => EMPTY)
      ))
    )
  );

  addAnswer$ = createEffect(() => this.actions$.pipe(
    ofType(addAnswerRequest),
    exhaustMap((action) => this.answerService.create(action.answer)
      .pipe(
          map(createdAnswer => {
            this.store.dispatch(closeModal());
            this.notificationService.show(`Answer has been created!`);
            return addedAnswerSuccess({answer: createdAnswer});
          }),
          catchError(() => EMPTY)
      ))
    )
  );

  deleteAnswer$ = createEffect(() => this.actions$.pipe(
    ofType(deleteAnswerRequest),
    exhaustMap((action) => this.answerService.delete(action.answerId)
      .pipe(
        map(() => {
          this.notificationService.show(`Answer has been deleted!`);
          return deletedAnswerSuccess({answerId: action.answerId});
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  updateAnswer$ = createEffect(() => this.actions$.pipe(
    ofType(updateAnswerRequest),
    exhaustMap((action) => this.answerService.update(action.update)
      .pipe(
        map(() => {
          this.store.dispatch(closeModal());
          this.notificationService.show(`Answer has been updated!`);
          return updatedAnswerSuccess({update: action.update});
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private answerService: AnswerService,
    private notificationService: NotificationService,
    private store: Store<AppState>
  ) {}
}