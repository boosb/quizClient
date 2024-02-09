import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { QuestionService } from '../../services/question.service';
import { NotificationService } from '../../services/notification.service';
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

  constructor(
    public quizService: QuizService,
    public modalService: ModalService,
    public notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.quizService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
