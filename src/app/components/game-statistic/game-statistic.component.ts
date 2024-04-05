import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { Subscription } from 'rxjs';
import { selectCountQuestions, selectHistoryGame } from '../../store/selectors/quiz-game.selectors';

@Component({
  selector: 'app-game-statistic',
  templateUrl: './game-statistic.component.html',
  styleUrl: './game-statistic.component.scss'
})
export class GameStatisticComponent implements OnInit, OnDestroy {
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
