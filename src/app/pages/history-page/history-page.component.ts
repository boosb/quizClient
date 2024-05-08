import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, delay } from 'rxjs';
import { AppState } from '../../store';
import { Store, select } from '@ngrx/store';
import { selectUserHistoryQuizzes } from '../../store/selectors/auth.selectors';
import { IHistoryQuizzes } from '../../store/models/history-quizzes';
import { FormControl, FormGroup } from '@angular/forms';

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

  formFilter = new FormGroup({
    filterSorted: new FormControl<string>(`Date`, []),
  });

  get filterSorted() {
    return this.formFilter.controls.filterSorted as FormControl;
  }

  constructor(
    private store: Store<AppState>
  ) {}
  
  ngOnInit(): void {
    this.historyQuizzesSubs = this.store.pipe(select(selectUserHistoryQuizzes)).subscribe(historyQuizzes => this.historyQuizzes = historyQuizzes);
  }

  ngOnDestroy(): void {
    this.historyQuizzesSubs.unsubscribe();
  }

  onChangeShowHistoryQuizzes(entitiesObservable: Observable<IHistoryQuizzes[]>) {
    entitiesObservable.pipe(
      delay(0)
    ).subscribe(entities => this.showHistoryQuizzes = entities);
  }

  toggleFilterSorted() {
    console.log(this.filterSorted, ' >>> hi')
  }
}