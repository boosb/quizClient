import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IQuestion } from '../../../store/models/question';
import { IAnswer } from '../../../store/models/answer';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { deleteQuestionRequest, selectQuestion, toggleDetails } from '../../../store/actions/questions.actions';
import { selectQustionAnswers } from '../../../store/selectors/answers.selectors';
import { showConfirm, showModalAnswers, showModalQuestions } from '../../../store/actions/modal.actions';
import { ImgService } from '../../../services/img.service';
import { selectShowDetails } from '../../../store/selectors/questions.selectors';

const MAX_TEXT_LENGTH = 75;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: [
    './question.component.scss',
    '../../../app.component.scss'
  ]
})
export class QuestionComponent implements OnInit, OnDestroy {
  
  @Input() question: IQuestion;

  @Input() number: number;

  answersSubs: Subscription;

  showDetailsSubs: Subscription;

  answers: IAnswer[];

  questionText: string = '';

  showDetails: boolean;

  constructor(
    private store: Store<AppState>,
    public imgService: ImgService
  ) {}

  ngOnInit(): void {
    this.answersSubs = this.store.pipe(select(selectQustionAnswers, {questionId: this.question?.id}))
      .subscribe(answers => this.answers = answers);

    this.showDetailsSubs = this.store.pipe(select(selectShowDetails, {questionId: this.question?.id}))
      .subscribe(showDetails => this.showDetails = showDetails);
  }

  ngOnDestroy(): void {
    this.answersSubs.unsubscribe();
    this.showDetailsSubs.unsubscribe();
  }

  toggleShowMore() {
    this.store.dispatch(toggleDetails({questionId: this.question.id}));
  }

  deleteQuestion() {
    this.store.dispatch(showConfirm({ data: {
      text: 'Are you sure you want to delete the question?',
      okCallback: this._deleteQuestion.bind(this)
    }}));
  }

  setCurrentQuestion() {
    this.store.dispatch(selectQuestion({questionId: this.question.id}));
  }

  updateQuestion() {
    this.store.dispatch(showModalQuestions({data: {isUpdate: true}}));
  }

  addAnswer() {
    this.store.dispatch(showModalAnswers({data: {isUpdate: false}}));
  }

  _deleteQuestion() {
    this.store.dispatch(deleteQuestionRequest({questionId: Number(this.question.id)}));
  }
}