import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { QuestionService } from '../../services/question.service';
import { NotificationService } from '../../services/notification.service';
import { BANNED_PATH } from '../notification/notification.constants';
import { IAnswer } from '../../models/answer';
import { Observable } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: [
    './create-question.component.scss',
    '../../app.component.scss'
  ]
})
export class CreateQuestionComponent {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private modalService: ModalService,
    private notificationService : NotificationService,
    public answerService: AnswerService
  ) {}

  //answers$: Observable<IAnswer[]> | undefined;

  form = new FormGroup({
    questionText: new FormControl<string>('', [ // todo опять же вопрос!  Должно ли название совпадать с названием на сервере? 
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get questionText() {
    return this.form.controls.questionText as FormControl;
  }

  submit() {
    const {questionText} = this.form.value;
    this.questionService.create({
      text: questionText as string,
      quizId: this.quizService.currentQuiz?.id || null
    }).subscribe(() => {
      this.modalService.close();
      this.notificationService.show(`Question has been created!`, BANNED_PATH);
    });
  }
}
