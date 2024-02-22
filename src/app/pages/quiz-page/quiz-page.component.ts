import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectCurrentQuiz, selectCurrentQuizQuestions } from '../../store';
import { QuestionService } from '../../services/question.service';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuiz } from '../../store/models/quiz';
import { Subscription } from 'rxjs';
import { IQuestion } from '../../store/models/question';
import { ActivatedRoute } from '@angular/router';
import { addRequiest, updateRequiest } from '../../store/actions/quizzes.actions';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: [
    '../../app.component.scss',
    './quiz-page.component.scss'
  ]
})
export class QuizPageComponent {

  isUpdate: boolean

  quizSubs: Subscription

  quiz: IQuiz | undefined

  questions: IQuestion[] | undefined
  
  questionsSubs: Subscription

  form = new FormGroup({
    quizName: new FormControl<string>(``, [
      Validators.required,
      Validators.minLength(6)
    ]),
    complexityQuiz: new FormControl<number>(0, [])
  });

  get quizName() {
    return this.form.controls.quizName as FormControl;
  }

  get complexityQuiz() {
    return this.form.controls.complexityQuiz as FormControl;
  }

  constructor(
    public modalService: ModalService,
    public questionService: QuestionService,
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    const edit = activateRoute.snapshot.url.find(part => part.path === 'edit')
    this.isUpdate = edit ? true : false
  }

  ngOnInit(): void {
    this.quizSubs = this.store.pipe(select(selectCurrentQuiz)).subscribe(quiz => {
      this.quiz = quiz;
      this.quizName.setValue(quiz?.name);
      this.complexityQuiz.setValue(quiz?.complexity);
    });

    this.questionsSubs = this.store.pipe(select(selectCurrentQuizQuestions))
      .subscribe(questions => this.questions = questions);

    //this.store.pipe(select(selectQuizEntities)).subscribe(test=> {console.log(test, ' >>> TEST_TEST')});  
  }

  ngOnDestroy(): void {
    this.quizSubs.unsubscribe();
    this.questionsSubs.unsubscribe();
  }

  submit() {
    this.modalService.showConfirm({
      text: `Do you really want to ${this.isUpdate ? 'update' : 'create'} a quiz?`,
      okCallback: this.isUpdate ? this._updateQuiz.bind(this) : this._createQuiz.bind(this)
    });
  }

  _createQuiz() {
    const {quizName, complexityQuiz} = this.form.value;    
   /* this.store.dispatch(new QuizzesAddedAction({
      quiz: {
        name: quizName as string,
        complexity: complexityQuiz as number,
        questions: this.questions
      }
    }));*/

    this.store.dispatch(addRequiest({
      quiz: {
        name: quizName as string,
        complexity: complexityQuiz as number,
        questions: this.questions
      }
    }));
  }

  _updateQuiz() {
    const {quizName, complexityQuiz} = this.form.value;
    /*this.store.dispatch(new QuizzesUpdatedAction({
      quizId: this.quiz?.id,
      quiz: {
        name: quizName as string,
        complexity: complexityQuiz as number,
        questions: this.questions
      }
    }));*/

   /* this.store.dispatch(updateRequiest({
      //quizId: String(this.quiz?.id),
      quiz: {
        name: quizName as string,
        complexity: complexityQuiz as number,
        questions: this.questions
      }
    }));*/
  }
}