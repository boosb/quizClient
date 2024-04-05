import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../store/models/user';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectUsers } from '../../store';
import { loadUsers } from '../../store/actions/users.actions';

@Component({
  selector: 'app-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrl: './rating-page.component.scss'
})
export class RatingPageComponent implements OnInit, OnDestroy {
  usersSubs: Subscription;

  users: IUser[];

  constructor(
    private store: Store<AppState>
  ) {
    this.usersSubs = store.pipe(select(selectUsers)).subscribe(users => this.users = users);
  }

  ngOnDestroy(): void {
    this.usersSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }
}
