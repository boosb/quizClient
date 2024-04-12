import { Component, Input } from '@angular/core';
import { IQuiz } from '../../../store/models/quiz';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { deleteRequiest, selectQuiz } from '../../../store/actions/quizzes.actions';
import { showConfirm } from '../../../store/actions/modal.actions';
import { Router } from '@angular/router';
import { ImgService } from '../../../services/img.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [
        './quiz.component.scss',
        '../../../app.component.scss'
    ] 
})
export class QuizComponent {
    constructor(
        private store: Store<AppState>,
        private imgService: ImgService
    ) {
        imgService.includePlayIcon();
    }

    @Input() quiz: IQuiz | undefined;

    deleteQuiz() {
        this.store.dispatch(showConfirm({ data: {
            text: 'Are you sure you want to delete the quiz?',
            okCallback: this._deleteQuiz.bind(this)
        }}));
    }

    selectQuiz() {
        this.store.dispatch(selectQuiz({ quizId: Number(this.quiz?.id) }));
    }

    _deleteQuiz() {
        this.store.dispatch(deleteRequiest({quizId: String(this.quiz?.id)}));
    }
}