import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { closeModal } from '../../../store/actions/modal.actions';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: [
    './confirm.component.scss',
    '../../../app.component.scss'
  ]
})
export class ConfirmComponent {

  @Input() text: string = ''

  @Input() okCallback: Function

  @Input() redirectPath: string | null = null

  get path() {
    return this.redirectPath ? this.redirectPath : this.router.url
  }

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  onOk() {
    this.okCallback()
    this.close()
  }

  close() {
    this.store.dispatch(closeModal())
  }
}
