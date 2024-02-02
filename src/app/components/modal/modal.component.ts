import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
/*
export interface DlgTypes {
  CREATE_QUESTION: string;
  CREATE_ANSWER: string;
}
*/
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  //@Input() title: string | undefined;

  //title: string | undefined;

  @Input() type: string | undefined;

  /*dlgTypes: DlgTypes = {
    CREATE_QUESTION: 'create-question',
    CREATE_ANSWER: 'create-answer'
  }*/

  constructor(
    public modalService: ModalService
  ) {}
/*
  setTitle() {
    switch(this.type) {
      case this.modalService.dlgTypes.CREATE_QUESTION:
        return 'Create new question';
      case this.modalService.dlgTypes.CREATE_ANSWER:
        return 'Create new answer';
      default:
        return undefined;
    }
  }*/
}