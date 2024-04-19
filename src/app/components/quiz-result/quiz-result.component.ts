import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../store';
import { selectCompleteGame, selectCountQuestions, selectHistoryGame } from '../../store/selectors/quiz-game.selectors';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss'
})
export class QuizResultComponent implements OnInit, OnDestroy { // todo Хочу открывать компонент по маршруту .../result
  isCompleteGame$: Observable<any> = this.store.pipe(select(selectCompleteGame));
  
  historySubs: Subscription;

  countQuestionsSubs: Subscription;

  countQuestions: number;

  historyData: any;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.countQuestionsSubs = this.store.pipe(select(selectCountQuestions)).subscribe(count => this.countQuestions = count);
    this.historySubs = this.store.pipe(select(selectHistoryGame)).subscribe(history => this.historyData = this._getHistoryData(history));
  }

  ngOnDestroy(): void {
    this.historySubs.unsubscribe();
    this.countQuestionsSubs.unsubscribe();
  }

  _getHistoryData(history: any) {
    const historyData = [];
    for(let i = 1; i <= this.countQuestions; i++) {
      const item = history[i]

      historyData.push({
        num: i, 
        isNotAnswer: this._isUndefined(item),
        isRight: item === 1, 
        isWrong: item === 0
      });
    }
    return historyData;
  }

  _isUndefined(value: any) {
    return typeof value === 'undefined';
  }
}
