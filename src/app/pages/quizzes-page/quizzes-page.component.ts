import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';
import { QuizService } from '../../services/quiz.service';
import { Store, select } from '@ngrx/store';
import { IQuiz } from '../../store/models/quiz';
import { Observable } from 'rxjs';
//import { QuizzesLoadedAction } from '../../store/actions/quizzes.actions';
import { AppState, selectQuizState, selectQuizzes, testSelector } from '../../store';
import { Dictionary } from '@ngrx/entity';
import { QuizzesState } from '../../store/reducers/quizzes.reducer';
import { loadQuizzes } from '../../store/actions/quizzes.actions';

@Component({
  selector: 'app-quizzzes-page',
  templateUrl: './quizzes-page.component.html',
  styleUrl: './quizzes-page.component.scss'
})
export class QuizzesPageComponent implements OnInit {
  title = 'quizzes';
  term = ''; // todo разобраться с фильтром
  
  quizzes$: Observable<(IQuiz | undefined)[]> = this.store.select(testSelector)
 // quizzes$: Observable<IQuiz[]> =  this.store.select(selectAllQuizzes);
  quizzes: IQuiz[]

  constructor(
    public quizService: QuizService,
    public modalService: ModalService,
    public notificationService: NotificationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    
    // todo лоадинг добавлю потом отдельным компонентом
    this.store.dispatch(loadQuizzes());

    //this.store.select(testSelector).subscribe(t => {console.log(t, ' >> t')});

    //console.log(this.quizzes$.subscribe(t => {console.log(t, ' >t')}), ' >>> this.quizzes$')
  }
}
