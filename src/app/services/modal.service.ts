import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DlgTypes } from '../components/common-components/modal/modal.dialog-types';
import { ConfirmData } from '../components/common-components/modal/modal.confirm-data';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  isVisible$ = new BehaviorSubject<boolean>(false);

  modalType: string | undefined;

  confirmData: ConfirmData;

  dlgTypes: DlgTypes = {
    CREATE_QUESTION: 'create-question',
    UPDATE_QUESTION: 'update-question',
    CREATE_ANSWER: 'create-answer',
    CONFIRM: 'confirm'
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

  editQuestion() {
    this.modalType = this.dlgTypes.UPDATE_QUESTION;
    this.open();
  }

  addAnswer() {
    this.modalType = this.dlgTypes.CREATE_ANSWER;
    this.open();
  }

  showConfirm(data: ConfirmData) {
    console.log('hello')
    this.modalType = this.dlgTypes.CONFIRM;
    this.confirmData = {
      text: data.text,
      okCallback: data.okCallback,
      redirectPath: data.redirectPath
    };
    this.open();
  }
}
