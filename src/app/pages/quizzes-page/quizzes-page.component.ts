import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IQuiz } from '../../store/models/quiz';
import { Observable, Subscription, delay } from 'rxjs';
import { AppState, selectModalShow } from '../../store';
import { selectQuizzes } from '../../store/selectors/quizzes.selectors';
import { loadQuizzes } from '../../store/actions/quizzes.actions';
import { BASE_PAGE_SIZE } from '../../components/common-components/paginator/paginator.component';

@Component({
  selector: 'app-quizzzes-page',
  templateUrl: './quizzes-page.component.html',
  styleUrl: './quizzes-page.component.scss'
})
export class QuizzesPageComponent implements OnInit, OnDestroy {

  quizzesSubs: Subscription;

  term: string = '';
  
  quizzes: IQuiz[];

  showQuizzes: IQuiz[];

  isShowModal$: Observable<boolean> = this.store.select(selectModalShow);

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.quizzesSubs = this.store.pipe(select(selectQuizzes)).subscribe(quizzes => this.quizzes = quizzes);
  }

  ngOnDestroy(): void {
    this.quizzesSubs.unsubscribe();
  }

  onChangeShowQuizzes(entitiesObservable: Observable<IQuiz[]>) {
    entitiesObservable.pipe(
      delay(0)
    ).subscribe(entities => this.showQuizzes = entities);
  }
}
