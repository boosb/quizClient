import { Component, Input } from '@angular/core';
import { IAnswer } from '../../../store/models/answer';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { deleteAnswerRequest, selectAnswer } from '../../../store/actions/answers.actions';
import { showModalAnswers } from '../../../store/actions/modal.actions';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: [
    '../../../app.component.scss',
    './answer.component.scss'
  ]
})
export class AnswerComponent {

  @Input() answer: IAnswer | undefined;

  @Input() orderNumber: number | undefined;

  constructor(
    private store: Store<AppState>
  ) {}

  onDelete() {
    this.store.dispatch(deleteAnswerRequest({ 
      answerId: Number(this.answer?.id)
    }));
  }

  onEdit() {
    this.store.dispatch(showModalAnswers({data: { isUpdate: true }}));
    this.store.dispatch(selectAnswer({
      answerId: Number(this.answer?.id)
    }));
  } 
}