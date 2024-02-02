import { Component, Input } from '@angular/core';
import { IQuiz } from '../../models/quiz';
import { QuizService } from '../../services/quiz.service';
import { NotificationService } from '../../services/notification.service';
import { QuestionService } from '../../services/question.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss'
})
export class QuizComponent {
    constructor(
        private quizService: QuizService,
        private notificationService: NotificationService,
        private questionService: QuestionService
    ) {}

    @Input() quiz: IQuiz | undefined;

    details: boolean = false; //todo нужен ли?!

    getQuiz() {
        this.quizService.getOne(
            this.quiz?.id
        ).subscribe(() => {
            this.questionService.getAll(this.quiz?.id)
                .subscribe();
        });
    }

    deleteQuiz() {
        this.quizService.delete(
            this.quiz?.id
        ).subscribe(() => {
            this.notificationService.show(`Quiz has been updated!`);
        });
    }
}