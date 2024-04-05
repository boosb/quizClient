import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IQuestion } from '../../../store/models/question';
import { IAnswer } from '../../../store/models/answer';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { deleteQuestionRequest, selectQuestion } from '../../../store/actions/questions.actions';
import { selectQustionAnswers } from '../../../store/selectors/answers.selectors';
import { showConfirm, showModalAnswers, showModalQuestions } from '../../../store/actions/modal.actions';

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

  answersSubs: Subscription;

  answers: IAnswer[];

  infoDetails: boolean = false;

  answersDetails: boolean = false;

  isShowMoreInfoToggle: boolean = false;

  isShowAnswersToggle: boolean = false;

  questionText: string = '';

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.answersSubs = this.store.pipe(select(selectQustionAnswers, {questionId: this.question?.id}))
      .subscribe(answers => {
        this.answers = answers;
        this._setIsShowAnswersToggle();
      });

    this._setIsShowMoreInfoToggle();
  }

  ngOnDestroy(): void {
    this.answersSubs.unsubscribe();
  }

  toggleShowMore() {
    this.infoDetails = !this.infoDetails;
    this._cutText(!this.infoDetails);
  }

  toggleAnswers() {
    this.answersDetails = !this.answersDetails;
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
    this.store.dispatch(showModalQuestions({data: { isUpdate: false }}));
  }

  addAnswer() {
    this.store.dispatch(showModalAnswers({data: { isUpdate: false }}));
  }

  _deleteQuestion() {
    this.store.dispatch(deleteQuestionRequest({questionId: Number(this.question.id)}));
  }

  _setIsShowMoreInfoToggle() {
    if( this.question ) {
      const cond = this.question.text.length > MAX_TEXT_LENGTH;
      if(cond) {
        this.isShowMoreInfoToggle = true;
      }
      this._cutText(cond);
    }
  }

  _setIsShowAnswersToggle() {
    if(this.answers.length > 0) {
      this.isShowAnswersToggle = true;
    }
  }

  _cutText(condition: boolean) {
    if(condition && this.question) {
      this.questionText = this.question.text.slice(0, MAX_TEXT_LENGTH);
    } 
    
    if(!condition && this.question) {
      this.questionText = this.question.text;
    }
  }
}
