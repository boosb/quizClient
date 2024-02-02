import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { QuestionService } from '../../services/question.service';
import { NotificationService } from '../../services/notification.service';
import { IQuiz } from '../../models/quiz';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss'
})
export class QuizPageComponent implements OnInit {
  title = 'quizzes';
  loading = false;
  term = '';
  quizzes$: Observable<IQuiz[]> | undefined;

  constructor(
    public quizService: QuizService,
    public modalService: ModalService,
    public notificationService: NotificationService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.quizService.getAll().subscribe(() => {
      this.loading = false;
    });
  }

  createEmptyQuiz() {
    this.quizService.create({
      name: 'New empty quiz',
      complexity: 0
    }).subscribe(() => {
      this.notificationService.show(`Quiz has been created!`);
      this.questionService.getAll( // todo но зачем получать ответы в пустой викторине
        this.quizService?.currentQuiz?.id
      ).subscribe(() => {});
    });
  }
}
