import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { NotificationService } from '../../services/notification.service';
import { IQuestion } from '../../models/question';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-quiz-page',
  templateUrl: './edit-quiz-page.component.html',
  styleUrls: [
    './edit-quiz-page.component.scss',
    '../../app.component.scss'
  ]
})
export class EditQuizPageComponent implements OnInit, OnDestroy {
  constructor(
    public modalService: ModalService,
    public quizService: QuizService,
    public questionService: QuestionService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.quizIdSubs = this.activatedRoute.params.subscribe(params => this.quizId = params.id);

    this.lastCreatedQuestionSubs = this.questionService.lastCreatedQuestion$
      .subscribe((lastCreatedQuestion) => {
        this.questions?.push(lastCreatedQuestion);
      });

    this.lastDeletedQuestionIdSubs = this.questionService.lastDeletedQuestionId$
      .subscribe((lastDeletedQuestionId) => {
        console.log(lastDeletedQuestionId, ' >>>> test-1')
        this.questions = this.questions.filter(question => question.id !== lastDeletedQuestionId);
      });
  }

  private quizIdSubs: Subscription;
  private currentQuestionSubs: Subscription;
  private lastCreatedQuestionSubs: Subscription;
  private lastDeletedQuestionIdSubs: Subscription;

  quizId: number | undefined;

  questions: IQuestion[] = [];

  form = new FormGroup({
    quizName: new FormControl<string>(``, [
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

  ngOnInit(): void {
    this.quizService.getOne(this.quizId).subscribe((quiz) => {
      this.questions = quiz.questions || [];
      this.quizName.setValue(quiz.name);
      this.complexityQuiz.setValue(quiz.complexity);
    });

    this.currentQuestionSubs = this.questionService.currentQuestion$
      .subscribe((currentQuestion) => {
        this.questions = this.questions?.map(question => {
          return question.id === currentQuestion.id ? currentQuestion : question;
        })
      });
  }

  ngOnDestroy(): void {
    this.quizIdSubs.unsubscribe();
    this.currentQuestionSubs.unsubscribe();
    this.lastCreatedQuestionSubs.unsubscribe();
    this.lastDeletedQuestionIdSubs.unsubscribe();
  }

  updateQuiz() {
    const {quizName, complexityQuiz} = this.form.value;
    this.quizService.update(this.quizId, {
      name: quizName as string,
      complexity: complexityQuiz as number
    }).subscribe(() => {
      this.notificationService.show(`Quiz has been updated!`);
    });
  }
}
