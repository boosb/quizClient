import { Component, Input } from '@angular/core';
import { IQuiz } from '../../../../store/models/quiz';
import { ModalService } from '../../../../services/modal.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { deleteRequiest } from '../../../../store/actions/quizzes.actions';

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
        private modalService: ModalService,
        private store: Store<AppState>
    ) {}

    @Input() quiz: IQuiz | undefined;

    deleteQuiz() {
        this.modalService.showConfirm({
            text: 'Are you sure you want to delete the quiz?',
            okCallback: this._deleteQuiz.bind(this)
        });
    }

    _deleteQuiz() {
        this.store.dispatch(deleteRequiest({quizId: String(this.quiz?.id)}));
    }
}