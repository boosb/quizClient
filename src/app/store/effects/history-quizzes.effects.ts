import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HistoryQuizzesService } from "../../services/history-quizzes.service";
import { addHistoryQuizzesRequiest, addedHistoryQuizzesSuccess } from "../actions/history-quizzes.action";
import { EMPTY, catchError, map, mergeMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "..";
import { selectUser } from "../selectors/auth.selectors";

// todo НАсть отсюда. Написать эффект для создания истории, а потом получать историю из авторизованного юзера.
@Injectable()
export class HistoryQuizzesEffects {
  addHistoryQuizzes$ = createEffect(() => this.actions$.pipe(
    ofType(addHistoryQuizzesRequiest),
    withLatestFrom(this.store.select(selectUser)),
    mergeMap(([action, user]) => this.historyQuizzesService.create({
        history: action.historyData,
        userId: user?.id,
        quizId: action.quizId
    }).pipe(
            map(createdHistoryQuizzes => {
                //this.router.navigate([`/quizzes/edit/${createdQuiz.id}`]);
                
                //todo хм-хм, мб роутинг на ../result сюда впилить  
                return addedHistoryQuizzesSuccess({historyQuizzes: createdHistoryQuizzes});
            }),
            catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private historyQuizzesService: HistoryQuizzesService
  ) {}
}