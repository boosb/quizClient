import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectModalShow } from '../../store';
import { QuestionService } from '../../services/question.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuiz } from '../../store/models/quiz';
import { Observable, Subscription } from 'rxjs';
import { IQuestion } from '../../store/models/question';
import { addRequiest, selectQuiz, updateRequiest } from '../../store/actions/quizzes.actions';
import { Update } from '@ngrx/entity';
import { loadQuestions } from '../../store/actions/questions.actions';
import { selectCurrentQuiz } from '../../store/selectors/quizzes.selectors';
import { selectAllQuestions } from '../../store/selectors/questions.selectors';
import { loadAnswers } from '../../store/actions/answers.actions';
import { showConfirm, showModalQuestions } from '../../store/actions/modal.actions';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: [
    '../../app.component.scss',
    './quiz-page.component.scss'
  ]
})
export class QuizPageComponent {
  quizSubs: Subscription;

  questionsSubs: Subscription;

  quiz: IQuiz | undefined;

  questions: IQuestion[] | undefined;

  isShowModal$: Observable<boolean> = this.store.select(selectModalShow);

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

  get quizId() {
    return String(this.quiz?.id);
  }

  constructor(
    public questionService: QuestionService,
    public paginatorService: PaginatorService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.quizSubs = this.store.pipe(select(selectCurrentQuiz)).subscribe(quiz => this._setQuizData(quiz));
    this.questionsSubs = this.store.pipe(select(selectAllQuestions)).subscribe(questions => {
      this.questions = questions;
      this.paginatorService.init(questions)
    });

    if(!this.quiz) {
      this._createQuiz();
    }
  }

  ngOnDestroy(): void {
    this.quizSubs.unsubscribe();
    this.questionsSubs.unsubscribe();
  }

  addQuestion() {
    this.store.dispatch(showModalQuestions({data: { isUpdate: false }}));
  }

  submit() {
    this.store.dispatch(showConfirm({ data: {
      text: `Do you really want to save changes a quiz?`,
      okCallback: this._updateQuiz.bind(this)
    }}));
  }

  _createQuiz() {
    const {quizName, complexityQuiz} = this.form.value;    
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
    const quizUpdate: Update<IQuiz> = {
      id: this.quizId,
      changes: {
        name: quizName as string,
        complexity: complexityQuiz as number,
        questions: this.questions
      }
    }
    this.store.dispatch(updateRequiest({update: quizUpdate}));
  }

  _setQuizData(quiz: IQuiz | undefined) {
    if(!quiz) {
      return;
    }

    this.quiz = quiz;
    this._loadData();
    this._setQuizValues();
  }

  _loadData() {    
    this.store.dispatch(selectQuiz({ quizId: Number(this.quizId) }));
    this.store.dispatch(loadQuestions({ quizId: Number(this.quizId) })); // todo надо уходить от этих мудацких преобразования типов
    this.store.dispatch(loadAnswers({ quizId: Number(this.quizId) }));
  }

  _setQuizValues() {
    this.quizName.setValue(this.quiz?.name);
    this.complexityQuiz.setValue(this.quiz?.complexity);
  }
}