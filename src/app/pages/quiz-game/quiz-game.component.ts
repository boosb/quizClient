import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { Store, select } from '@ngrx/store';
import { selectCurrentQuiz } from '../../store/selectors/quizzes.selectors';
import { Observable, Subscription } from 'rxjs';
import { IQuiz } from '../../store/models/quiz';
import { addHistoryQuizzesRequiest, answer, answerSelect, closeGame, nextQuestion, previousQuestion, startGame } from '../../store/actions/quiz-game.actions';
import { IQuestion } from '../../store/models/question';
import { selectBtnState, selectCompleteGame, selectCounter, selectCurrentQuestion, selectGameIsOn, selectCurrentHistoryGame, selectIsLastAnswer, selectSelectedAnswer, selectHistoryGame } from '../../store/selectors/quiz-game.selectors';
import { IAnswer } from '../../store/models/answer';
import { ImgService } from '../../services/img.service';
import { IHistoryQuizzes } from '../../store/models/history-quizzes';
import { GameButtons } from '../../store/models/game-buttons';
import { ICurrentHistory } from '../../store/models/current-history';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: [
    '../../app.component.scss',
    './quiz-game.component.scss'
  ]
})
export class QuizGameComponent implements OnInit, OnDestroy {
  //todo разбить на два компонента (основная игра и результаты)
  quizSubs: Subscription;

  currentQuestionSubs: Subscription;

  counterSubs: Subscription;

  btnStateSubs: Subscription;

  selectedAnswerSubs: Subscription;

  historySubs: Subscription;

  isLastAnswerSubs: Subscription;

  quiz: IQuiz | undefined;

  currentQuestion: IQuestion | null;

  counter: number;

  buttons: GameButtons;

  selectedAnswer: IAnswer | null;

  completeGameSubs: Subscription;

  isCompleteGame$: Observable<any> = this.store.pipe(select(selectCompleteGame));

  isGameOn$: Observable<any> = this.store.pipe(select(selectGameIsOn));

  currentHistory: ICurrentHistory;

  lastHistoryQuiz: IHistoryQuizzes | null;
  
  constructor(
    private store: Store<AppState>,
    public imgService: ImgService
  ) {
    this.quizSubs = store.pipe(select(selectCurrentQuiz)).subscribe(quiz => this.quiz = quiz);
    this.currentQuestionSubs = store.pipe(select(selectCurrentQuestion)).subscribe(question => this.currentQuestion = question);
    this.counterSubs = store.pipe(select(selectCounter)).subscribe(counter => this.counter = counter);
    this.btnStateSubs = store.pipe(select(selectBtnState)).subscribe(btnState => this.buttons = btnState);
    this.selectedAnswerSubs = store.pipe(select(selectSelectedAnswer)).subscribe(answer => this.selectedAnswer = answer);
    this.historySubs = store.pipe(select(selectHistoryGame)).subscribe(history => {
      this.currentHistory = history.currentHistory;
      this.lastHistoryQuiz = history.lastHistoryQuizzes
    });

    this.isLastAnswerSubs = store.pipe(select(selectIsLastAnswer)).subscribe(isLastAnswer => {
      if(isLastAnswer) {
        this.completeQuiz();
      }
    });

    imgService.includeExitIcon();
  }

  ngOnInit(): void {
    if(!this.quiz) {
      return;
    }

    this.store.dispatch(startGame({quiz: this.quiz}));
  }

  ngOnDestroy(): void {
    this.quizSubs.unsubscribe();
    this.currentQuestionSubs.unsubscribe();
    this.counterSubs.unsubscribe();
    this.btnStateSubs.unsubscribe();
    this.selectedAnswerSubs.unsubscribe();
    this.historySubs.unsubscribe();
    this.isLastAnswerSubs.unsubscribe();

    this.store.dispatch(closeGame());
  }

  previousQuestion() {
    this.store.dispatch(previousQuestion({ questionNumber: this.counter - 1 }));
  }

  nextQuestion() {
    this.store.dispatch(nextQuestion({ questionNumber: this.counter + 1 }));
  }

  answer() {
    this.store.dispatch(answer());
  }

  selectAnswer(selectedAnswer: IAnswer) {
    this.store.dispatch(answerSelect({ selectedAnswer }));
  }

  completeQuiz() {
    if(!this.quiz?.id) {
      return;
    }
    this.store.dispatch(addHistoryQuizzesRequiest({
      historyData: this.currentHistory,
      quizId: this.quiz?.id
    }));
  }
}
