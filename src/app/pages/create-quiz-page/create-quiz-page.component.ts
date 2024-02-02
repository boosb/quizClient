import { Component, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { QuestionService } from '../../services/question.service';
import { Observable } from 'rxjs';
import { IQuestion } from '../../models/question';
import { QuizService } from '../../services/quiz.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-quiz-page',
  templateUrl: './create-quiz-page.component.html',
  styleUrls: [
    './create-quiz-page.component.scss',
    '../../app.component.scss'
  ] 
})
export class CreateQuizPageComponent implements DoCheck {
  constructor(
    public modalService: ModalService,
    public quizService: QuizService,
    public questionService: QuestionService,
    private notificationService : NotificationService
  ) {}

  //questions$: Observable<IQuestion[]> | undefined;

  //modalType: string | undefined;

  form = new FormGroup({
    quizName: new FormControl<string>('', [ // todo точно не помню какие поля на бэке
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

  ngDoCheck(): void {
    this.quizName.setValue(this.quizService?.currentQuiz?.name);
    this.complexityQuiz.setValue(this.quizService?.currentQuiz?.complexity);
  }

  submit() {

  }

  updateQuiz() {
    const {quizName, complexityQuiz} = this.form.value;
    this.quizService.update(this.quizService?.currentQuiz?.id, {
      name: quizName as string,
      complexity: complexityQuiz as number
    }).subscribe(() => {
      this.notificationService.show(`Quiz has been updated!`);
    });
  }
}
