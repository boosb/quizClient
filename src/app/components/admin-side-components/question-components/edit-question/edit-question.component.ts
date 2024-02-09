import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BANNED_PATH } from '../../../common-components/notification/notification.constants';
import { QuestionService } from '../../../../services/question.service';
import { ModalService } from '../../../../services/modal.service';
import { NotificationService } from '../../../../services/notification.service';
import { AnswerService } from '../../../../services/answer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: [
    '../../../../app.component.scss',
    './edit-question.component.scss'
  ]
})
export class EditQuestionComponent implements OnInit, OnDestroy { // todo все таки непонятно как оформлять код
  constructor(
    private questionService: QuestionService,
    private modalService: ModalService,
    private notificationService : NotificationService,
    private activatedRoute: ActivatedRoute,
    public answerService: AnswerService,
  ) {
    this.quizIdSubs = this.activatedRoute.params.subscribe(params => this.quizId = params.id);
  }

  questionId: number | undefined;

  quizId: number | undefined;

  private quizIdSubs: Subscription;

  private currentQuestionSubs: Subscription;

  form = new FormGroup({
    questionText: new FormControl<string>(``, [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get questionText() {
    return this.form.controls.questionText as FormControl;
  }

  ngOnInit(): void {
    this.currentQuestionSubs = this.questionService.currentQuestion$.subscribe((currentQuestion) => {
      this.questionId = currentQuestion?.id;
      this.questionText.setValue(currentQuestion?.text);
    });
  }

  ngOnDestroy(): void {
    this.quizIdSubs.unsubscribe();
    this.currentQuestionSubs.unsubscribe();
  }

  submit() {
    const {questionText} = this.form.value;
    this.questionService.update(this.questionId, {
      text: questionText as string,
      quizId: this.quizId || null
    }).subscribe(() => {
      this.modalService.close();
      this.notificationService.show(`Question has been update!`, BANNED_PATH);
    });
  }
}
