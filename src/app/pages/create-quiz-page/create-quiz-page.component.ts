import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { QuestionService } from '../../services/question.service';
import { IQuestion } from '../../models/question';
import { QuizService } from '../../services/quiz.service';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-quiz-page',
  templateUrl: './create-quiz-page.component.html',
  styleUrls: [
    './create-quiz-page.component.scss',
    '../../app.component.scss'
  ] 
})
export class CreateQuizPageComponent implements OnDestroy {
  constructor(
    public modalService: ModalService,
    public quizService: QuizService,
    public questionService: QuestionService,
    private notificationService : NotificationService
  ) {
    this.lastCreatedQuestionSubs = this.questionService.lastCreatedQuestion$
      .subscribe((lastCreatedQuestion) => {
        this.questions?.push(lastCreatedQuestion);
      });

    this.lastDeletedQuestionIdSubs = this.questionService.lastDeletedQuestionId$
      .subscribe((lastDeletedQuestionId) => {
        this.questions = this.questions.filter(question => question.id !== lastDeletedQuestionId);
      });
  }

  private lastCreatedQuestionSubs: Subscription;

  private lastDeletedQuestionIdSubs: Subscription;

  questions: IQuestion[] = [];

  form = new FormGroup({
    quizName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    complexityQuiz: new FormControl<number>(0, [])
  });

  get quizName() {
    return this.form.controls.quizName as FormControl;
  }

  get complexityQuiz() {
    return this.form.controls.complexityQuiz as FormControl;
  }

  ngOnDestroy(): void {
    this.lastCreatedQuestionSubs.unsubscribe();
    this.lastDeletedQuestionIdSubs.unsubscribe();
  }

  createQuiz() {
    this.modalService.showConfirm({
      text: 'Do you really want to create a quiz?',
      okCallback: this._createQuiz.bind(this),
      redirectPath: '/quizzes'
    });
  }

  _createQuiz() {
    const {quizName, complexityQuiz} = this.form.value;
    this.quizService.create({
      name: quizName as string,
      complexity: complexityQuiz as number,
      questions: this.questions
    }).subscribe(() => {
      this.notificationService.show(`Quiz has been created!`);
    });
  }
}
