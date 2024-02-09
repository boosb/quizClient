import { Component, Directive, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [
    trigger('note', [
      transition(':enter', [
        style({ left: -350 }),
        animate('.7s ease-in', style({ left: '*' }))
      ]),
      transition(':leave', [
        animate('.7s ease-out', style({ left: -350 }))
      ])
    ]),
    trigger('runStatusBar', [
      state('full', style({
        'width': '100%'
      })),
      state('empty', style({
        'width': '0'
      })),
      transition('full => empty', [
        animate('3.5s ease-out')
      ])
    ])
  ]
}) // todo проработать проблему: иконка появляется с задержкой
export class NotificationComponent{
  // todo так и не получилось навесить анимацию на сам компонент через HostBinding
  // todo почему-то через HostBinding никак не получается организовать анимацию

  constructor(
    public notificationService : NotificationService
  ) {}
}
