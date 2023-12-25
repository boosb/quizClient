import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { IQuestion } from '../../models/question';
import { QuestionService } from '../../services/question.service';

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
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.questionService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
