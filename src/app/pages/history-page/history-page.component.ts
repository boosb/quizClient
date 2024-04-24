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
  historyQuizzesSubs: Subscription;

  historyQuizzes: IHistoryQuizzes[] | undefined;

  constructor(
    private store: Store<AppState>,
    public paginatorService: PaginatorService
  ) {}
  
  ngOnInit(): void {
    this.historyQuizzesSubs = this.store.pipe(select(selectUserHistoryQuizzes)).subscribe(historyQuizzes => {
      this.historyQuizzes = historyQuizzes;
      this.paginatorService.init(historyQuizzes);
    });
  }
}
