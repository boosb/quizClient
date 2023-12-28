import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { IQuestion } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss'
})
export class QuizPageComponent implements OnInit {
  title = 'quizClient';
  loading = false;
  term = '';
  questions$: Observable<IQuestion[]> | undefined;

  constructor(
    public questionService: QuestionService,
    public modalService: ModalService,

    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationService.show('1111111111111', 'successfully')
    this.loading = true;
    this.questionService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
