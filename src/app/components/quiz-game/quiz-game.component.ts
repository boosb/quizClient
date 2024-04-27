import { Component, Input, OnDestroy } from '@angular/core';
import { AppState } from '../../store';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IQuiz } from '../../store/models/quiz';
import { addHistoryQuizzesRequiest, answer, answerSelect, nextQuestion, previousQuestion } from '../../store/actions/quiz-game.actions';
import { IQuestion } from '../../store/models/question';
import { selectBtnState, selectCounter, selectCurrentQuestion, selectIsLastAnswer, selectSelectedAnswer, selectHistoryGame } from '../../store/selectors/quiz-game.selectors';
import { IAnswer } from '../../store/models/answer';
import { ImgService } from '../../services/img.service';
import { GameButtons } from '../../store/models/game-buttons';
import { ICurrentHistory } from '../../store/models/current-history';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: [
    './quiz-game.component.scss',
    '../../app.component.scss'
  ]
})
export class QuizGameComponent implements OnDestroy {
  @Input() quiz: IQuiz;

  currentQuestionSubs: Subscription;

  counterSubs: Subscription;

  btnStateSubs: Subscription;

  selectedAnswerSubs: Subscription;

  historySubs: Subscription;

  isLastAnswerSubs: Subscription;

  currentQuestion: IQuestion | null;

  counter: number;

  buttons: GameButtons;

  selectedAnswer: IAnswer | null;

  completeGameSubs: Subscription;

  currentHistory: ICurrentHistory;

  constructor(
    private store: Store<AppState>,
    public imgService: ImgService
  ) {
    this.currentQuestionSubs = store.pipe(select(selectCurrentQuestion)).subscribe(question => this.currentQuestion = question);
    this.counterSubs = store.pipe(select(selectCounter)).subscribe(counter => this.counter = counter);
    this.btnStateSubs = store.pipe(select(selectBtnState)).subscribe(btnState => this.buttons = btnState);
    this.selectedAnswerSubs = store.pipe(select(selectSelectedAnswer)).subscribe(answer => this.selectedAnswer = answer);
    this.historySubs = store.pipe(select(selectHistoryGame)).subscribe(history => this.currentHistory = history.currentHistory);
    this.isLastAnswerSubs = store.pipe(select(selectIsLastAnswer)).subscribe(isLastAnswer => {
      if(isLastAnswer) {
        this.completeQuiz();
      }
    });

    imgService.includeExitIcon();
  }

  ngOnDestroy(): void {
    this.currentQuestionSubs.unsubscribe();
    this.counterSubs.unsubscribe();
    this.btnStateSubs.unsubscribe();
    this.selectedAnswerSubs.unsubscribe();
    this.historySubs.unsubscribe();
    this.isLastAnswerSubs.unsubscribe();
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
