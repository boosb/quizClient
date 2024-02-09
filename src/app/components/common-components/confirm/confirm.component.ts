import { Component, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: [
    './confirm.component.scss',
    '../../../app.component.scss'
  ]
})
export class ConfirmComponent {
  constructor(
    private router: Router,
    public modalService: ModalService
  ) {}

  @Input() text: string = '';

  @Input() okCallback: Function;

  @Input() redirectPath: string | null = null;

  get path() {
    return this.redirectPath ? this.redirectPath : this.router.url;
  }

  onOk() {
    this.okCallback();
    this.modalService.close();
  }
}
