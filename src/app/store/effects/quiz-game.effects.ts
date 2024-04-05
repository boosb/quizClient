import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, of, switchMap } from "rxjs";
import { answer, answerRight, answerWrong, startGame, startGameSuccess } from "../actions/quiz-game.actions";
import { GameService } from "../../services/quiz-game.service";

@Injectable()
export class GameEffects {
  // todo изначально эта логика была в редьюсере, но вынес сюда, типо как сайд эффект. Но не до конца уверен в целесообразности данного действия
  startGame$ = createEffect(() => this.actions$.pipe(
    ofType(startGame),
    switchMap((action) => of(this.gameService.sortQuestions(action.quiz))
      .pipe(
        map((data) => startGameSuccess({
          quiz: data.quiz,
          questions: data.sortedQuestions
        })),
        catchError(() => EMPTY)
      ))
    )
  );

  answer$ = createEffect(() => this.actions$.pipe(
    ofType(answer),
    switchMap(() => this.gameService.checkRightAnswer()
      .pipe(
        map(() => answerRight()),
        catchError(() => of(answerWrong()))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private gameService: GameService,
  ) {}
}