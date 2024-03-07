import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IQuiz } from '../../store/models/quiz';
import { Observable } from 'rxjs';
import { AppState, selectModalShow } from '../../store';
import { selectQuizzes } from '../../store/selectors/quizzes.selectors';
import { loadQuizzes } from '../../store/actions/quizzes.actions';

@Component({
  selector: 'app-quizzzes-page',
  templateUrl: './quizzes-page.component.html',
  styleUrl: './quizzes-page.component.scss'
})
export class QuizzesPageComponent implements OnInit {

  term: string = ''
  
  quizzes$: Observable<(IQuiz | undefined)[]> = this.store.select(selectQuizzes)

  isShowModal$: Observable<boolean> = this.store.select(selectModalShow)

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadQuizzes())
  }
}
