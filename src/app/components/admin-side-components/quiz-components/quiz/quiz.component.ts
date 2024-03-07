import { Component, Input } from '@angular/core';
import { IQuiz } from '../../../../store/models/quiz';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { deleteRequiest } from '../../../../store/actions/quizzes.actions';
import { showConfirm } from '../../../../store/actions/modal.actions';

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
        private store: Store<AppState>
    ) {}

    @Input() quiz: IQuiz | undefined;

    deleteQuiz() {
        this.store.dispatch(showConfirm({ data: {
            text: 'Are you sure you want to delete the quiz?',
            okCallback: this._deleteQuiz.bind(this)
        }}))
    }

    _deleteQuiz() {
        this.store.dispatch(deleteRequiest({quizId: String(this.quiz?.id)}));
    }
}