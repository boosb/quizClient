import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AnswerService } from '../../../services/answer.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { selectCurrentQuestionId } from '../../../store/selectors/questions.selectors';
import { selectCurrentAnswer, selectCurrentAnswerId } from '../../../store/selectors/answers.selectors';
import { addAnswerRequest, updateAnswerRequest } from '../../../store/actions/answers.actions';
import { Update } from '@ngrx/entity';
import { IAnswer } from '../../../store/models/answer';

@Component({
  selector: 'app-answer-modal',
  templateUrl: './answer-modal.component.html',
  styleUrls: [
    './answer-modal.component.scss',
    '../../../app.component.scss'
  ]
})
export class AnswerModalComponent implements OnDestroy {

  @Input() isUpdate: boolean

  private questionIdSubs: Subscription

  private answerIdSubs: Subscription

  private questionId: number | null | undefined

  private answerId: number | null | undefined

  form = new FormGroup({
    answerText: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    isRight: new FormControl<boolean>(false, [])
  });

  get answerText() {
    return this.form.controls.answerText as FormControl;
  }

  get isRight() {
    return this.form.controls.isRight as FormControl;
  }

  constructor(
    public answerService: AnswerService,
    private store: Store<AppState>
  ) {
    this.questionIdSubs = this.store.pipe(select(selectCurrentQuestionId))
      .subscribe(id => this.questionId = id)

    this.answerIdSubs = this.store.pipe(select(selectCurrentAnswer)).subscribe(answer => {
      this.answerId = answer?.id
      this.answerText.setValue(answer?.text)
      this.isRight.setValue(answer?.isRight)
    })
  }

  ngOnDestroy(): void {
    this.questionIdSubs.unsubscribe()
    this.answerIdSubs.unsubscribe()
  }

  submit() {
    this.isUpdate ? this._updateAnswer() : this._createAnswer()
  }

  _createAnswer() {
    const {answerText, isRight} = this.form.value;
    this.store.dispatch(addAnswerRequest({
      answer: {
        text: answerText as string,
        isRight: isRight as boolean,
        questionId: this.questionId
      }
    }))
  }

  _updateAnswer() {
    const {answerText, isRight} = this.form.value;
    const answerUpdate: Update<IAnswer> = {
      id: String(this.answerId),
      changes: {
        text: answerText as string,
        isRight: isRight as boolean,
        questionId: this.questionId
      }
    }
    this.store.dispatch(updateAnswerRequest({ update: answerUpdate }))
  }
}
