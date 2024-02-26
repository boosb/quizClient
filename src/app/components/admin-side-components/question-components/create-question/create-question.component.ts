import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { QuestionService } from '../../../../services/question.service';
import { NotificationService } from '../../../../services/notification.service';
import { BANNED_PATH } from '../../../common-components/notification/notification.constants';
import { AnswerService } from '../../../../services/answer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../../store';
import { Store } from '@ngrx/store';
import { addQuestionRequest } from '../../../../store/actions/quizzes.actions';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: [
    './create-question.component.scss',
    '../../../../app.component.scss'
  ]
})
export class CreateQuestionComponent implements OnDestroy {
  constructor(
    private questionService: QuestionService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    public answerService: AnswerService,
    private store: Store<AppState>
  ) {
    this.quizIdSubs = this.activatedRoute.params.subscribe(params => this.quizId = params.id);
  }

  _quizId: number | undefined;

  private quizIdSubs: Subscription;

  form = new FormGroup({
    questionText: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get quizId() {
    return Number(this._quizId)
  }

  set quizId(quizId) {
    this._quizId = Number(quizId);
  }

  get questionText() {
    return this.form.controls.questionText as FormControl;
  }

  ngOnDestroy(): void {
    this.quizIdSubs.unsubscribe();
  }

  submit() {
    const {questionText} = this.form.value;
    /*this.questionService.create({
      text: questionText as string,
      quizId: this.quizId || null
    }).subscribe(() => {
      this.modalService.close();
      this.notificationService.show(`Question has been created!`, BANNED_PATH);
    });*/

    this.store.dispatch(addQuestionRequest({
      question: {
        text: questionText as string,
        quizId: this.quizId || null
      }
    }));
  }
}
