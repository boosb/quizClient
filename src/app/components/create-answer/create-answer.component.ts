import { Component, Input } from '@angular/core';
import { AnswerService } from '../../services/answer.service';
import { IAnswer } from '../../models/answer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: [
    './create-answer.component.scss',
    '../../app.component.scss'
  ]
})
export class CreateAnswerComponent {
  constructor(
    public answerService: AnswerService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private questionService: QuestionService
  ) {}

  form = new FormGroup({
    answerText: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
    // todo сюда еще надо добавить поле isright
  });

  get answerText() {
    return this.form.controls.answerText as FormControl;
  }

  submit() {
    const {answerText} = this.form.value;
    this.answerService.create({
      text: answerText as string,
      isRight: true,// todo сюда еще надо добавить логику
      questionId: this.questionService.currentQuestion?.id || null
    }).subscribe(() => {
      this.modalService.close();
      this.notificationService.show(`Answer has been created!`);
    });
  }
}
