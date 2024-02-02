import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionService } from './question.service';

export interface DlgTypes {
  CREATE_QUESTION: string;
  CREATE_ANSWER: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  isVisible$ = new BehaviorSubject<boolean>(false);

  modalType: string | undefined;

  dlgTypes: DlgTypes = {
    CREATE_QUESTION: 'create-question',
    CREATE_ANSWER: 'create-answer'
  }

  open() {
    this.isVisible$.next(true);
  } 

  close() {
    this.isVisible$.next(false);
  }

  addQuestion() {
    this.modalType = this.dlgTypes.CREATE_QUESTION;
    this.open();
  }

  addAnswer() {
    this.modalType = this.dlgTypes.CREATE_ANSWER;
    this.open();
  }
}
