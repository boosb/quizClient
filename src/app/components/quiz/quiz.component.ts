import { Component, Input } from '@angular/core';
import { IQuestion } from '../../models/question';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html'
})

export class QuizComponent {
    @Input() question: IQuestion | undefined;

    details: boolean = false;
}