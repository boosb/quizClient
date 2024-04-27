import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { addHistoryQuizzesRequiest, addedHistoryQuizzesSuccess, answer, answerRight, answerWrong, startGame, startGameSuccess } from "../actions/quiz-game.actions";
import { GameService } from "../../services/quiz-game.service";
import { QuestionService } from "../../services/question.service";
import { Store } from "@ngrx/store";
import { AppState } from "..";
import { selectUser } from "../selectors/auth.selectors";
import { HistoryQuizzesService } from "../../services/history-quizzes.service";
import { UserService } from "../../services/user.service";
import { getAuthUserSuccess } from "../actions/auth.actions";

@Injectable()
export class GameEffects {
  // todo изначально эта логика была в редьюсере, но вынес сюда, типо как сайд эффект. Но не до конца уверен в целесообразности данного действия
  startGame$ = createEffect(() => this.actions$.pipe(
    ofType(startGame),
    switchMap((action) => of(this.questionService.sortQuestions(action.quiz.questions))
      .pipe(
        map((sortedQuestions) => startGameSuccess({
          quiz: action.quiz,
          questions: sortedQuestions
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

  addHistoryQuizzes$ = createEffect(() => this.actions$.pipe(
    ofType(addHistoryQuizzesRequiest),
    withLatestFrom(this.store.select(selectUser)),
    mergeMap(([action, user]) => this.historyQuizzesService.create({
        history: action.historyData,
        userId: user?.id,
        quizId: action.quizId
    }).pipe(
        map(createdHistoryQuizzes => addedHistoryQuizzesSuccess({historyQuizzes: createdHistoryQuizzes})),
        catchError(() => EMPTY)
      ))
    )
  );

  getUpdatedUser$ = createEffect(() => this.actions$.pipe(
    ofType(addedHistoryQuizzesSuccess),
    mergeMap((action) => this.userService.getOne(action.historyQuizzes.userId)
      .pipe(
        map(user => getAuthUserSuccess({ user })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private questionService: QuestionService,
    private store: Store<AppState>,
    private historyQuizzesService: HistoryQuizzesService,
    private userService: UserService
  ) {}
}