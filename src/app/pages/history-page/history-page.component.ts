import { Component, OnInit } from '@angular/core';
import { PaginatorService } from '../../services/paginator.service';
import { Subscription } from 'rxjs';
import { AppState } from '../../store';
import { Store, select } from '@ngrx/store';
import { selectUserHistoryQuizzes } from '../../store/selectors/auth.selectors';
import { IHistoryQuizzes } from '../../store/models/history-quizzes';

// todo в этот компонент можно добавить фильтры, например по дате
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent implements OnInit {
  //todo так же по мимо фильтров надо добавить сортировку (как минимум по дате)
  historyQuizzesSubs: Subscription;

  historyQuizzes: IHistoryQuizzes[] | undefined;

  paginatorData: any;

  constructor(
    private store: Store<AppState>,
    public paginatorService: PaginatorService
  ) {}
  
  ngOnInit(): void {
    this.historyQuizzesSubs = this.store.pipe(select(selectUserHistoryQuizzes)).subscribe(historyQuizzes => {
      const sortedHistoryQuizzes = this._dateSort(historyQuizzes);
      this.historyQuizzes = sortedHistoryQuizzes;
      this.paginatorService.init('historyPage', sortedHistoryQuizzes);

      console.log(this.paginatorService.data, ' >>> TEST')
      this.paginatorData = this.paginatorService.getPaginatorData('historyPage');
    });
  }

  _dateSort(historyQuizzes: IHistoryQuizzes[] | undefined) {
    if(!historyQuizzes) {
      return;
    }

    const copyHistoryQuizzes = [...historyQuizzes]
    return copyHistoryQuizzes?.sort((a, b) => (a.dateTime && b.dateTime) && a.dateTime > b.dateTime ? 1 : -1);
  }
}
