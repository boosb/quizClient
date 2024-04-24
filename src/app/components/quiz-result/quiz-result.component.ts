import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store';
import { IHistoryQuizzes } from '../../store/models/history-quizzes';
import { selectQuizById } from '../../store/selectors/quizzes.selectors';
import { IQuiz } from '../../store/models/quiz';
import { IQuestion } from '../../store/models/question';
import { HistoryDataItem } from '../../store/models/history-quizzes-item';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss'
})
export class QuizResultComponent implements OnInit, OnDestroy { // todo Хочу открывать компонент по маршруту .../result
  @Input() historyQuiz: IHistoryQuizzes;

  quizSubs: Subscription;

  countQuestions: number | undefined;

  quiz: IQuiz | undefined;

  rightCount: number = 0;

  historyData: HistoryDataItem[] | undefined;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const { quizId } = this.historyQuiz;
    this.quizSubs = this.store.pipe(select(selectQuizById, {quizId})).subscribe(quiz => {
      this.quiz = quiz;
      this.countQuestions = quiz?.questions?.length;
      this.historyData = this._getHistoryData(quiz?.questions);
    });

    this._rightCounter();
  }

  ngOnDestroy(): void {
    this.quizSubs.unsubscribe();
  }

  _getHistoryData(questions: IQuestion[] | undefined) {
    if(!questions) {
      return;
    }

    return questions.map((question, ind) => {
      const questionNum = ind + 1;
      const historyItem = this.historyQuiz.history[questionNum];

      return {
        num: questionNum, 
        isNotAnswer: this._isUndefined(historyItem),
        isRight: historyItem === 1,
        isWrong: historyItem === 0
      }
    });
  }

  _rightCounter() {
    this.historyData?.forEach(historyItem => {
      if(historyItem.isRight) {
        this.rightCount += 1;
      }
    });
  }

  _isUndefined(value: any) {
    return typeof value === 'undefined';
  }
}
