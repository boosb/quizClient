import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectQueryParams } from '../../store';
import { Subscription } from 'rxjs';
import { confirmEmail } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-confirm-email-page',
  templateUrl: './confirm-email-page.component.html',
  styleUrl: './confirm-email-page.component.scss'
})
export class ConfirmEmailPageComponent implements OnInit, OnDestroy {

  private params: any;

  private paramsSubs: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
    this.paramsSubs = this.store.pipe(select(selectQueryParams)).subscribe(params => this.params = params);
  }

  ngOnDestroy(): void {
    this.paramsSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(confirmEmail({ urlParams: this.params }));
  }
}
