import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';
import { ModalService } from '../../services/modal.service';
import { IAnswer } from '../../models/answer';

const MAX_TEXT_LENGTH = 55;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: [
    './question.component.scss',
    '../../app.component.scss'
  ]
})
export class QuestionComponent implements OnInit {
  constructor(
    public answerService: AnswerService,
    public modalService: ModalService,
    private questionService: QuestionService
  ) {}

  @Input() question: IQuestion | undefined;

  answers: IAnswer[] = [];

  details: boolean = false;

  isShowMoreInfoToggle: boolean = false;

  isShowAnswersToggle: boolean = false;

  questionText: string = '';

  ngOnInit(): void {
    /*this.answerService.getAll(this.question?.id)
      .subscribe(() => {
        this._setIsShowAnswersToggle();
      });*/
    this._setIsShowMoreInfoToggle();
  }

  toggleShowMore() {
    this.details = !this.details;
    this._cutText(!this.details);
  }

  toggleAnswers() {
    console.log( this.question?.id, ' >>> this.question?.id' )
    this.answerService.getAll(this.question?.id).subscribe((answers) => {
      this.answers = answers;
      console.log(this.answers, ' >>> this.answers-TEST-1')
    });
  }

  deleteQuestion() {
    this.questionService.delete(this.question?.id)
      .subscribe();
  }

  addAnswer() {
    this.questionService.setCurrentQuestion(this.question?.id).subscribe();
    this.modalService.addAnswer();
  }

  _setIsShowMoreInfoToggle() {
    if( this.question ) {
      const cond = this.question.text.length > MAX_TEXT_LENGTH;
      if(cond) {
        this.isShowMoreInfoToggle = true;
      }
      this._cutText(cond);
    }
  }

  _setIsShowAnswersToggle() {
    console.log(this.answerService.answers.length, ' >>> LENGTH')
    if(this.answerService.answers.length > 0) {
      this.isShowAnswersToggle = true;
    }
  }

  _cutText( condition: boolean ) {
    if(condition && this.question) {
      this.questionText = this.question.text.slice(0, MAX_TEXT_LENGTH);
    } 
    
    if(!condition && this.question) {
      this.questionText = this.question.text;
    }
  }
}
