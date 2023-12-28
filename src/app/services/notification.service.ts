import { Injectable, OnInit, ViewChild } from '@angular/core';

const imgConfig: any = {
  'banned': '../../../assets/img/banned.png',
  'successfully': '../../../assets/img/successfully.png',
  'timeOver': '../../../assets/img/timeOver.png'
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {
  public text: string | undefined;
  public imgPath: string | undefined;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  show(text: string, imgPath: string) {
    this.text = text;
    this.imgPath = imgConfig[imgPath];
    //setTimeout(() => this.close(), 5000);
  }

  close(): void {
    this.text = '';
    this.imgPath = '';
  }

  animated(): void {

  }
}
