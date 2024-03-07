import { Component, Input, OnDestroy, ViewContainerRef, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { addQuestionRequest, updateQuestionRequest } from '../../../store/actions/questions.actions';
import { Update } from '@ngrx/entity';
import { IQuestion } from '../../../store/models/question';
import { selectCurrentQuizId } from '../../../store/selectors/quizzes.selectors';
import { selectCurrentQuestion } from '../../../store/selectors/questions.selectors';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: [
    './question-modal.component.scss',
    '../../../app.component.scss'
  ]
})
export class QuestionModalComponent implements OnDestroy {

  @Input() isUpdate: boolean

  private quizIdSubs: Subscription

  private currentQuestionSubs: Subscription

  private quizId: number | null

  private currentQuestion: IQuestion | null | undefined

  form = new FormGroup({
    questionText: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get questionText() {
    return this.form.controls.questionText as FormControl;
  }

  constructor(
    private store: Store<AppState>
  ) {
    this.quizIdSubs = this.store.pipe(select(selectCurrentQuizId)).subscribe(id => this.quizId = id)
    this.currentQuestionSubs = this.store.pipe(select(selectCurrentQuestion)).subscribe(question => {
      this.currentQuestion = question
      this.questionText.setValue(question?.text)
    })
  }

  ngOnDestroy(): void {
    this.quizIdSubs.unsubscribe()
    this.currentQuestionSubs.unsubscribe()
  }

  submit() {
    this.isUpdate ? this._updateQuestion() : this._createQuestion()
  }

  _createQuestion() {
    const {questionText} = this.form.value;
    this.store.dispatch(addQuestionRequest({
      question: {
        text: questionText as string,
        quizId: Number(this.quizId)
      }
    }));
  }

  _updateQuestion() {
    const {questionText} = this.form.value;
    const questionUpdate: Update<IQuestion> = {
      id: String(this.currentQuestion?.id),
      changes: {
        text: questionText as string,
        quizId: this.quizId || null
      }
    }
    this.store.dispatch(updateQuestionRequest({update: questionUpdate}))
  }
}
