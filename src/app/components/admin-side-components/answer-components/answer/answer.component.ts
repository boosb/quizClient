import { Component, Input } from '@angular/core';
import { IAnswer } from '../../../../store/models/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: [
    '../../../../app.component.scss',
    './answer.component.scss'
  ]
})
export class AnswerComponent {
  constructor() {}

  @Input() answer: IAnswer | undefined;

  @Input() orderNumber: number | undefined;
}