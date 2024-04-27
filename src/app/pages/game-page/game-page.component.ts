import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectCompleteGame, selectHistoryGame } from '../../store/selectors/quiz-game.selectors';
import { IHistoryQuizzes } from '../../store/models/history-quizzes';
import { selectCurrentQuiz } from '../../store/selectors/quizzes.selectors';
import { IQuiz } from '../../store/models/quiz';
import { closeGame, startGame } from '../../store/actions/quiz-game.actions';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: [
    '../../app.component.scss',
    './game-page.component.scss'
  ]
})
export class GamePageComponent implements OnInit, OnDestroy {
  quizSubs: Subscription;

  historySubs: Subscription;

  isCompleteGameSubs: Subscription;

  quiz: IQuiz | undefined;

  isCompleteGame: boolean;

  lastHistoryQuiz: IHistoryQuizzes | null;
  
  constructor(
    private store: Store<AppState>,
  ) {
    this.quizSubs = store.pipe(select(selectCurrentQuiz)).subscribe(quiz => this.quiz = quiz);
    this.historySubs = store.pipe(select(selectHistoryGame)).subscribe(history => this.lastHistoryQuiz = history.lastHistoryQuizzes);
    this.isCompleteGameSubs = store.pipe(select(selectCompleteGame)).subscribe(isComplete => this.isCompleteGame = isComplete);
  }

  ngOnInit(): void {
    if(!this.quiz) {
      return;
    }

    this.store.dispatch(startGame({quiz: this.quiz}));
  }

  ngOnDestroy(): void {
    this.historySubs.unsubscribe();
    this.isCompleteGameSubs.unsubscribe();
    this.store.dispatch(closeGame());
  }
}