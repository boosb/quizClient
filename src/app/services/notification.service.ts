import { Injectable } from '@angular/core';
import { FULL_STATE, EMPTY_STATE } from '../components/common-components/notification/notification.constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // todo хороший опыт, но надо бы перейти на angular material
  public text: string | undefined;
  public imgPath: string | undefined;
  public isShow: boolean | undefined;
  public runStatusBar: boolean | undefined;

  constructor() {}

  show(text: string = '', imgPath: string = '') {
    this.text = text;
    this.imgPath = imgPath;
    this.isShow = true;
    this.runStatusBar = false;
  }

  close(): void {
    this.text = '';
    this.imgPath = '';
    this.isShow = false;
  }

  animationNoteDone() {
    this.runStatusBar = true;
  }

  animationRunStatusBarDone(event: any) {
    const {fromState, toState} = event;
    const isClose = fromState === FULL_STATE && toState === EMPTY_STATE;
    if(isClose) {
      this.close();
    }
  }
}