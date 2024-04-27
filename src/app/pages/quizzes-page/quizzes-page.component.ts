import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IQuiz } from '../../store/models/quiz';
import { Observable, Subscription } from 'rxjs';
import { AppState, selectModalShow } from '../../store';
import { selectQuizzes } from '../../store/selectors/quizzes.selectors';
import { loadQuizzes } from '../../store/actions/quizzes.actions';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'app-quizzzes-page',
  templateUrl: './quizzes-page.component.html',
  styleUrl: './quizzes-page.component.scss'
})
export class QuizzesPageComponent implements OnInit, OnDestroy {

  quizzesSubs: Subscription;

  term: string = '';
  
  quizzes: IQuiz[];

  isShowModal$: Observable<boolean> = this.store.select(selectModalShow);

  paginatorData: any;

  constructor(
    private store: Store<AppState>,
    public paginatorService: PaginatorService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadQuizzes());
    this.quizzesSubs = this.store.pipe(select(selectQuizzes)).subscribe(quizzes => {
      this.quizzes = quizzes;
      this.paginatorService.init('quizzesPage', quizzes);
      console.log(this.paginatorService.data, ' >>> TEST')
      this.paginatorData = this.paginatorService.getPaginatorData('quizzesPage');
     // console.log(this.paginatorData, ' >>paginatorData')
    });
  }

  ngOnDestroy(): void {
    this.quizzesSubs.unsubscribe();
  }
}
