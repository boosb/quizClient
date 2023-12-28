import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Directive({selector: 'main-note'})
class ChildDirective {
  @Input() class!: string;
  classList: any;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  @ViewChild(ChildDirective) child!: ChildDirective;

  constructor(
    public notificationService : NotificationService
  ) {}

  ngOnInit(): void {
    this.child.classList.add('animate')
  }
}
