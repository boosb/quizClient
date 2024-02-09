import { Component, Input } from '@angular/core';
import { IQuiz } from '../../../../models/quiz';
import { QuizService } from '../../../../services/quiz.service';
import { NotificationService } from '../../../../services/notification.service';
import { ModalService } from '../../../../services/modal.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [
        './quiz.component.scss',
        '../../../../app.component.scss'
    ]
})
export class QuizComponent {
    constructor(
        private quizService: QuizService,
        private notificationService: NotificationService,
        private modalService: ModalService
    ) {}

    @Input() quiz: IQuiz;

    deleteQuiz() {
        this.modalService.showConfirm({
            text: 'Are you sure you want to delete the quiz?',
            okCallback: this._deleteQuiz.bind(this)
        });
    }

    _deleteQuiz() {
        this.quizService.delete(
            this.quiz?.id
        ).subscribe(() => {
            this.notificationService.show(`Quiz has been updated!`);
        });
    }
}