import { Component, Input } from '@angular/core';
import { IAnswer } from '../../models/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
})
export class AnswerComponent {
  constructor() {}

  @Input() answer: IAnswer | undefined;
}