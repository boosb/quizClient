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
  //todo так же по мимо фильтров надо добавить сортировку (как минимум по дате)
  historyQuizzesSubs: Subscription;

  historyQuizzes: IHistoryQuizzes[] | undefined;

  showHistoryQuizzes: IHistoryQuizzes[] | undefined;

  constructor(
    private store: Store<AppState>
  ) {}
  
  ngOnInit(): void {
    this.historyQuizzesSubs = this.store.pipe(select(selectUserHistoryQuizzes)).subscribe(historyQuizzes => {
      const sortedHistoryQuizzes = this._dateSort(historyQuizzes);
      this.historyQuizzes = sortedHistoryQuizzes;
      this.showHistoryQuizzes = sortedHistoryQuizzes?.slice(0, BASE_PAGE_SIZE);
    });
  }

  ngOnDestroy(): void {
    this.historyQuizzesSubs.unsubscribe();
  }

  onChangeShowHistoryQuizzes(entities: IHistoryQuizzes[] | undefined) {
    this.showHistoryQuizzes = entities;
  }

  _dateSort(historyQuizzes: IHistoryQuizzes[] | undefined) { // todo мб эту штуку вынести в пайп
    if(!historyQuizzes) {
      return;
    }

    const copyHistoryQuizzes = [...historyQuizzes]
    return copyHistoryQuizzes?.sort((a, b) => (a.dateTime && b.dateTime) && a.dateTime > b.dateTime ? 1 : -1);
  }
}
