import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IQuestion } from '../../../../models/question';
import { QuestionService } from '../../../../services/question.service';
import { AnswerService } from '../../../../services/answer.service';
import { ModalService } from '../../../../services/modal.service';
import { IAnswer } from '../../../../models/answer';
import { Subscription } from 'rxjs';

const MAX_TEXT_LENGTH = 75;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: [
    './question.component.scss',
    '../../../../app.component.scss'
  ]
})
export class QuestionComponent implements OnInit, OnDestroy {
  constructor(
    public answerService: AnswerService,
    public modalService: ModalService,
    private questionService: QuestionService
  ) {}

  @Input() question: IQuestion;

  answers: IAnswer[] = [];

  infoDetails: boolean = false;

  answersDetails: boolean = false;

  isShowMoreInfoToggle: boolean = false;

  isShowAnswersToggle: boolean = false;

  questionText: string = '';

  private newAnswerSubs: Subscription;

  ngOnInit(): void {
    this.answerService.getAll(this.question?.id)
      .subscribe((answers) => {
        this.answers = answers;
        this._setIsShowAnswersToggle();
      });

    this._setIsShowMoreInfoToggle();

    this.newAnswerSubs = this.answerService.newAnswer$.subscribe((answer) => {
      this.answers.push(answer);
    });
  }

  ngOnDestroy(): void {
    this.newAnswerSubs.unsubscribe();
  }

  toggleShowMore() {
    this.infoDetails = !this.infoDetails;
    this._cutText(!this.infoDetails);
  }

  toggleAnswers() {
    this.answersDetails = !this.answersDetails;
  }

  deleteQuestion() {
    this.modalService.showConfirm({
      text: 'Are you sure you want to delete the question?',
      okCallback: this._deleteQuestion.bind(this)
    });
  }

  addAnswer() {
    this.modalService.addAnswer();
  }

  setCurrentQuestion() {
    this.questionService.setCurrentQuestion(this.question);
  }

  _deleteQuestion() {
    this.questionService.delete(this.question?.id).subscribe();
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
    if(this.answers.length > 0) {
      this.isShowAnswersToggle = true;
    }
  }

  _cutText(condition: boolean) {
    if(condition && this.question) {
      this.questionText = this.question.text.slice(0, MAX_TEXT_LENGTH);
    } 
    
    if(!condition && this.question) {
      this.questionText = this.question.text;
    }
  }
}
