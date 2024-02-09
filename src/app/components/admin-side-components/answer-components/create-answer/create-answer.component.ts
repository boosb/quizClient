import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AnswerService } from '../../../../services/answer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { NotificationService } from '../../../../services/notification.service';
import { QuestionService } from '../../../../services/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: [
    './create-answer.component.scss',
    '../../../../app.component.scss'
  ]
})
export class CreateAnswerComponent implements OnInit, OnDestroy {
  constructor(
    public answerService: AnswerService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private questionService: QuestionService,
  ) {}

  form = new FormGroup({
    answerText: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
    // todo сюда еще надо добавить поле isright
  });

  private currentQuestionSubs: Subscription;

  currentQuestionId: number | null = null;

  get answerText() {
    return this.form.controls.answerText as FormControl;
  }

  ngOnInit(): void {
    this.currentQuestionSubs = this.questionService.currentQuestion$.subscribe((currentQuestion) => {
      this.currentQuestionId = currentQuestion.id || null;
    });
  }

  ngOnDestroy(): void {
    this.currentQuestionSubs.unsubscribe();
  }

  submit() {
    const {answerText} = this.form.value;
    this.answerService.create({
      text: answerText as string,
      isRight: true,// todo сюда еще надо добавить логику
      questionId: this.currentQuestionId
    }).subscribe(() => {
      this.modalService.close();
      this.notificationService.show(`Answer has been created!`);
    });
  }
}
