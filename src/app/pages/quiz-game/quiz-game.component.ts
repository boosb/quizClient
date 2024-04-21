import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { Store, select } from '@ngrx/store';
import { selectCurrentQuiz } from '../../store/selectors/quizzes.selectors';
import { Observable, Subscription } from 'rxjs';
import { IQuiz } from '../../store/models/quiz';
import { answer, answerSelect, closeGame, completeGame, nextQuestion, previousQuestion, startGame } from '../../store/actions/quiz-game.actions';
import { IQuestion } from '../../store/models/question';
import { selectBtnState, selectCompleteGame, selectCounter, selectCurrentQuestion, selectGameIsOn, selectHistoryGame, selectSelectedAnswer } from '../../store/selectors/quiz-game.selectors';
import { IAnswer } from '../../store/models/answer';
import { ImgService } from '../../services/img.service';
import { HistoryQuizzesService } from '../../services/history-quizzes.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: [
    '../../app.component.scss',
    './quiz-game.component.scss'
  ]
})
export class QuizGameComponent implements OnInit, OnDestroy {
  quizSubs: Subscription;

  currentQuestionSubs: Subscription;

  counterSubs: Subscription;

  btnStateSubs: Subscription;

  selectedAnswerSubs: Subscription;

  quiz: IQuiz | undefined;

  currentQuestion: IQuestion | null;

  counter: number;

  nextDisabled: boolean = false;

  previousDisabled: boolean = false;

  answerDisabled: boolean = false;

  selectedAnswer: IAnswer | null;

  completeGameSubs: Subscription;

  //isCompleteGame$: Observable<any> = this.store.pipe(select(selectCompleteGame));

  isGameOn$: Observable<any> = this.store.pipe(select(selectGameIsOn));

  historyData: any;
  
  constructor(
    private store: Store<AppState>,
    public imgService: ImgService,
    private historyQuizzesService: HistoryQuizzesService
  ) {
    this.quizSubs = store.pipe(select(selectCurrentQuiz)).subscribe(quiz => this.quiz = quiz);
    this.currentQuestionSubs = store.pipe(select(selectCurrentQuestion)).subscribe(question => this.currentQuestion = question);
    this.counterSubs = store.pipe(select(selectCounter)).subscribe(counter => this.counter = counter);

    this.btnStateSubs = store.pipe(select(selectBtnState)).subscribe(btnState => {
      this.nextDisabled = btnState.nextDisabled;
      this.previousDisabled = btnState.previousDisabled;
      this.answerDisabled = btnState.answerDisabled;
    });

    this.selectedAnswerSubs = store.pipe(select(selectSelectedAnswer)).subscribe(answer => this.selectedAnswer = answer);

    this.completeGameSubs = store.pipe(select(selectCompleteGame)).subscribe(isComplete => {
      if(isComplete) {
        this.store.dispatch(completeGame({quizId: this.quiz?.id}));
      }
    });

    this.store.pipe(select(selectHistoryGame)).subscribe(history => this.historyData = history);
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

    this.completeGameSubs.unsubscribe();

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
    this.store.dispatch(completeGame({quizId: this.quiz?.id}));
    if(this.quiz?.id) {
      console.log('hello')
      this.historyQuizzesService.create({
        history: this.historyData,
        userId: 13, // todo заглушка с моим пользователем
        quizId: this.quiz?.id
      });
    }
  }
}
