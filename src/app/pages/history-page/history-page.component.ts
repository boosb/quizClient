import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../../store';
import { Store, select } from '@ngrx/store';
import { selectUserHistoryQuizzes } from '../../store/selectors/auth.selectors';
import { IHistoryQuizzes } from '../../store/models/history-quizzes';
import { BASE_PAGE_SIZE } from '../../components/common-components/paginator/paginator.component';

// todo в этот компонент можно добавить фильтры, например по дате
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: [
    './history-page.component.scss',
    '../../app.component.scss'
  ]
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  historyQuizzesSubs: Subscription;

  historyQuizzes: IHistoryQuizzes[] | undefined;

  showHistoryQuizzes: IHistoryQuizzes[] | undefined;

  constructor(
    private store: Store<AppState>
  ) {}
  
  ngOnInit(): void {
    this.historyQuizzesSubs = this.store.pipe(select(selectUserHistoryQuizzes)).subscribe(historyQuizzes => {
      this.historyQuizzes = historyQuizzes;
      this.showHistoryQuizzes = historyQuizzes?.slice(0, BASE_PAGE_SIZE);
    });
  }

  ngOnDestroy(): void {
    this.historyQuizzesSubs.unsubscribe();
  }

  onChangeShowHistoryQuizzes(entities: IHistoryQuizzes[] | undefined) {
    this.showHistoryQuizzes = entities;
  }
}